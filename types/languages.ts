export type LanguageCode = 'en-US' | 'hi-IN' | 'bn-IN' | 'gu-IN' | 'kn-IN' | 'ml-IN' | 'mr-IN';

export interface LanguageOption {
  label: string;
  value: LanguageCode;
}

export const languages: LanguageOption[] = [
  { label: 'English (US)', value: 'en-US' },
  { label: 'Hindi (India)', value: 'hi-IN' },
  { label: 'Bengali (India)', value: 'bn-IN' },
  { label: 'Gujarati (India)', value: 'gu-IN' },
  { label: 'Kannada (India)', value: 'kn-IN' },
  { label: 'Malayalam (India)', value: 'ml-IN' },
  { label: 'Marathi (India)', value: 'mr-IN' }
];
