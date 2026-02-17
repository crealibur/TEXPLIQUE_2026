export type TranslationDirection = 'wooden-to-clear' | 'clear-to-wooden';

export interface TranslationRequest {
  text: string;
  direction: TranslationDirection;
}

export interface TranslationResponse {
  translatedText: string;
}