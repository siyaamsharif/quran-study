export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { path, ...queryParams } = req.query;

  if (!path) {
    return res.status(400).json({ error: 'Missing path parameter' });
  }

  // Build the quran.com URL — path becomes the endpoint, rest become query string
  const queryString = new URLSearchParams(queryParams).toString();
  const url = `https://api.quran.com/api/v4/${path}${queryString ? '?' + queryString : ''}`;

  console.log('quran.com proxy fetching:', url);

  try {
    const response = await fetch(url, {
      headers: { Accept: 'application/json' },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('quran.com error:', response.status, JSON.stringify(data));
      return res.status(response.status).json({
        error: `quran.com returned ${response.status}`,
        url,
        detail: data,
      });
    }

    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
    return res.status(200).json(data);
  } catch (err) {
    console.error('quran proxy fetch error:', err.message);
    return res.status(500).json({ error: err.message, url });
  }
}
