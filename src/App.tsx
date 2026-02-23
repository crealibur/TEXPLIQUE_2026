import { useState } from 'react'
import Footer from './components/Footer'

function App() {
  const [text, setText] = useState('')
  const [direction, setDirection] = useState('woodenToClear')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [domaine, setDomaine] = useState("");
  const maxChars = 1000;

  const handleTranslate = async () => {
    setLoading(true)
    setResult('')
    
let prompt = "";

if (direction === "woodenToClear") {
  prompt = `Tu es un traducteur expert en langage clair. Ton rôle est de décoder les phrases rédigées en langue de bois politique, administrative ou managériale, pour révéler ce qu’elles signifient réellement, sans détours.

Ta reformulation doit :
- Être directe, concise et compréhensible par tout le monde
- Mettre en lumière le message caché ou implicite
- Remplacer les euphémismes par leur sens réel
- Adopter un ton légèrement incisif mais sans caricature

Voici la phrase à traduire :

"${text}"`;
}
else if (direction === "clearToWooden") {
  prompt = `Tu es un expert en communication politique et tu es pressé. Transforme ce texte simple en une formulation technocratique, administrative et floue, en utilisant des tournures vagues, des expressions détournées et des mots abstraits :


"${text}"`;
}


  // REMPLACE l'URL OpenAI par l'URL de ta fonction Netlify
const response = await fetch('/.netlify/functions/translate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    // SUPPRIME la ligne Authorization ici, elle n'est plus nécessaire dans App.tsx
  },
  body: JSON.stringify({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: prompt },
      { role: 'user', content: text },
    ],
    temperature: 0.7,
  }),
});

    const data = await response.json()
    setResult(data.choices[0]?.message?.content ?? 'Erreur')
    setLoading(false)
  }

  return (
    <>
      <div className="header">
        <div className="titleBlock">
          <h1>
            TEXPLIQUE
            <img src="/PDR_NOIR_FAT_V2.png" alt="Point de réflexion" className="pdr" />
          </h1>
          <p className="subtitle">Traducteur de langue de bois et de jargon.</p>
        </div>
        <img src="/Perroquet.png" alt="Perroquet" className="perroquet" />
      </div>
      <div className="container">
      <label>Texte à traduire</label>
      <textarea
  rows={4}
  placeholder="Entrez votre texte ici..."
  value={text}
  onChange={(e) => {
    if (e.target.value.length <= maxChars) {
      setText(e.target.value);
    }
  }}
/>
<p>{text.length} / {maxChars} caractères</p>
      <label>Direction de traduction</label>
      <select value={direction} onChange={(e) => setDirection(e.target.value)}>
        <option value="woodenToClear">Langue de bois ou compliquée → Langage clair</option>
        <option value="clearToWooden">Langage clair → Langue de bois</option>
        
      </select>
     

    <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '10px' }}>
  <button
  onClick={handleTranslate}
  disabled={
    loading || 
     text.length === 0 ||
    text.length > maxChars ||
    (direction === 'clearToSpecialized' && domaine.trim() === '')
  }
  className="translate"
>
  {loading ? 'Traduction en cours...' : 'Traduire'}
</button>

  <button
    onClick={() => {
      setText("");
      setResult("");
    }}
     className="clear"
  >
    Effacer
  </button>
</div>



      {result && (
        <div>
          <div className="result">{result}</div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
            <button
              onClick={() => {
                try {
                  if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(result).then(() => {
                      setTimeout(() => alert('Texte copié !'), 100);
                    }).catch(() => {
                      fallbackCopyTextToClipboard(result);
                    });
                  } else {
                    fallbackCopyTextToClipboard(result);
                  }
                } catch (err) {
                  fallbackCopyTextToClipboard(result);
                }
              }}
              style={{
                padding: '8px 16px',
                backgroundColor: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              📋 Copier
            </button>
          </div>
        </div>
      )}
        </div>  {/* fermeture du container */}
      <Footer />
  </>
)


  function fallbackCopyTextToClipboard(text: string) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      setTimeout(() => alert('Texte copié !'), 100);
    } catch (err) {
      alert('Erreur lors de la copie');
    }
    document.body.removeChild(textArea);
  }
}

export default App
