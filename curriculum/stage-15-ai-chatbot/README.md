# Stage 15: AI チャットボット（ストリーミング応答）

AI の回答を「1 文字ずつ流れるように」表示する、本格的なチャットボットを作ります。

## 学習目標
- `streamText` でストリーミング応答を返せる
- `@ai-sdk/react` の `useChat` でチャット UI を簡単に作れる
- 会話履歴（文脈）を維持できる
- Stage 10 のチャット UI に AI を組み込める

## 前提
- Stage 14 完了

## 背景解説

### なぜストリーミング？
LLM の生成には時間がかかります。完成を待たず逐次表示することで体感速度が大きく向上します（ChatGPT のあの挙動）。

### サーバー側: streamText
```ts
// src/app/api/chat/route.ts
import { azure } from "@ai-sdk/azure";
import { streamText } from "ai";

export async function POST(req: Request) {
  const { messages } = await req.json();
  const result = streamText({
    model: azure(process.env.AZURE_DEPLOYMENT_NAME!),
    system: "あなたは親切な日本語アシスタントです。",
    messages,
  });
  return result.toDataStreamResponse();
}
```

### クライアント側: useChat
`useChat` が入力管理・送信・ストリーミング受信・履歴保持を全部やってくれます。

```tsx
"use client";
import { useChat } from "@ai-sdk/react";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chat",
  });
  return (
    <div>
      {messages.map((m) => (
        <div key={m.id}>{m.role}: {m.content}</div>
      ))}
      <form onSubmit={handleSubmit}>
        <input value={input} onChange={handleInputChange} />
        <button>送信</button>
      </form>
    </div>
  );
}
```

## 課題

### 課題 15-1: ストリーミング Chat API
`/api/chat` を `streamText` で実装し、`toDataStreamResponse()` を返す。

### 課題 15-2: useChat で UI
`useChat` を使ってチャット画面を作る。応答が逐次流れて表示されることを確認する。

### 課題 15-3: 吹き出し UI に統合
Stage 10 で作った吹き出しデザインを適用し、ユーザーは右、AI は左に表示する。送信中ローディングも出す。

## 完了条件
- [ ] AI の回答が 1 文字ずつ流れて表示される
- [ ] 直前の会話を踏まえた応答が返る（文脈維持）
- [ ] 吹き出しデザインで自分/AI が左右に分かれる
- [ ] 送信中の状態（`isLoading`）が UI に反映される

## 発展課題
- 会話履歴を DB（Stage 09）に保存し、リロードしても続きから話せるようにする。
- 「考え中…」のタイピングインジケーターを表示する。

## つまずきポイント
- **応答が一括で出る/出ない**: `toDataStreamResponse()` を返しているか、`useChat` の `api` パスが一致しているか確認。
- **履歴が渡らない**: `useChat` は `messages` を自動送信。サーバーで `messages` を受け取っているか確認。

## 参考リンク
- [AI SDK: useChat](https://sdk.vercel.ai/docs/reference/ai-sdk-ui/use-chat)
- [AI SDK: streamText](https://sdk.vercel.ai/docs/reference/ai-sdk-core/stream-text)

➡️ 次は [Stage 16: 埋め込みとベクトル検索](../stage-16-embeddings/README.md)
