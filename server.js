import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 52996;

app.use(cors());

app.get('/api/allsvenskan/standings', async (req, res) => {
  try {
    const targetUrl = 'https://allsvenskan.se/data-endpoint/statistics/standings/2025/total';
    const response = await fetch(targetUrl);

    if (!response.ok) {
      return res.status(response.status).send('Failed to fetch data');
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Proxy running at http://localhost:${PORT}/api/allsvenskan/standings`);
});
