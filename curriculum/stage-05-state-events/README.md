# Stage 05: State とイベント

画面に「動き」をつけます。ユーザー操作に反応して表示が変わる仕組み（State）を学びます。

## 学習目標
- `"use client"` の意味（Server / Client Component の違い）を理解する
- `useState` で状態を保持し、更新できる
- イベントハンドラ（onClick / onChange）を書ける
- `useEffect` で副作用（初期データ取得など）を扱える

## 前提
- Stage 04 完了

## 背景解説

### Server Component と Client Component
App Router の標準は **Server Component**（サーバーで描画、軽量）です。
`useState` などインタラクションが必要な場合は、ファイル先頭に `"use client"` を書いて **Client Component** にします。

```tsx
"use client";
import { useState } from "react";
```

### useState
状態（値）とその更新関数のペアを作ります。更新関数を呼ぶと再描画されます。

```tsx
const [count, setCount] = useState(0);
// ...
<button onClick={() => setCount(count + 1)}>+1</button>
<p>{count}</p>
```

### onChange で入力を扱う
```tsx
const [text, setText] = useState("");
<input value={text} onChange={(e) => setText(e.target.value)} />
<p>入力中: {text}</p>
```

### useEffect
コンポーネント表示時や、ある値が変わったときに処理を走らせます。

```tsx
useEffect(() => {
  console.log("マウントされた");
}, []); // 空配列 = 初回だけ
```

## 課題

### 課題 5-1: カウンター
`"use client"` を付けたコンポーネントで、`+1` / `-1` / `リセット` ボタンを持つカウンターを作る。

### 課題 5-2: リアルタイム入力表示
テキスト入力欄を作り、入力した文字をその下にリアルタイムで表示する。
さらに文字数も「○文字」と表示する。

### 課題 5-3: ToDo リスト（ミニ）
入力欄と「追加」ボタンを作り、追加するとリストに項目が増えるようにする。
配列の State を `setTodos([...todos, newItem])` で更新する。各項目に削除ボタンも付ける。

## 完了条件
- [ ] カウンターが増減・リセットできる
- [ ] 入力した文字がリアルタイムに表示され、文字数も出る
- [ ] ToDo を追加・削除できる
- [ ] `"use client"` が無いと `useState` でエラーになることを体感した

## 発展課題
- ToDo に「完了」チェックを付け、完了したものは打ち消し線で表示する。
- `useEffect` + `localStorage` で、リロードしても ToDo が消えないようにする。

## つまずきポイント
- **`useState is not a function` / フックのエラー**: `"use client"` を先頭行に書いていますか？
- **入力できない**: `value` だけ指定して `onChange` を書いていないと入力が固定されます（制御コンポーネント）。
- **配列を直接 push しても再描画されない**: 必ず新しい配列を作って `setState` に渡す。

## 参考リンク
- [React: State - useState](https://react.dev/reference/react/useState)
- [Next.js: Server and Client Components](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns)

➡️ 次は [Stage 06: Route Handlers](../stage-06-route-handlers/README.md)
