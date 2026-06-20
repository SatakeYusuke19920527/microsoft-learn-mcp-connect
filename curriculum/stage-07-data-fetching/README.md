# Stage 07: データ取得（Server Components で fetch）

外部 API や自前 API からデータを取得して表示します。Server Component での `fetch` を中心に学びます。

## 学習目標
- Server Component で `async/await` を使ってデータ取得できる
- Client Component での取得（`useEffect` + `fetch`）との違いを理解する
- ローディング表示（`loading.tsx`）とエラー表示（`error.tsx`）を作れる
- 動的ルートのページでデータを取得できる

## 前提
- Stage 06 完了

## 背景解説

### Server Component で直接 fetch
Server Component は `async` 関数にでき、`await fetch(...)` をそのまま書けます。データ取得済みの HTML が返るため高速・SEO に強いです。

```tsx
// src/app/users/page.tsx  (Server Component)
export default async function UsersPage() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    cache: "no-store", // 毎回最新を取得
  });
  const users = await res.json();
  return (
    <ul>
      {users.map((u: { id: number; name: string }) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  );
}
```

### loading.tsx と error.tsx
同じフォルダに置くだけで、自動的にローディング/エラー UI として使われます。

```tsx
// src/app/users/loading.tsx
export default function Loading() {
  return <p>読み込み中...</p>;
}
```

### Client 取得との使い分け
- 初期表示・SEO 重視 → Server Component
- ユーザー操作後の再取得・リアルタイム → Client Component（`useEffect` / SWR）

## 課題

### 課題 7-1: ユーザー一覧（Server）
`https://jsonplaceholder.typicode.com/users` から取得し、名前とメールを一覧表示するページ `/users` を Server Component で作る。

### 課題 7-2: 詳細ページ
`/users/[id]` を作り、`https://jsonplaceholder.typicode.com/users/{id}` から 1 人分を取得して表示する。一覧から `<Link>` で遷移できるようにする。

### 課題 7-3: ローディングとエラー
`loading.tsx` を追加して読み込み中表示を出す。わざと壊れた URL にして `error.tsx` が出ることも確認する。

## 完了条件
- [ ] `/users` に外部 API のユーザー一覧が表示される
- [ ] 一覧から詳細ページへ遷移し、その人の情報が出る
- [ ] ローディング表示が一瞬出る（または開発時に確認できる）
- [ ] Server / Client 取得の違いを自分の言葉で説明できる

## 発展課題
- `cache: "force-cache"` と `no-store` の違いを実験して挙動を比べる。
- 自前の `/api/messages`（Stage 06）から取得して表示するページを作る。

## つまずきポイント
- **`useState`/`useEffect` を Server Component で使ってエラー**: それらは Client 専用。`"use client"` が必要。
- **データが古い**: キャッシュされています。`{ cache: "no-store" }` を試す。

## 参考リンク
- [Next.js: Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching)
- [Next.js: loading.js](https://nextjs.org/docs/app/api-reference/file-conventions/loading)

➡️ 次は [Stage 08: フォームとバリデーション](../stage-08-forms-validation/README.md)
