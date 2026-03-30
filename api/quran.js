module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { path, ...queryParams } = req.query;
  if (!path) return res.status(400).json({ error: 'Missing path parameter' });

  const queryString = new URLSearchParams(queryParams).toString();
  const url = `https://api.quran.com/api/v4/${path}${queryString ? '?' + queryString : ''}`;

  try {
    const response = await fetch(url, { headers: { Accept: 'application/json' } });
    const data = await response.json();
    if (!response.ok) return res.status(response.status).json({ error: `quran.com ${response.status}`, detail: data });
    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
