import { streamText, CoreMessage , smoothStream} from 'ai';
import { getSystemPrompt } from '@/app/chat/lib/ai/prompts/system-prompt';
import { toolRegistry, ToolKey } from '@/app/chat/config/tool-registry';
import { AgentConfig, defaultAgentConfig } from '@/app/chat/config/agent-config';





import { myProvider } from '@/app/chat/lib/ai/providers/providers';
import { getUser } from '@/app/chat/hooks/get-user';


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

    const { messages, data, agentConfig }: { messages: CoreMessage[]; data: any; agentConfig?: AgentConfig } = await req.json();
    const cfg = agentConfig ?? defaultAgentConfig;
    const systemPrompt = cfg.system_prompt || (await getSystemPrompt(user));
    console.log(cfg);

    const tools: Record<string, any> = {};
    (cfg.enabled_tools as ToolKey[]).forEach((key) => {
      if (key in toolRegistry) {
        tools[key] = toolRegistry[key];
      }
    });

    const result = streamText({
      model: myProvider.languageModel(cfg.model as any),
      system: systemPrompt,
      messages,
      tools,
      maxSteps: 10, 
      onError: (error) => {
        console.error('Error:', error);
      },
      experimental_transform: smoothStream({
        chunking: 'word',
      }),
      toolCallStreaming: true,
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
