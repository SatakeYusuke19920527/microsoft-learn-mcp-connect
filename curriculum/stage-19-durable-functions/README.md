# Stage 19: Durable Functions 入門

長時間・複数ステップの処理を確実に実行する仕組み「Azure Durable Functions」を学びます。
マルチエージェントの土台になります。

## 学習目標
- Durable Functions の 3 つの関数（クライアント / オーケストレーター / アクティビティ）を理解する
- オーケストレーションで処理の流れを記述できる
- ファンアウト/ファンイン（並列実行）を書ける
- 状態保持・再開（リプレイ）の概念を理解する

## 前提
- Stage 18 完了
- Azure サブスクリプション、[Azure Functions Core Tools](https://learn.microsoft.com/azure/azure-functions/functions-run-local)

## 背景解説

### なぜ Durable Functions か
通常のサーバーレス関数は短時間で終わる必要があります。
RAG パイプラインや複数エージェントの連携など「長く・順番に・並列に・失敗しても再開」したい処理には、
状態を保持できる **Durable Functions** が適しています。

### 3 種類の関数
| 種類 | 役割 |
|------|------|
| クライアント関数 | オーケストレーションを起動（HTTP トリガーなど） |
| オーケストレーター関数 | 処理の流れ（どのアクティビティをどの順で呼ぶか）を定義 |
| アクティビティ関数 | 実際の作業（API 呼び出し、AI 推論など）を 1 単位で実行 |

### オーケストレーションの例（TypeScript）
```ts
import * as df from "durable-functions";

df.app.orchestration("processOrchestrator", function* (context) {
  const a = yield context.df.callActivity("stepA", input);
  const b = yield context.df.callActivity("stepB", a);
  return b;
});
```

### ファンアウト/ファンイン（並列）
```ts
const tasks = items.map((i) => context.df.callActivity("work", i));
const results = yield context.df.Task.all(tasks); // 並列実行して全部待つ
```

> オーケストレーターは「リプレイ」されるため、**決定的（deterministic）** に書く必要があります
> （関数内で直接 `Date.now()` やランダム、I/O を呼ばない。`context.df` 経由で行う）。

## 課題

### 課題 19-1: プロジェクト作成
Azure Functions Core Tools で Durable Functions（TypeScript）プロジェクトを作り、ローカルで起動する。

### 課題 19-2: 順次オーケストレーション
3 つのアクティビティ（例: 取得 → 加工 → 整形）を順番に呼ぶオーケストレーションを実装し、HTTP で起動して結果を得る。

### 課題 19-3: ファンアウト/ファンイン
複数の入力を並列にアクティビティ処理し、結果をまとめて返す（`Task.all`）。

## 完了条件
- [ ] Durable Functions をローカルで起動できる
- [ ] 順次オーケストレーションが動く
- [ ] 並列処理（ファンアウト/ファンイン）が動く
- [ ] ステータス照会 API で実行状況を確認できる

## 発展課題
- アクティビティでエラーを起こし、リトライポリシーを設定する。
- 人間の承認を待つ「外部イベント待ち（`waitForExternalEvent`）」を実装する。

## つまずきポイント
- **非決定的エラー**: オーケストレーター内で直接 I/O やランダムを使っている。アクティビティに移す。
- **ローカルで動かない**: Storage エミュレータ（Azurite）が必要。`azurite` を起動。

## 参考リンク
- [Azure Durable Functions](https://learn.microsoft.com/azure/azure-functions/durable/durable-functions-overview)
- [Durable Functions (Node.js/TypeScript)](https://learn.microsoft.com/azure/azure-functions/durable/quickstart-ts-vscode)

➡️ 次は [Stage 20: マルチエージェント](../stage-20-multi-agent/README.md)
