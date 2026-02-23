// netlify/functions/translate.ts
export const handler = async (event) => {
  // On récupère les données envoyées par votre application (App.tsx)
  const body = JSON.parse(event.body);
  
  // Utilisation de la clé API stockée dans les variables d'environnement de Netlify
  const apiKey = process.env.OPENAI_API_KEY; 

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "gpt-4o", // Utilisation du modèle gpt-4o comme demandé
        messages: body.messages, // On transmet les prompts visibles de App.tsx
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Erreur de communication avec OpenAI via la fonction" }),
    };
  }
};