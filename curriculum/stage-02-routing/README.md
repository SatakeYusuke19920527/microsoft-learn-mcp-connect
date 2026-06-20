# Stage 02: ページとルーティング

App Router の「フォルダ = URL」という仕組みを学び、複数ページのサイトを作ります。

## 学習目標
- App Router のファイルベースルーティングを理解する
- 新しいページ（ルート）を追加できる
- `<Link>` でページ間を遷移できる
- 動的ルート（`[id]`）の基本を知る

## 前提
- Stage 01 完了

## 背景解説

### フォルダ構造がそのまま URL になる
`src/app/` 以下のフォルダ構造が URL に対応します。各フォルダの `page.tsx` がそのページの本体です。

| ファイル | URL |
|----------|-----|
| `src/app/page.tsx` | `/` |
| `src/app/about/page.tsx` | `/about` |
| `src/app/blog/page.tsx` | `/blog` |
| `src/app/blog/[id]/page.tsx` | `/blog/123` |

### ページ遷移は `<Link>` で
`<a>` タグでも遷移できますが、Next.js では `next/link` の `<Link>` を使うと高速なクライアント遷移になります。

```tsx
import Link from "next/link";

export default function Home() {
  return <Link href="/about">About ページへ</Link>;
}
```

### 動的ルート
角括弧 `[id]` のフォルダは、URL の一部を変数として受け取れます。

```tsx
// src/app/blog/[id]/page.tsx
export default function BlogPost({ params }: { params: { id: string } }) {
  return <h1>記事 ID: {params.id}</h1>;
}
```

## 課題

### 課題 2-1: About ページを作る
`src/app/about/page.tsx` を作成し、`/about` で自己紹介文が表示されるようにする。

### 課題 2-2: ナビゲーションを作る
トップページに `<Link>` を使って `/about` と `/blog` への 2 つのリンクを置く。
クリックでページ移動できることを確認する。

### 課題 2-3: 動的ルート
`src/app/blog/[id]/page.tsx` を作り、`/blog/1` `/blog/2` でそれぞれ
「記事 ID: 1」「記事 ID: 2」と表示されるようにする。

## 完了条件
- [ ] `/about` にアクセスすると自己紹介が表示される
- [ ] トップから各ページへ `<Link>` で遷移できる
- [ ] `/blog/任意の数字` でその数字が画面に表示される
- [ ] ブラウザの戻る/進むボタンが正しく動く

## 発展課題
- 共通ナビゲーションを `src/app/layout.tsx` に置き、全ページで表示されるようにする。
- 存在しない URL を開いたときの `not-found.tsx`（404 ページ）を作る。

## つまずきポイント
- **ページが 404 になる**: フォルダ名のスペルミス、または `page.tsx` というファイル名になっているか確認。
- **`params` が Promise**: Next.js 15 では `params` が Promise になる場合があります。その時は `async` 関数にして `const { id } = await params;` とします。

## 参考リンク
- [Next.js: Pages and Layouts](https://nextjs.org/docs/app/getting-started/layouts-and-pages)
- [Next.js: Linking and Navigating](https://nextjs.org/docs/app/getting-started/linking-and-navigating)

➡️ 次は [Stage 03: コンポーネントと Props](../stage-03-components-props/README.md)
