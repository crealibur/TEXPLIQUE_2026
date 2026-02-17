import React, { useState } from 'react';
import { TranslationDirection } from '../types';

interface TranslationFormProps {
  onTranslate: (text: string, direction: TranslationDirection) => void;
  isLoading: boolean;
}

const MAX_CHARS = 500;

const TranslationForm: React.FC<TranslationFormProps> = ({ onTranslate, isLoading }) => {
  const [text, setText] = useState('');
  const [direction, setDirection] = useState<TranslationDirection>('wooden-to-clear');
  
  const charCount = text.length;
  const isOverLimit = charCount > MAX_CHARS;
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && !isOverLimit && !isLoading) {
      onTranslate(text, direction);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="text-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Texte à traduire
        </label>
        <textarea
          id="text-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Entrez votre texte ici..."
          className={`w-full p-3 border rounded-lg resize-none transition-colors focus:ring-2 focus:outline-none dark:bg-gray-800 dark:text-white
            ${isOverLimit 
              ? 'border-red-500 focus:border-red-500 focus:ring-red-200 dark:focus:ring-red-800' 
              : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200 dark:border-gray-600 dark:focus:border-blue-400 dark:focus:ring-blue-800'}`}
          rows={6}
          disabled={isLoading}
        />
        <div className={`text-xs mt-1 flex justify-end ${isOverLimit ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'}`}>
          {charCount}/{MAX_CHARS} caractères
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Direction de traduction
        </label>
        <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          <button
            type="button"
            className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
              direction === 'wooden-to-clear'
                ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-800 dark:text-white'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
            }`}
            onClick={() => setDirection('wooden-to-clear')}
            disabled={isLoading}
          >
            Langue de bois ou jargon → Langage clair
          </button>
          <button
            type="button"
            className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
              direction === 'clear-to-wooden'
                ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-800 dark:text-white'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
            }`}
            onClick={() => setDirection('clear-to-wooden')}
            disabled={isLoading}
          >
            Langage clair → Langue de bois
          </button>
        </div>
      </div>
      
      <button
        type="submit"
        disabled={!text.trim() || isOverLimit || isLoading}
        className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-colors
          ${!text.trim() || isOverLimit || isLoading
            ? 'bg-blue-300 dark:bg-blue-800 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500'
          }`}
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white\" xmlns="http://www.w3.org/2000/svg\" fill="none\" viewBox="0 0 24 24">
              <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Traduction en cours...
          </span>
        ) : (
          'Traduire'
        )}
      </button>
    </form>
  );
};

export default TranslationForm;