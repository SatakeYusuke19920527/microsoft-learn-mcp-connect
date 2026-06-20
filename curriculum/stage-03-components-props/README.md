# Stage 03: コンポーネントと Props

UI を「部品（コンポーネント）」に分けて再利用する考え方を学びます。

## 学習目標
- コンポーネントを自作して別ファイルから使える
- Props でデータを子コンポーネントに渡せる
- 配列を `map` で繰り返し描画できる（`key` の役割を理解）

## 前提
- Stage 02 完了

## 背景解説

### コンポーネントとは
画面を構成する再利用可能な部品です。関数として定義し、`<MyComponent />` のように使います。

```tsx
// src/components/Greeting.tsx
export default function Greeting() {
  return <p>こんにちは！</p>;
}
```

```tsx
// 使う側
import Greeting from "@/components/Greeting";
<Greeting />
```

> `@/` はプロジェクトの `src/` を指すエイリアスです（`tsconfig.json` で設定済み）。

### Props でデータを渡す
コンポーネントに引数のようにデータを渡せます。型は TypeScript で定義します。

```tsx
type Props = { name: string };

export default function Greeting({ name }: Props) {
  return <p>こんにちは、{name} さん！</p>;
}

// 使う側
<Greeting name="田中" />
```

### リスト描画
配列を `map` で回して複数要素を描画します。各要素には一意な `key` が必要です。

```tsx
const users = ["田中", "佐藤", "鈴木"];
return (
  <ul>
    {users.map((u) => (
      <li key={u}>{u}</li>
    ))}
  </ul>
);
```

## 課題

### 課題 3-1: UserCard コンポーネント
`src/components/UserCard.tsx` を作る。Props として `name`（string）と `age`（number）を受け取り、
「名前: ○○ / 年齢: ○○歳」と表示する。

### 課題 3-2: 複数表示
トップページで `UserCard` を 3 人分、別々の Props で表示する。

### 課題 3-3: 配列から生成
ユーザー情報の配列を定義し、`map` で `UserCard` を生成する。`key` を正しく設定すること。

```tsx
const users = [
  { id: 1, name: "田中", age: 28 },
  { id: 2, name: "佐藤", age: 34 },
  { id: 3, name: "鈴木", age: 22 },
];
```

## 完了条件
- [ ] `UserCard` が別ファイルとして存在し、import して使える
- [ ] Props で名前と年齢を渡せる
- [ ] 配列を `map` して 3 枚のカードが表示される
- [ ] コンソールに `key` 警告が出ていない

## 発展課題
- Props に `role?: string` を任意項目として追加し、ある時だけ役職を表示する。
- カードに「いいね数」を Props で渡し、数字に応じて表示色を変える。

## つまずきポイント
- **`key` 警告**: `map` の最上位要素に一意な `key` を付け忘れています。`id` を使いましょう。
- **Props が undefined**: 渡し忘れ、または分割代入のスペルミスを確認。

## 参考リンク
- [React: Passing Props to a Component](https://react.dev/learn/passing-props-to-a-component)
- [React: Rendering Lists](https://react.dev/learn/rendering-lists)

➡️ 次は [Stage 04: スタイリング](../stage-04-styling/README.md)
