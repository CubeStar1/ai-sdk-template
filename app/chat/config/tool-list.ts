export const toolKeys = [
  'querySupabase',
  'tavilySearch',
  'generateChart',
  'ragRetrieval',
  'generateImage',
] as const;

export type ToolKey = typeof toolKeys[number];
