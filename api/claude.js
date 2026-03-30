// Uses Google Gemini API — free, no credit card needed
// Get your key at: https://aistudio.google.com/app/apikey
module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'GEMINI_API_KEY not set in Vercel environment variables.' });
  }

  const { messages = [], system, max_tokens } = req.body;

  const contents = messages.map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: typeof m.content === 'string' ? m.content : (m.content || []).map(c => c.text || '').join('') }],
  }));

  const geminiBody = {
    contents,
    generationConfig: { maxOutputTokens: max_tokens || 1000, temperature: 0.7 },
  };
  if (system) geminiBody.systemInstruction = { parts: [{ text: system }] };

  try {
    const model = 'gemini-1.5-flash';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(geminiBody),
    });

    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({ error: data.error?.message || 'Gemini error' });
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    return res.status(200).json({ content: [{ type: 'text', text }] });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
