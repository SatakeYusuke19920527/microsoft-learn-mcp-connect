# Stage 12: リアルタイム通信（SSE / WebSocket）

ポーリングを卒業し、メッセージが「即時」に相手へ届く仕組みを作ります。

## 学習目標
- Server-Sent Events (SSE) で push 配信できる
- WebSocket との違いと使い分けを理解する
- 複数クライアントへブロードキャストできる
- 接続管理（接続・切断）の基礎を知る

## 前提
- Stage 11 完了

## 背景解説

### ポーリング vs SSE vs WebSocket
| 方式 | 方向 | 用途 |
|------|------|------|
| ポーリング | 定期 GET | 簡単だが無駄が多い |
| SSE | サーバー→クライアント（単方向） | 通知・チャット受信に最適、実装が軽い |
| WebSocket | 双方向 | ゲーム・共同編集など低遅延双方向 |

チャットでは「送信は POST、受信は SSE」という構成が手軽でおすすめです。

### SSE の Route Handler
```ts
// src/app/api/rooms/[roomId]/stream/route.ts
export async function GET() {
  const stream = new ReadableStream({
    start(controller) {
      const send = (data: unknown) =>
        controller.enqueue(`data: ${JSON.stringify(data)}\n\n`);
      // emitter にリスナー登録して send を呼ぶ
    },
  });
  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
```

### クライアント側
```tsx
useEffect(() => {
  const es = new EventSource(`/api/rooms/${roomId}/stream`);
  es.onmessage = (e) => {
    const msg = JSON.parse(e.data);
    setMessages((prev) => [...prev, msg]);
  };
  return () => es.close();
}, [roomId]);
```

### ブロードキャスト
Node の `EventEmitter` をモジュールスコープに置き、POST 時に `emit`、各 SSE 接続で `on` して配信します。
（本番では Redis Pub/Sub や Ably / Pusher などの専用サービスを使います）

## 課題

### 課題 12-1: SSE エンドポイント
ルームごとの SSE ストリームを作る。`EventEmitter` を使い、新着メッセージを接続中の全クライアントへ配信する。

### 課題 12-2: 送信と受信の分離
送信は既存の `POST`、受信は `EventSource` に切り替える。ポーリングを削除する。

### 課題 12-3: 2 タブで会話
2 つのブラウザタブを開き、片方の送信がもう片方へ即座に表示されることを確認する。

## 完了条件
- [ ] 片方のタブで送ると、もう片方へほぼ即時に表示される
- [ ] ポーリングを使っていない
- [ ] タブを閉じると接続が解放される（`es.close()`）
- [ ] SSE と WebSocket の違いを説明できる

## 発展課題
- 「入力中…」インジケーターを SSE で配信する。
- WebSocket 版（`ws` ライブラリ or 外部サービス）に挑戦する。

## つまずきポイント
- **メッセージが来ない**: SSE のフォーマットは `data: ...\n\n`（末尾に空行2つ）が必須。
- **本番で動かない**: サーバーレス環境では長時間接続が切れることがある。専用リアルタイムサービスを検討。

## 参考リンク
- [MDN: Server-Sent Events](https://developer.mozilla.org/ja/docs/Web/API/Server-sent_events)

➡️ 次は [Stage 13: 認証](../stage-13-auth/README.md)
