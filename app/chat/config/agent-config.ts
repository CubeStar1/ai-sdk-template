export type AgentConfig = {
  /** Model ID understood by `myProvider.languageModel` */
  model: string;
  /** System prompt used for the conversation. Empty string = use default helper */
  system_prompt: string;
  /** List of enabled tool keys. See `tool-registry.ts` */
  enabled_tools: string[];
};

import { models } from "../lib/ai/providers/providers";

export const defaultAgentConfig: AgentConfig = {
  model: models[0].value,
  system_prompt: '',
  enabled_tools: ['querySupabase', 'tavilySearch', 'generateChart', 'ragRetrieval', 'generateImage'],
};
