export type ReactModule = {
  title: string;
  start: number;
  end: number;
};

export const reactModules: ReactModule[] = [
  { title: 'Module 1: 準備とTypeScriptの「考え方」', start: 1, end: 10 },
  { title: 'Module 2: JSXと「型」のキホン', start: 11, end: 20 },
  { title: 'Module 3: Props（型付きデータの受け渡し）', start: 21, end: 30 },
  { title: 'Module 4: useStateとイベントの「型」', start: 31, end: 40 },
  { title: 'Module 5: UIの動的構築（型と一緒に）', start: 41, end: 50 },
  { title: 'Module 6: スタイリング', start: 51, end: 55 },
  { title: 'Module 7: useEffect（「表示」以外のウラ仕事）', start: 56, end: 65 },
  { title: 'Module 8: useReducer（型でガチガチに管理）', start: 66, end: 70 },
  { title: 'Module 9: useContext（型付きの「みんなのデータ」）', start: 71, end: 80 },
  { title: 'Module 10: 動きをサクサクにする', start: 81, end: 90 },
  { title: 'Module 11: useRef 集中講座', start: 91, end: 100 },
  { title: 'Module 12: 知ってると便利なフックたち', start: 101, end: 110 },
  { title: 'Module 13: v19データ取得 use & Suspense', start: 111, end: 120 },
  { title: 'Module 14: v19フォーム革命 Actions', start: 121, end: 130 },
  { title: 'Module 15: カスタムフック（オリジナルのフック）', start: 131, end: 140 },
  { title: 'Module 16: ルーティングとプロジェクト構成', start: 141, end: 150 },
  { title: 'Module 17: テストと公開', start: 151, end: 160 },
  { title: 'Module 18: 非同期データの最強管理術 (TanStack Query)', start: 161, end: 170 },
  { title: 'Module 19: グローバルステート管理の決定版 (Zustand)', start: 171, end: 180 },
  { title: 'Module 20: フォームバリデーションの鉄板 (RHF & Zod)', start: 181, end: 190 },
  { title: 'Module 21: ユーザー認証と「自分だけのアプリ」', start: 191, end: 200 },
  { title: 'Module 22: アニメーションで「プロ感」を出す', start: 201, end: 210 },
  { title: 'Module 23: UIライブラリで「車輪の再発明」を防ぐ', start: 211, end: 220 },
  { title: 'Module 24: AI統合とストリーミング (Vercel AI SDK)', start: 221, end: 230 },
  { title: 'Module 25: 信頼性を高めるE2Eテスト (Playwright)', start: 231, end: 240 },
  { title: 'Module 26: アトミックな状態管理 (Jotai)', start: 241, end: 250 },
  { title: 'Module 27: 次世代バリデーション (Valibot)', start: 251, end: 260 },
  { title: 'Module 28: 次世代ビルドツール (Biome)', start: 261, end: 270 },
  { title: 'Module 29: React Email メール実装革命', start: 271, end: 280 },
  { title: 'Module 30: フルスタック・エッジ開発 (Hono & Cloudflare)', start: 281, end: 290 },
];

export function getReactStudyId(chapter: number): string {
  return `react-study/react_study_${String(chapter).padStart(3, '0')}`;
}

export function getReactIndexId(): string {
  return 'react-study/react_index';
}

export function getModuleSidebarId(index: number): string {
  return `reactModule${String(index + 1).padStart(2, '0')}Sidebar`;
}

export function getModuleLabel(module: ReactModule): string {
  return module.title.replace(/^Module\s+\d+:\s*/, '');
}

export function getModuleNumberFromPath(pathname: string): number | null {
  const match = pathname.match(/\/docs\/react-study\/react_study_(\d{3})(?:\/|$)/);
  return match ? Number(match[1]) : null;
}
