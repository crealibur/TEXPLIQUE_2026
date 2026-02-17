import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface TranslationResultProps {
  translatedText: string | null;
}

const TranslationResult: React.FC<TranslationResultProps> = ({ translatedText }) => {
  const [copied, setCopied] = useState(false);
  
  const copyToClipboard = () => {
    if (translatedText) {
      navigator.clipboard.writeText(translatedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  
  if (!translatedText) return null;
  
  return (
    <div className="mt-8 animate-fade-in">
      <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">Résultat de la traduction</h2>
      
      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <p className="whitespace-pre-wrap text-gray-800 dark:text-gray-200">
          {translatedText}
        </p>
      </div>
      
      <div className="mt-3 flex justify-center">
        <button
          onClick={copyToClipboard}
          className="flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 text-white rounded-lg transition-colors font-medium"
          aria-label="Copier le texte traduit"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 mr-2" />
              <span>Copié!</span>
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 mr-2" />
              <span>Copier</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default TranslationResult;