
export enum Category {
  VOWELS = 'Vowels',
  CONSONANTS = 'Consonants',
  SIGNS = 'Signs',
}

export type Language = 'en' | 'zh';

export interface ExampleWord {
  word: string;
  translation: string;
  translationZh: string;
  transcription: string;
}

export interface Pronunciation {
  ipa: string;
  audioPrompt: string; // The specific instruction for TTS (e.g. "Say the Russian sound for stressed O")
  label?: string;      // Key for translations like "Standard", "Hard", "Soft"
}

export interface RussianLetter {
  id: string;
  uppercase: string;
  lowercase: string;
  name: string;
  nameIpa: string;
  pronunciations: Pronunciation[];
  category: Category;
  description: string;
  descriptionZh: string;
  examples: ExampleWord[];
}

export interface PhonicsRule {
  id: string;
  title: string;
  titleZh: string;
  category: string;
  description: string;
  descriptionZh: string;
  examples: ExampleWord[];
}

export type ViewState = 'home' | 'alphabet' | 'rules' | 'letter-detail' | 'rule-detail' | 'reader' | 'reader-output';
