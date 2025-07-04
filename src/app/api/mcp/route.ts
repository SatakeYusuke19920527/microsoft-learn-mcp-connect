/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAzure } from '@ai-sdk/azure';
import {
  experimental_createMCPClient as createMCPClient,
  streamText,
} from 'ai';
import { NextRequest } from 'next/server';

// Edge で動かす場合は 'edge'
export const runtime = 'nodejs';

// ─ Azure OpenAI 設定 ─
const azure = createAzure({
  resourceName: process.env.AZURE_RESOURCE_NAME!,
  apiKey: process.env.AZURE_API_KEY!,
  apiVersion: '2025-02-01-preview',
});

export async function POST(req: NextRequest) {
  // フロントから { messages:[{role,content}…] } を受信
  const { message } = (await req.json()) as {
    message: { role: 'system' | 'user' | 'assistant'; content: string }[];
  };
  console.log('🚀 ~ const{message}= ~ message:', message);
  console.log('🚀 ~ azure:', azure);

  // ─ MCP クライアント起動 ─
  const mcpClient = await createMCPClient({
    transport: {
      type: 'sse',
      url: 'http://func-api-mggmfpsii2nwy.azurewebsites.net/runtime/webhooks/mcp/sse',
      // headers: {
      //   'x-functions-key': process.env.AZURE_FUNCTION_KEY!,
      // },
    },
  });
  console.log('🚀 ~ POST ~ mcpClient:', mcpClient);

  try {
    const tools = await mcpClient.tools();
    console.log('🚀 ~ POST ~ tools:', tools);

    const result = await streamText({
      model: azure('gpt-4.1'),
      messages: message,
      tools,
      onFinish: async () => await mcpClient.close(),
    });

    // 従来 API のストリーム返却
    return result.toDataStreamResponse();
  } catch (err) {
    console.error('[MCP route] error:', err);
    return new Response(JSON.stringify({ error: 'Failed to generate text' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  } finally {
    await mcpClient.close();
  }
}
