# Cloudflare Pages へのデプロイ手順

このプロジェクト（Docusaurusサイト）をGitHub経由でCloudflare Pagesに公開する手順です。
プロジェクトのルートではなく、`website` ディレクトリ内にDocusaurus本体があるため、設定に注意が必要です。

## 前提条件

1.  GitHubアカウントを持っていること。
2.  このプロジェクトがGitHubリポジトリにプッシュされていること。
3.  Cloudflareアカウントを持っていること。

## 手順

### 1. GitHubへプッシュ

まだの場合は、最新の変更をGitHubリポジトリにプッシュしてください。

### 2. Cloudflare Dashboardでの設定

1.  [Cloudflare Dashboard](https://dash.cloudflare.com/) にログインします。
2.  左側のメニューから **Workers & Pages** を選択します。
3.  **アプリケーションを作成する** (Create application) ボタンをクリックします。
    *   **Note:** UIによっては、画面右上の **＋** (追加) ボタンの中や、画面右上の **Create** ボタンから進む場合があります。
4.  **Pages** タブを選択し、**Connect to Git** ボタンをクリックします。
5.  **Connect GitHub** を選択し、対象のGitHubリポジトリ（`test-docusaurusd-001`）を選択して **Begin setup** をクリックします。

### 3. ビルド設定（重要）

セットアップ画面（Set up builds and deployments）で、以下の設定を行います。

> [!NOTE]
> CloudflareのUIは頻繁に変更されるため、項目名や場所が微妙に異なる場合があります。「Build settings」や「Build configurations」といったセクションが**折りたたまれている可能性がある**ので、見つからない場合は画面内のアコーディオンやトグルを確認してください。

*   **Project name**: 任意のプロジェクト名（例: `test-docusaurus-site`）
*   **Production branch**: `main` (または使用しているブランチ)
*   **Framework preset**: `Docusaurus` を選択します。
    *   プリセットを選択すると `Build command` と `Build output directory` は自動で入力されます。
*   **Build settings** (または **Build configurations**):
    *   **Root directory (重要)**: `website`
        *   **この設定が最も重要です。** ここが空欄のままだとルートディレクトリでビルドしようとして失敗します。
        *   もし初期セットアップで見つからない場合は、一度デプロイを失敗させてから、後述の「設定の修正」で変更してください。
    *   **Build command**: `npm run build`
    *   **Build output directory**: `build`

### 4. デプロイの実行

設定を確認したら、**Save and Deploy** をクリックします。

Cloudflareがリポジトリをクローンし、`website` ディレクトリに移動してからビルドを開始します。
数分待ち、"Success!" と表示されればデプロイ完了です。表示されたURLにアクセスしてサイトを確認してください。

## 補足: 環境変数など

もし将来的に検索機能（Algoliaなど）やGoogle Analyticsなどを追加して環境変数が必要になった場合は、Cloudflare Pagesの **Settings** > **Environment variables** から設定できます。

## トラブルシューティング: 設定項目が見つからずデプロイに失敗した場合

もし初期セットアップ時に `Root directory` などを設定する項目が見当たらず、デプロイが失敗した場合は、以下の手順で修正および再試行ができます。

1.  Cloudflare Pagesのダッシュボードで、作成したプロジェクトを選択します。
2.  **Settings** タブをクリックします。
3.  **Builds & deployments** メニューを選択します。
4.  **Build configurations** セクションの **Edit** ボタンをクリックします。
5.  ここで **Root directory** を `website` に設定し直し、Saveします。
6.  **Deployments** タブに戻り、**Review details** (または最新のデプロイ) から **Retry deployment** を実行します。
