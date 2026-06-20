# Stage 01: 環境構築と Hello World

最初のステージです。Next.js アプリを動かす環境を整え、ブラウザに「Hello World」を表示します。

## 学習目標
- Node.js / npm の役割を理解する
- Next.js プロジェクトを新規作成・起動できる
- App Router のページがどこで描画されるか理解する

## 前提
- なし（プログラミング初学者向け）

## 背景解説

### Node.js とは
ブラウザの外で JavaScript を動かす実行環境です。Next.js の開発サーバーやビルドは Node.js 上で動きます。
まずは Node.js 20 以上をインストールします。

```bash
node -v   # v20 以上であることを確認
npm -v
```

### Next.js とは
React をベースにした Web アプリフレームワークです。ルーティング・サーバーレンダリング・API などを最初から備えています。
本カリキュラムでは **App Router**（`src/app/` ディレクトリ）を使います。

### プロジェクトの心臓部 `page.tsx`
App Router では、`src/app/page.tsx` がトップページ（`/`）に対応します。
このファイルが返す JSX がそのまま画面に表示されます。

```tsx
// src/app/page.tsx
export default function Home() {
  return <h1>Hello World</h1>;
}
```

## 課題

### 課題 1-1: 環境準備
1. Node.js 20 以上をインストールし、`node -v` で確認する。
2. 任意の作業ディレクトリで新規 Next.js プロジェクトを作成する。

```bash
npx create-next-app@latest my-app --typescript --app --tailwind --eslint
cd my-app
npm run dev
```

3. ブラウザで `http://localhost:3000` を開き、初期画面が表示されることを確認する。

> 既にこのリポジトリを使う場合は、ルートで `npm install` → `npm run dev` を実行します。

### 課題 1-2: Hello World を表示する
`src/app/page.tsx` を編集し、画面に大きく `Hello World` とだけ表示されるようにする。
初期テンプレートの中身は全部消して構いません。

### 課題 1-3: 自分の名前を出す
`Hello World` の下に、`<p>` タグで自分の名前を表示する行を追加する。

## 完了条件
- [ ] `npm run dev` でエラーなくサーバーが起動する
- [ ] `http://localhost:3000` に `Hello World` が表示される
- [ ] 自分の名前が画面に表示される
- [ ] ファイルを保存すると自動で画面が更新される（ホットリロード）ことを体感した

## 発展課題
- `src/app/layout.tsx` を開き、`<title>` を自分のアプリ名に変える。
- `npm run build` を実行し、本番ビルドが成功することを確認する。

## つまずきポイント
- **ポートが使用中**: `3000` が埋まっている場合は自動で `3001` などに変わります。ターミナルの URL を確認。
- **保存しても変わらない**: ファイルの保存忘れ、または編集ファイルを間違えていないか確認。

## 参考リンク
- [Next.js 公式: Installation](https://nextjs.org/docs/app/getting-started/installation)
- [Node.js ダウンロード](https://nodejs.org/)

➡️ 次は [Stage 02: ページとルーティング](../stage-02-routing/README.md)
