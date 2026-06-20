# Stage 09: データベース連携（Prisma）

データを「永続化」します。サーバーを再起動しても消えないよう、データベースに保存します。

## 学習目標
- Prisma のセットアップとスキーマ定義ができる
- マイグレーションでテーブルを作成できる
- Prisma Client で CRUD（作成・取得・更新・削除）ができる
- Route Handler から DB を操作できる

## 前提
- Stage 08 完了

## 背景解説

### Prisma とは
TypeScript 向けの ORM（データベース操作ライブラリ）です。型安全に DB を扱えます。
学習用には手軽な **SQLite**、本番では PostgreSQL などを使います。

### セットアップ
```bash
npm install prisma --save-dev
npm install @prisma/client
npx prisma init --datasource-provider sqlite
```

### スキーマ定義
```prisma
// prisma/schema.prisma
model Message {
  id        Int      @id @default(autoincrement())
  text      String
  author    String   @default("anonymous")
  createdAt DateTime @default(now())
}
```

### マイグレーション
```bash
npx prisma migrate dev --name init
```

### Prisma Client の使い方
```ts
// src/lib/prisma.ts （シングルトン推奨）
import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();
```

```ts
// 作成
await prisma.message.create({ data: { text: "こんにちは", author: "田中" } });
// 一覧（新しい順）
await prisma.message.findMany({ orderBy: { createdAt: "desc" } });
// 削除
await prisma.message.delete({ where: { id } });
```

## 課題

### 課題 9-1: スキーマとマイグレーション
`Message` モデルを定義し、マイグレーションを実行してテーブルを作る。
`npx prisma studio` でテーブルを確認する。

### 課題 9-2: API を DB 化
Stage 06 のメモリ版 `/api/messages` を、Prisma を使った永続化版に書き換える。
- `GET`: DB から新しい順で取得
- `POST`: DB に保存

### 課題 9-3: 削除機能
`DELETE /api/messages/[id]` を作り、フロントの各メッセージに削除ボタンを付ける。

## 完了条件
- [ ] `prisma migrate` が成功し、`prisma studio` でテーブルが見える
- [ ] メッセージがサーバー再起動後も残っている
- [ ] 追加・取得・削除がすべて動く
- [ ] `.env` の `DATABASE_URL` を `.gitignore` 済み（秘密情報を commit しない）

## 発展課題
- `Message` に `User` モデルとのリレーション（`userId`）を追加する。
- ページネーション（`skip` / `take`）を実装する。

## つまずきポイント
- **`PrismaClient` を毎回 new して警告**: 開発時は HMR で多重生成されます。`globalThis` を使ったシングルトンにする。
- **マイグレーションが反映されない**: スキーマ変更後は再度 `migrate dev` が必要。

## 参考リンク
- [Prisma Docs](https://www.prisma.io/docs)
- [Prisma + Next.js](https://www.prisma.io/nextjs)

➡️ 次は [Stage 10: チャット UI](../stage-10-chat-ui/README.md)
