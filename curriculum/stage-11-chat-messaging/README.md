# Stage 11: メッセージ送受信（DB 永続化）

チャット UI を実際のデータベースに繋ぎ、メッセージを保存・取得します。

## 学習目標
- チャットメッセージを Prisma で永続化できる
- 送信で `POST`、表示で `GET` の流れを実装できる
- 楽観的更新（送信した瞬間に画面へ反映）の考え方を知る
- ルーム（会話）単位でメッセージを分けられる

## 前提
- Stage 09・Stage 10 完了

## 背景解説

### スキーマ（ルーム対応）
```prisma
model Room {
  id        Int       @id @default(autoincrement())
  name      String
  messages  Message[]
}

model Message {
  id        Int      @id @default(autoincrement())
  text      String
  sender    String   // "me" / "other" やユーザー名
  roomId    Int
  room      Room     @relation(fields: [roomId], references: [id])
  createdAt DateTime @default(now())
}
```

### API 設計
| メソッド | パス | 役割 |
|----------|------|------|
| GET | `/api/rooms/[roomId]/messages` | そのルームのメッセージ一覧 |
| POST | `/api/rooms/[roomId]/messages` | メッセージ送信 |

### 楽観的更新
送信ボタンを押した瞬間にローカル State へ追加 → 裏で API 保存。失敗したら戻す。体感速度が向上します。

```tsx
setMessages((prev) => [...prev, optimisticMsg]); // 即反映
await fetch(..., { method: "POST", body }); // 裏で保存
```

## 課題

### 課題 11-1: スキーマ拡張とAPI
`Room` / `Message` を定義してマイグレーション。ルーム別のメッセージ API（GET / POST）を作る。

### 課題 11-2: チャット画面と接続
Stage 10 の UI を、API からの取得・保存に置き換える。ページ表示時に `GET` で履歴を読み込む。

### 課題 11-3: ポーリングで擬似リアルタイム
`setInterval` で 3 秒ごとに `GET` し、別タブで送ったメッセージが反映されることを確認する（次ステージで本物のリアルタイムにする）。

## 完了条件
- [ ] 送信したメッセージが DB に保存される
- [ ] リロードしても履歴が残っている
- [ ] 別タブで送った内容がポーリングで表示される
- [ ] 楽観的更新で送信が即座に画面へ出る

## 発展課題
- 送信失敗時にメッセージを「送信失敗（再送）」表示にする。
- ルーム一覧ページを作り、ルームを切り替えられるようにする。

## つまずきポイント
- **ポーリングが止まらない**: `useEffect` のクリーンアップで `clearInterval` する。
- **重複表示**: 楽観的更新の仮メッセージと、再取得した本物が重複しないよう一時 ID を扱う。

## 参考リンク
- [Prisma Relations](https://www.prisma.io/docs/orm/prisma-schema/data-model/relations)

➡️ 次は [Stage 12: リアルタイム通信](../stage-12-realtime/README.md)
