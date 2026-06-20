# Stage 16: 埋め込みとベクトル検索

RAG の心臓部です。文章を「ベクトル」に変換し、意味が近い文書を検索できるようにします。

## 学習目標
- 埋め込み（Embedding）とは何かを理解する
- テキストをベクトル化できる（`embed` / `embedMany`）
- コサイン類似度で「意味の近さ」を測れる
- ベクトルストア（pgvector など）に保存・検索できる

## 前提
- Stage 14 完了

## 背景解説

### 埋め込み（Embedding）とは
テキストを数百〜数千次元の数値ベクトルに変換したものです。
意味が近い文章はベクトル空間でも近くに配置されます。これにより「キーワード一致」ではなく「意味検索」が可能になります。

```
"犬がほえる"   → [0.12, -0.03, 0.88, ...]
"イヌが鳴く"   → [0.11, -0.01, 0.90, ...]  ← 近い！
"株価が上がる" → [-0.7, 0.4, 0.02, ...]    ← 遠い
```

### ベクトル化（AI SDK）
```ts
import { azure } from "@ai-sdk/azure";
import { embed, embedMany } from "ai";

const { embedding } = await embed({
  model: azure.textEmbeddingModel("text-embedding-3-small"),
  value: "犬がほえる",
});
```

### 類似度（コサイン類似度）
2 つのベクトルがどれだけ同じ向きか（-1〜1、1 に近いほど類似）。

```ts
function cosineSimilarity(a: number[], b: number[]) {
  const dot = a.reduce((s, v, i) => s + v * b[i], 0);
  const magA = Math.sqrt(a.reduce((s, v) => s + v * v, 0));
  const magB = Math.sqrt(b.reduce((s, v) => s + v * v, 0));
  return dot / (magA * magB);
}
```

### ベクトルストア
学習段階ではメモリ配列でも可。本格的には PostgreSQL + **pgvector** 拡張、または専用 DB（Pinecone, Qdrant, Azure AI Search）を使います。

## 課題

### 課題 16-1: 文章をベクトル化
数件の短文を `embedMany` でベクトル化し、次元数を確認する。

### 課題 16-2: 意味検索（メモリ版）
クエリ文をベクトル化し、コサイン類似度で最も近い文を返す関数を作る。
「キーワードが違っても意味が近ければヒットする」ことを確認する。

### 課題 16-3: ドキュメント分割（チャンク化）
長い文章を 300〜500 文字程度の「チャンク」に分割し、各チャンクをベクトル化して保存する。
（後段の RAG で、関連チャンクだけを取り出すため）

## 完了条件
- [ ] テキストをベクトル化できる
- [ ] クエリに意味的に近い文を検索できる
- [ ] キーワード非一致でも意味が近ければヒットする例を作れた
- [ ] 長文をチャンクに分割して保存できる

## 発展課題
- pgvector を導入し、SQL の `<=>` 演算子で近傍検索する。
- チャンクのオーバーラップ（前後を少し重ねる）を実装し精度を比較する。

## つまずきポイント
- **次元が合わない**: 検索と保存で同じ埋め込みモデルを使う。
- **遅い**: メモリ全件比較は件数が増えると遅い。本番はベクトル DB のインデックスを使う。

## 参考リンク
- [AI SDK: Embeddings](https://sdk.vercel.ai/docs/ai-sdk-core/embeddings)
- [pgvector](https://github.com/pgvector/pgvector)

➡️ 次は [Stage 17: RAG アプリ](../stage-17-rag/README.md)
