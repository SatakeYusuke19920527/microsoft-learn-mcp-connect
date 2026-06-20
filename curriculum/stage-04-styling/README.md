# Stage 04: スタイリング（Tailwind CSS / shadcn/ui）

見た目を整える方法を学びます。Tailwind CSS のユーティリティクラスと、shadcn/ui の既製コンポーネントを使います。

## 学習目標
- Tailwind のユーティリティクラスでレイアウト・色・余白を指定できる
- Flexbox / Grid で要素を配置できる
- shadcn/ui の `Button` や `Card` を導入して使える
- レスポンシブ対応の基礎を知る

## 前提
- Stage 03 完了

## 背景解説

### Tailwind CSS
クラス名で直接スタイルを当てる方式です。CSS ファイルを書かずに `className` に並べます。

```tsx
<div className="flex items-center gap-4 p-6 bg-slate-100 rounded-lg">
  <span className="text-xl font-bold text-blue-600">タイトル</span>
</div>
```

よく使うクラス:
- 余白: `p-4`（padding）, `m-2`（margin）, `gap-4`
- 配置: `flex`, `grid`, `items-center`, `justify-between`
- 色: `bg-blue-500`, `text-white`
- 文字: `text-lg`, `font-bold`
- 角丸/影: `rounded-lg`, `shadow-md`

### レスポンシブ
画面幅に応じて `sm:` `md:` `lg:` の接頭辞で切り替えます。

```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">...</div>
```

### shadcn/ui
コピーして使える高品質な React コンポーネント集です（このリポジトリには既に導入済み、`src/components/ui/`）。
新規プロジェクトでは以下で追加します。

```bash
npx shadcn@latest add button card
```

```tsx
import { Button } from "@/components/ui/button";
<Button variant="default">送信</Button>
```

## 課題

### 課題 4-1: カードを装飾する
Stage 03 の `UserCard` を Tailwind で装飾する。白背景・角丸・影・適切な余白を付ける。

### 課題 4-2: グリッド配置
3 枚のカードを、PC では横 3 列、スマホでは縦 1 列に並べる（`grid-cols-1 md:grid-cols-3`）。

### 課題 4-3: shadcn/ui のボタン
各カードに shadcn/ui の `Button` を置き、`variant` を `default` / `outline` / `destructive` で出し分ける。

## 完了条件
- [ ] カードに背景色・角丸・影・余白が付いている
- [ ] 画面幅を変えると列数が 1 ⇔ 3 で切り替わる
- [ ] shadcn/ui の `Button` が表示され、3 種類の見た目を確認できた

## 発展課題
- ダークモード対応（`dark:` 接頭辞、`next-themes`）を試す。
- `Card`, `Avatar`, `Badge` コンポーネントを追加してリッチなプロフィールカードにする。

## つまずきポイント
- **クラスが効かない**: タイポ、または Tailwind が対象ファイルを走査できていない可能性。`globals.css` の読み込みを確認。
- **shadcn の import が赤い**: コンポーネント未追加です。`npx shadcn@latest add <name>` を実行。

## 参考リンク
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)

➡️ 次は [Stage 05: State とイベント](../stage-05-state-events/README.md)
