import SettingsClient from './SettingsClient';
import { createSupabaseServer } from '@/lib/supabase/server';
import { getSystemPrompt } from '../lib/ai/prompts/system-prompt';

// 100 % server component – pre-renders the dynamic prompt then
// hands control to the client component for interactivity.
export default async function SettingsPage() {
  const supabase = await createSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();

  const defaultPrompt = await getSystemPrompt(user as any);
  return <SettingsClient defaultPrompt={defaultPrompt} />;
}