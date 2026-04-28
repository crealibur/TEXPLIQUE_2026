import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-4 border-t border-gray-200 dark:border-gray-700 mt-8">
      <div className="container mx-auto px-4 text-center text-sm text-gray-600 dark:text-gray-400 space-y-2">
        <p>
          {"Utilise l'API OpenAI pour traduire entre la langue de bois et le langage clair. — "}
          <a href="/cgu.html" className="text-blue-600 dark:text-blue-400 underline hover:opacity-80">
            {"CGU & code source"}
          </a>
        </p>
        <p>
          {"Une application "}
          <a href="https://www.pointsdereflexion.fr" target="_blank" rel="noopener noreferrer" className="font-semibold hover:opacity-80" style={{ color: '#c0392b' }}>
            Points de réflexion
          </a>
          {" — "}
          <a href="https://fr.tipeee.com/points-de-reflexion" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline hover:opacity-80">
            {"Soutenir sur Tipeee"}
          </a>
        </p>
      </div>
    </footer>
  );
};
//V2
export default Footer; 
