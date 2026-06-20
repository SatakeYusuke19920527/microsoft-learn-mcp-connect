# Stage 10: チャット UI（LINE風の吹き出し）

いよいよチャットアプリ制作に入ります。まずは見た目（吹き出し UI）を作ります。

## 学習目標
- 自分/相手で左右に分かれる吹き出しレイアウトを作れる
- メッセージ配列を `map` で描画できる
- 入力欄と送信ボタンを下部に固定できる
- 新着メッセージへ自動スクロールできる

## 前提
- Stage 05・Stage 09 完了

## 完成イメージ
```
┌─────────────────────────┐
│ 田中さん                 │
│ ┌──────────┐            │
│ │ こんにちは │            │  ← 相手（左・グレー）
│ └──────────┘            │
│            ┌──────────┐ │
│            │ やあ！    │ │  ← 自分（右・緑）
│            └──────────┘ │
├─────────────────────────┤
│ [メッセージを入力] [送信] │
└─────────────────────────┘
```

## 背景解説

### メッセージの型
```ts
type Message = {
  id: number;
  text: string;
  sender: "me" | "other";
  createdAt: string;
};
```

### 吹き出しコンポーネント
`sender` に応じて配置と色を変えます。

```tsx
function Bubble({ m }: { m: Message }) {
  const isMe = m.sender === "me";
  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"} mb-2`}>
      <div className={`max-w-[70%] rounded-2xl px-4 py-2 ${
        isMe ? "bg-green-500 text-white" : "bg-gray-200 text-black"
      }`}>
        {m.text}
      </div>
    </div>
  );
}
```

### 自動スクロール
```tsx
const bottomRef = useRef<HTMLDivElement>(null);
useEffect(() => {
  bottomRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages]);
// JSX 末尾: <div ref={bottomRef} />
```

## 課題

### 課題 10-1: 吹き出しレイアウト
ダミーのメッセージ配列を使い、自分は右（緑）、相手は左（グレー）の吹き出しで表示する。

### 課題 10-2: 入力＆送信（ローカル）
画面下部に固定した入力欄＋送信ボタンを作り、送信すると自分の吹き出しがリストに追加される（まだ DB 不要）。

### 課題 10-3: 自動スクロール
メッセージを追加したら最下部へ自動スクロールする。Enter キーでも送信できるようにする。

## 完了条件
- [ ] 自分/相手で左右・色が分かれて表示される
- [ ] 入力して送信すると自分の吹き出しが増える
- [ ] 新着で自動的に一番下までスクロールする
- [ ] 入力欄が画面下部に固定されている

## 発展課題
- 送信時刻を吹き出しの脇に小さく表示する。
- アバター（`Avatar`）を相手メッセージの左に表示する。

## つまずきポイント
- **下部固定が崩れる**: 親を `flex flex-col h-screen`、メッセージ領域を `flex-1 overflow-y-auto` にする。
- **スクロールしない**: `bottomRef` の `<div>` を JSX の最後に置いているか確認。

## 参考リンク
- [React: useRef](https://react.dev/reference/react/useRef)

➡️ 次は [Stage 11: メッセージ送受信](../stage-11-chat-messaging/README.md)
