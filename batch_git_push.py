import subprocess
import time
import sys
import argparse

def run_command(command, dry_run=False):
    """コマンドを実行し、出力を返す"""
    if dry_run:
        print(f"[DRY RUN] {' '.join(command)}")
        return ""
    
    try:
        # 日本語環境(Windows)での文字化けを防ぐため encoding='utf-8' を明示
        result = subprocess.run(command, check=True, capture_output=True, text=True, encoding='utf-8')
        return result.stdout
    except subprocess.CalledProcessError as e:
        print(f"Error executing command: {' '.join(command)}")
        print(f"Error output: {e.stderr}")
        return None
    except UnicodeDecodeError:
        # UTF-8で失敗した場合は、システムのデフォルト（CP932等）を試みる
        result = subprocess.run(command, check=True, capture_output=True, text=True)
        return result.stdout

def get_modified_files():
    """git status --porcelain を使って変更・未追跡ファイルを取得する。
    日本語ファイル名がエスケープされないように -c core.quotepath=false を指定する。
    """
    # -c core.quotepath=false を追加して日本語ファイル名をそのまま出力させる
    output = run_command(["git", "-c", "core.quotepath=false", "status", "--porcelain"])
    if output is None:
        return []
    
    files = []
    for line in output.splitlines():
        if len(line) > 3:
            # 形式: XY path/to/file
            # XY はステータスコード (M, A, ?? など)。3文字目以降がパス
            status = line[:2]
            file_path = line[3:]
            
            # 改名/コピーは "old -> new" 形式なので、git add する対象は新しいパスにする。
            if "R" in status or "C" in status:
                parts = file_path.split(" -> ", 1)
                if len(parts) == 2:
                    file_path = parts[1]

            if file_path.startswith('"') and file_path.endswith('"'):
                file_path = file_path[1:-1]
            files.append(file_path)
    return files

def main():
    parser = argparse.ArgumentParser(description="Git batch submit script.")
    parser.add_argument("--batch-size", type=int, default=50, help="Number of files per batch (default: 50)")
    parser.add_argument("--wait", type=int, default=30, help="Wait time between batches in seconds (default: 30)")
    parser.add_argument("--dry-run", action="store_true", help="Show commands without executing them")
    
    args = parser.parse_args()
    
    files = get_modified_files()
    
    if not files:
        print("No modified files found.")
        return

    total_files = len(files)
    num_batches = (total_files + args.batch_size - 1) // args.batch_size
    
    print(f"Found {total_files} modified files.")
    print(f"Splitting into {num_batches} batches (batch size: {args.batch_size}).")
    print(f"Wait time between pushes: {args.wait} seconds.\n")

    for i in range(num_batches):
        start_idx = i * args.batch_size
        end_idx = min((i + 1) * args.batch_size, total_files)
        batch_files = files[start_idx:end_idx]
        
        print(f"--- Processing Batch {i + 1}/{num_batches} ({len(batch_files)} files) ---")
        
        # 1. Add files
        add_cmd = ["git", "add"] + batch_files
        if run_command(add_cmd, args.dry_run) is None and not args.dry_run:
            print("Failed to add files. Skipping this batch.")
            continue
            
        # 2. Commit
        commit_msg = f"Batch commit {i + 1}/{num_batches} (files {start_idx + 1} to {end_idx})"
        commit_cmd = ["git", "commit", "-m", commit_msg]
        if run_command(commit_cmd, args.dry_run) is None and not args.dry_run:
            print("Failed to commit. Skipping this batch.")
            continue
            
        # 3. Push
        push_cmd = ["git", "push"]
        if run_command(push_cmd, args.dry_run) is None and not args.dry_run:
            print("Failed to push. You might need to resolve issues manually.")
            # プッシュ失敗時は待機せずに中断するか、継続するか検討が必要だが、
            # 安全のためここでは警告を出して継続
            
        print(f"Batch {i + 1} pushed successfully.")

        # 最後のバッチでなければ待機
        if i < num_batches - 1:
            print(f"Waiting for {args.wait} seconds before next batch...")
            if not args.dry_run:
                time.sleep(args.wait)
            else:
                print("[DRY RUN] Sleeping...")
            print()

    print("\nAll batches completed.")

if __name__ == "__main__":
    main()
