# Stage 14: LLM 連携（Azure OpenAI + AI SDK）

AI 機能の入り口です。大規模言語モデル（LLM）を呼び出して応答を得ます。

## 学習目標
- AI SDK（Vercel AI SDK）の基本を理解する
- Azure OpenAI のデプロイ・接続情報を設定できる
- サーバー側で `generateText` を呼び、応答を得られる
- API キーを安全に扱える（クライアントに漏らさない）

## 前提
- Stage 13 完了（このリポジトリには `ai` / `@ai-sdk/azure` / `@ai-sdk/react` 導入済み）
- Azure OpenAI リソースとモデルのデプロイ

## 背景解説

### LLM とは
大量のテキストで学習し、文章生成・要約・質問応答ができるモデル（GPT-4o など）です。
本カリキュラムでは Azure 上の OpenAI（Azure OpenAI Service）を使います。

### 環境変数
```
# .env.local
AZURE_RESOURCE_NAME=your-resource
AZURE_API_KEY=xxxxxxxx
AZURE_DEPLOYMENT_NAME=gpt-4o
```

### サーバーで呼び出す（必ずサーバー側！）
```ts
// src/app/api/ai/route.ts
import { azure } from "@ai-sdk/azure";
import { generateText } from "ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { prompt } = await req.json();
  const { text } = await generateText({
    model: azure(process.env.AZURE_DEPLOYMENT_NAME!),
    prompt,
  });
  return NextResponse.json({ text });
}
```

> API キーを使う処理は必ず Route Handler / Server 側で。クライアントへキーを渡さないこと。

## 課題

### 課題 14-1: 接続確認
Azure OpenAI の環境変数を設定し、`/api/ai` に固定プロンプト（例:「自己紹介して」）を投げて応答を得る。

### 課題 14-2: プロンプト入力 UI
テキスト入力欄から任意のプロンプトを送り、AI の応答を画面に表示する。

### 課題 14-3: システムプロンプト
`system` メッセージで AI の役割（例:「あなたは親切な日本語アシスタントです」）を固定し、口調が変わることを確認する。

```ts
const { text } = await generateText({
  model: azure(deployment),
  system: "あなたは親切な日本語アシスタントです。",
  prompt,
});
```

## 完了条件
- [ ] `/api/ai` から AI の応答が返ってくる
- [ ] 入力欄から任意の質問を送り、回答が表示される
- [ ] システムプロンプトで応答スタイルが変わる
- [ ] API キーがクライアント側のコードに含まれていない

## 発展課題
- `temperature` を変えて応答のばらつきを比較する。
- トークン使用量（`usage`）をログに出す。

## つまずきポイント
- **401 / 認証エラー**: リソース名・キー・デプロイ名・API バージョンを再確認。
- **モデルが見つからない**: `azure(...)` に渡すのは「デプロイ名」（モデル名ではない）。

## 参考リンク
- [AI SDK](https://sdk.vercel.ai/docs)
- [Azure OpenAI Service](https://learn.microsoft.com/azure/ai-services/openai/)

➡️ 次は [Stage 15: AI チャットボット](../stage-15-ai-chatbot/README.md)
