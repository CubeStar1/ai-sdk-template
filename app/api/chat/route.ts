import { streamText, CoreMessage } from 'ai';
import { getSystemPrompt } from '@/lib/prompts/system-prompt';
import { querySupabaseTool } from '@/lib/tools/query-supabase';
import { generateChart } from '@/lib/tools/generate-chart';
import { tavilySearchTool } from '@/lib/tools/tavily-search';
import { ragRetrievalTool } from '@/lib/tools/rag-retrieval';
import { generateImage } from '@/lib/tools/generate-image';
import { createOpenAI } from '@ai-sdk/openai';
import { myProvider } from '@/lib/ai/providers';
import { getUser } from '@/hooks/get-user';

const openai = createOpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const user = await getUser();

    if (!user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { messages, data, selectedModel }: { messages: CoreMessage[], data: any, selectedModel: string } = await req.json();
    const systemPrompt = await getSystemPrompt(user.id);

    const result = streamText({
      model: myProvider.languageModel(selectedModel as any),
      system: systemPrompt,
      messages,
      tools: {
        querySupabase: querySupabaseTool,
        generateChart: generateChart,
        tavilySearch: tavilySearchTool,
        ragRetrieval: ragRetrievalTool,
        generateImage: generateImage,
      },
      maxSteps: 10, 
      onError: (error) => {
        console.error('Error:', error);
      },
    });

    // Stream the response back to the client so `useChat` can consume it
    return result.toDataStreamResponse();
  } catch (error: any) {
    console.error('[API] Error:', error);
    return new Response(JSON.stringify({ error: error.message || 'An unexpected error occurred.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
