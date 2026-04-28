import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer style={{ padding: '16px 0', borderTop: '1px solid #e5e7eb', marginTop: '32px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 16px', textAlign: 'center', fontSize: '14px', color: '#6b7280' }}>
        <p style={{ marginBottom: '8px' }}>
          {"Utilise l'API OpenAI pour traduire entre la langue de bois et le langage clair. — "}
          <a href="/cgu.html" style={{ color: '#2563eb', textDecoration: 'underline' }}>
            {"CGU & code source"}
          </a>
        </p>
        <p>
          {"Une application "}
          <a href="https://www.pointsdereflexion.fr" target="_blank" rel="noopener noreferrer" style={{ color: '#c0392b', fontWeight: '600' }}>
            Points de réflexion
          </a>
          {" — "}
          <a href="https://fr.tipeee.com/points-de-reflexion" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>
            {"Soutenir sur Tipeee"}
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
