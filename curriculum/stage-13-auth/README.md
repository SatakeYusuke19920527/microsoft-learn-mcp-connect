# Stage 13: 認証（ログインとユーザー管理）

チャットに「誰が送ったか」を入れます。ログイン機能を実装し、ユーザーを識別します。

## 学習目標
- 認証ライブラリ（Auth.js / NextAuth）の基本を理解する
- ログイン・ログアウト・セッションを扱える
- ログインユーザー情報をメッセージに紐付けられる
- 未ログイン時にページを保護できる

## 前提
- Stage 12 完了

## 背景解説

### Auth.js (NextAuth) とは
Next.js 向けの認証ライブラリ。OAuth（GitHub / Google）やメール、Credentials など複数の方式に対応します。

```bash
npm install next-auth
```

### 設定の流れ
1. `src/auth.ts` でプロバイダとオプションを定義
2. `src/app/api/auth/[...nextauth]/route.ts` でハンドラを公開
3. `.env` に `AUTH_SECRET` と各プロバイダのキーを設定

```ts
// src/auth.ts （GitHub OAuth の例）
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
});
```

### セッションの取得
```tsx
// Server Component
import { auth } from "@/auth";
const session = await auth();
if (!session) redirect("/login");
```

```tsx
// Client Component
"use client";
import { useSession } from "next-auth/react";
const { data: session } = useSession();
```

## 課題

### 課題 13-1: ログイン機能
Auth.js を導入し、GitHub（または Credentials）でログイン・ログアウトできるようにする。
ヘッダーにログイン状態とユーザー名／アバターを表示する。

### 課題 13-2: メッセージに送信者を紐付け
メッセージ保存時に、ログインユーザーの情報（名前/ID）を `sender` として保存する。
自分の発言は右（緑）、他人は左（グレー）に出し分ける。

### 課題 13-3: ページ保護
未ログインでチャットページにアクセスしたら `/login` にリダイレクトする。

## 完了条件
- [ ] ログイン／ログアウトができる
- [ ] 送信したメッセージに正しい送信者が記録される
- [ ] 自分と他人のメッセージが左右で正しく分かれる
- [ ] 未ログインだとチャットにアクセスできない
- [ ] `AUTH_SECRET` などの秘密情報は `.env`（gitignore 済み）

## 発展課題
- ユーザーごとのアバター画像を吹き出しに表示する。
- ルームに「参加者」概念を入れ、参加者だけが閲覧できるようにする。

## つまずきポイント
- **`AUTH_SECRET` 未設定エラー**: `npx auth secret` で生成して `.env` に入れる。
- **OAuth コールバックエラー**: GitHub 側のコールバック URL（`http://localhost:3000/api/auth/callback/github`）を登録。

## 参考リンク
- [Auth.js (NextAuth.js)](https://authjs.dev/)

➡️ 次は [Stage 14: LLM 連携](../stage-14-llm-basics/README.md)
