// Uses Google Gemini API — genuinely free, no credit card needed
// Get your free key at: https://aistudio.google.com/app/apikey
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      error: 'GEMINI_API_KEY not set. Add it in Vercel → Settings → Environment Variables. Get a free key at https://aistudio.google.com/app/apikey'
    });
  }

  // Translate Anthropic message format → Gemini format
  const { messages = [], system, max_tokens } = req.body;

  // Build Gemini contents array
  const contents = messages.map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: typeof m.content === 'string' ? m.content : m.content.map(c => c.text || '').join('') }],
  }));

  const geminiBody = {
    contents,
    generationConfig: {
      maxOutputTokens: max_tokens || 1000,
      temperature: 0.7,
    },
  };

  // Add system instruction if provided
  if (system) {
    geminiBody.systemInstruction = { parts: [{ text: system }] };
  }

  try {
    const model = 'gemini-2.0-flash'; // free tier model
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(geminiBody),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.error?.message || 'Gemini API error' });
    }

    // Translate Gemini response → Anthropic response shape (so App.jsx needs no changes)
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    return res.status(200).json({
      content: [{ type: 'text', text }],
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

