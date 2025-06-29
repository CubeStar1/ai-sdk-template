import { LanguageCode } from '@/types/languages';

export interface Config {
  systemPrompt: string;
  voice: string;
  googleSearch: boolean;
  allowInterruptions: boolean;
  languageCode?: LanguageCode;
}