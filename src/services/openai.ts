import { TranslationDirection } from '../types';

const API_URL = 'https://api.openai.com/v1/chat/completions';

export async function translateText(text: string, direction: TranslationDirection): Promise<string> {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  
  if (!apiKey) {
    throw new Error("API key not found. Please set VITE_OPENAI_API_KEY in your .env file.");
  }
  
  const prompt = getPrompt(text, direction);
  
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: getSystemPrompt(direction)
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API Error: ${errorData.error?.message || response.statusText}`);
    }
    
    const data = await response.json();
    return data.choices[0].message.content.trim();
    
  } catch (error) {
    console.error('Translation error:', error);
    if (error instanceof Error) {
      throw new Error(`Failed to translate: ${error.message}`);
    }
    throw new Error('Failed to translate: Unknown error');
  }
}

function getSystemPrompt(direction: TranslationDirection): string {
  if (direction === 'wooden-to-clear') {
    return `Tu es un traducteur expert en langage clair. Ton rôle est de décoder les phrases rédigées en langue de bois politique, administrative ou managériale, pour révéler ce qu'elles signifient réellement, sans détours.
Ta reformulation doit :
- Être directe, concise et compréhensible par tout le monde
- Mettre en lumière le message caché ou implicite
- Remplacer les euphémismes par leur sens réel
- Adopter un ton légèrement incisif mais sans caricature

Voici la phrase à traduire :
"{text}"

Réponds uniquement avec la reformulation directe, sans aucune explication ni introduction.`;
  } else {
    return `Tu es un expert en communication politique et bureaucratique. Tu transformes des textes simples, directs et clairs en "langue de bois" - un langage volontairement vague, abstrait, pompeux et bureaucratique. 
    Tu dois conserver le sens général du message mais le rendre plus complexe, plus verbeux, et utiliser des formules typiques de la communication officielle ou politique.`;
  }
}

function getPrompt(text: string, direction: TranslationDirection): string {
  if (direction === 'wooden-to-clear') {
    return `Voici un texte en langue de bois. Traduis-le en langage clair, direct et précis : "${text}"`;
  } else {
    return `Voici un texte simple et direct. Traduis-le en langue de bois bureaucratique et politique : "${text}"`;
  }
}