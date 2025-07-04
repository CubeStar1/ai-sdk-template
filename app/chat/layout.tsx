import { createSupabaseServer } from "@/lib/supabase/server";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ConversationsProvider } from "./hooks/conversations-context";
import { AppSidebar } from "./components/sidebar/app-sidebar";
import { AgentProvider } from "./lib/state/agent-context";
import { defaultAgentConfig } from "./config/agent-config";
export default async function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data } = await supabase
  .from('agent_config')
  .select('*')
  .eq('user_id', user?.id)
  .single();

const initialConfig = data ?? defaultAgentConfig;
  return (
    <AgentProvider initialConfig={initialConfig}>
      <div className="flex h-screen">
      <ConversationsProvider userId={user?.id ?? ""}>
        <SidebarProvider defaultOpen={true}>
          <AppSidebar user={user} />
          <div className="flex-1 ">{children}</div>
        </SidebarProvider>
      </ConversationsProvider>
    </div>
    </AgentProvider>
  );
}
