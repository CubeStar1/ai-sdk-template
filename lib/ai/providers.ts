import {
    customProvider,
  } from 'ai';
  import { createOpenAI } from '@ai-sdk/openai';
  import { createGoogleGenerativeAI } from '@ai-sdk/google';

  const openai = createOpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  });

  const google = createGoogleGenerativeAI({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
  });
  
  export const models = [
  { value: 'gpt-4o-mini', label: 'GPT-4o Mini' },
  { value: 'gpt-4.1-mini', label: 'GPT-4.1 Mini' },
  { value: 'gpt-4.1', label: 'GPT-4.1' },
  { value: 'gemini-2.5-flash-preview-04-17', label: 'Gemini 2.5 Flash' },
  { value: 'gemini-2.0-flash', label: 'Gemini 2.0 Flash' },
];

export const myProvider = customProvider({
  languageModels: {
    'gpt-4o-mini': openai('gpt-4o-mini'),
    'gpt-4.1-mini': openai('gpt-4.1-mini'),
    'gpt-4.1': openai('gpt-4.1'),
    'gemini-2.5-flash-preview-04-17': google('gemini-2.5-flash-preview-04-17'),
    'gemini-2.0-flash': google('gemini-2.0-flash'),
  },
  fallbackProvider: openai,
});