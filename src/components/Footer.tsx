import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-4 border-t border-gray-200 dark:border-gray-700 mt-8">
      <div className="container mx-auto px-4 text-center text-sm text-gray-600 dark:text-gray-400">
      <p>
  Utilise l'API OpenAI pour traduire entre la langue de bois et le langage clair. —
  <a
    href="/cgu.html"
    className="text-blue-600 dark:text-blue-400 underline hover:opacity-80 ml-1"
  >
    CGU
  </a>
</p>

      </div>
    </footer>
  );
};

export default Footer;