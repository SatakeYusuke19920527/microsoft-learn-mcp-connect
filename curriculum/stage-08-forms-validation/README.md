# Stage 08: フォームとバリデーション（react-hook-form + zod）

実務で必須の「入力フォーム」を、検証付きでちゃんと作ります。

## 学習目標
- `react-hook-form` でフォームを管理できる
- `zod` でスキーマを定義し、入力を検証できる
- `@hookform/resolvers` で両者を連携できる
- エラーメッセージを表示し、送信処理に繋げられる

## 前提
- Stage 07 完了（このリポジトリには react-hook-form / zod / @hookform/resolvers 導入済み）

## 背景解説

### なぜライブラリを使うのか
`useState` だけでも作れますが、項目が増えると検証・エラー表示・再描画管理が大変です。
`react-hook-form` は高速で記述量が少なく、`zod` で型安全な検証ルールを書けます。

### zod スキーマ
```ts
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, "名前は必須です"),
  email: z.string().email("メール形式が不正です"),
  age: z.coerce.number().min(0, "0以上で入力"),
});
type FormValues = z.infer<typeof schema>;
```

### react-hook-form と連携
```tsx
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const { register, handleSubmit, formState: { errors } } =
  useForm<FormValues>({ resolver: zodResolver(schema) });

const onSubmit = (data: FormValues) => console.log(data);

<form onSubmit={handleSubmit(onSubmit)}>
  <input {...register("name")} />
  {errors.name && <p>{errors.name.message}</p>}
  <button type="submit">送信</button>
</form>
```

## 課題

### 課題 8-1: お問い合わせフォーム
名前・メール・本文（10文字以上）の 3 項目を持つフォームを作る。zod で検証し、各項目の下にエラーを表示する。

### 課題 8-2: 送信処理
送信が成功したら（検証 OK なら）、入力内容を画面に「送信されました」とともに表示する。

### 課題 8-3: API と連携
Stage 06 の `/api/messages` に `POST` して保存する。送信中はボタンを `disabled` にする（`isSubmitting`）。

## 完了条件
- [ ] 不正な入力でエラーメッセージが各項目に出る
- [ ] 正しい入力でのみ送信処理が走る
- [ ] 送信中はボタンが押せない
- [ ] 送信内容が API 経由で保存され、一覧に反映される

## 発展課題
- shadcn/ui の `Form` コンポーネント（`src/components/ui/form.tsx`）を使って書き換える。
- パスワードと確認用パスワードの一致チェックを `zod` の `.refine()` で実装する。

## つまずきポイント
- **数値が文字列になる**: input の値は文字列。`z.coerce.number()` を使う。
- **エラーが出ない**: `resolver: zodResolver(schema)` の指定漏れを確認。

## 参考リンク
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)

➡️ 次は [Stage 09: データベース連携](../stage-09-database/README.md)
