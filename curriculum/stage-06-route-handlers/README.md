# Stage 06: Route Handlers（API を作る）

ブラウザから呼び出せる API エンドポイントを Next.js 内に作ります。

## 学習目標
- `route.ts` で API エンドポイント（GET / POST）を作れる
- リクエストの body やクエリを受け取れる
- JSON を返せる
- フロントから `fetch` で API を呼べる

## 前提
- Stage 05 完了

## 背景解説

### Route Handler とは
`src/app/api/.../route.ts` に HTTP メソッド名の関数を書くと API になります。

| ファイル | URL |
|----------|-----|
| `src/app/api/hello/route.ts` | `/api/hello` |
| `src/app/api/messages/route.ts` | `/api/messages` |

```ts
// src/app/api/hello/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Hello API" });
}
```

### POST とリクエストボディ
```ts
export async function POST(req: Request) {
  const body = await req.json();
  return NextResponse.json({ received: body }, { status: 201 });
}
```

### クエリパラメータ
```ts
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");
  return NextResponse.json({ hello: name });
}
```

### フロントから呼ぶ
```tsx
const res = await fetch("/api/messages", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ text: "こんにちは" }),
});
const data = await res.json();
```

## 課題

### 課題 6-1: GET API
`/api/hello` を作り、`{ message: "Hello World" }` を返す。ブラウザで直接 URL を開いて JSON を確認する。

### 課題 6-2: メッセージの保存と取得（メモリ）
`/api/messages` を作る。
- `GET`: 現在のメッセージ配列を返す
- `POST`: `{ text }` を受け取り配列に追加して返す

保存先はファイル冒頭の `let messages: string[] = []` のようなメモリ変数で良い（サーバー再起動で消えてOK）。

### 課題 6-3: フロントと繋ぐ
入力欄＋送信ボタンの画面を作り、`POST /api/messages` で送信、`GET` で一覧を取得して表示する。

## 完了条件
- [ ] `/api/hello` が JSON を返す
- [ ] `POST /api/messages` でメッセージが追加され、`GET` で取得できる
- [ ] フロントの入力から API を呼び、結果が画面に反映される
- [ ] ブラウザの DevTools の Network タブでリクエストを確認できた

## 発展課題
- 空文字を弾くバリデーションを `POST` 側に入れ、`400` を返す。
- `DELETE /api/messages/[id]` を追加して削除できるようにする。

## つまずきポイント
- **`req.json()` で例外**: body が空、または `Content-Type: application/json` が無い。
- **CORS や 405**: メソッド名の関数名（`GET`/`POST`）が大文字になっているか確認。

## 参考リンク
- [Next.js: Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

➡️ 次は [Stage 07: データ取得](../stage-07-data-fetching/README.md)
