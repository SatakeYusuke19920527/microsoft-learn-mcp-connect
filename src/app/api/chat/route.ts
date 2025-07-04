/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';

// 必要な環境変数は .env.local などでセットしてください
const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
const apiKey = process.env.AZURE_API_KEY;
const deployment = process.env.AZURE_OPENAI_DEPLOYMENT;
const apiVersion = '2024-02-15-preview';

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    console.log('🚀 ~ POST ~ message:', message);
    // Azure OpenAI のAPIエンドポイント
    const url = `${endpoint}/openai/deployments/${deployment}/chat/completions?api-version=${apiVersion}`;

    const aoaiRes = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey!,
      },
      body: JSON.stringify({
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: message },
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!aoaiRes.ok) {
      const error = await aoaiRes.text();
      return NextResponse.json({ error }, { status: 500 });
    }

    const data = await aoaiRes.json();
    const reply =
      data.choices?.[0]?.message?.content ?? 'AI応答取得に失敗しました。';

    return NextResponse.json({ reply });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
