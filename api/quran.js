export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { path, ...queryParams } = req.query;
  const queryString = new URLSearchParams(queryParams).toString();
  const url = `https://api.quran.com/api/v4/${path}${queryString ? '?' + queryString : ''}`;

  try {
    const response = await fetch(url, {
      headers: { Accept: 'application/json' },
    });
    const data = await response.json();
    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
    return res.status(response.status).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
