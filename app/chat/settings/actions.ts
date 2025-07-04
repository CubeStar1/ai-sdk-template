'use server';
import { z } from 'zod';
import { createSupabaseServer } from '@/lib/supabase/server';
import { AgentConfig } from '@/app/chat/config/agent-config';

const schema = z.object({
  model: z.string(),
  system_prompt: z.string(),
  enabled_tools: z.array(z.string())
});

export async function saveAgentConfig(raw: AgentConfig) {
  const input = schema.parse(raw);

  const supabase = await createSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('unauthenticated');

  const { error } = await supabase.from('agent_config')
    .upsert({ user_id: user.id,
         system_prompt: input.system_prompt,
         enabled_tools: input.enabled_tools,
         model: input.model,
         updated_at: new Date() });

  if (error) {
    console.error('Error saving agent config:', error);
    throw new Error('Could not save agent config');
  }
}