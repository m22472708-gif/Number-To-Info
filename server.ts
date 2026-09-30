import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Multi-layer Telecom & Truecaller Lookup API Proxy
app.get('/api/lookup', async (req, res) => {
  const number = (req.query.number as string || '').trim().replace(/[^0-9]/g, '');
  if (!number) {
    return res.status(400).json({ success: false, message: 'Invalid phone number provided.' });
  }

  // Format clean BD number
  const cleanNumber = number.startsWith('880') ? number.slice(2) : number.startsWith('01') ? number : `0${number}`;

  // Layer 1: Primary Live Engine (lookupnow.top with token generation)
  try {
    const requestId = crypto.randomUUID();
    const tokenResp = await fetch('https://lookupnow.top/api/generate-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Origin': 'https://lookupnow.top',
        'Referer': 'https://lookupnow.top/',
        'Accept': 'application/json, text/plain, */*',
      },
      body: JSON.stringify({ requestId }),
    });

    if (tokenResp.ok) {
      const tokenData = await tokenResp.json();
      if (tokenData?.success && tokenData?.token) {
        const lookupUrl = `https://lookupnow.top/api/lookup?number=${encodeURIComponent(cleanNumber)}&token=${encodeURIComponent(tokenData.token)}`;
        const lookupResp = await fetch(lookupUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Origin': 'https://lookupnow.top',
            'Referer': 'https://lookupnow.top/',
            'Accept': 'application/json, text/plain, */*',
          },
        });

        if (lookupResp.ok) {
          const resultJson = await lookupResp.json();
          if (resultJson?.success && resultJson?.name) {
            return res.json({
              success: true,
              layer: 'primary_live_engine',
              data: resultJson,
            });
          }
        }
      }
    }
  } catch (err) {
    console.error('Layer 1 lookup error:', err);
  }

  // Layer 2: Direct API Key Gateway (api.lookupnow.top query.php)
  try {
    const apiKey = 'pk_live_4517c83368661400fe509518b5cf0bf071de82b0';
    const fallbackUrl = `https://api.lookupnow.top/api/v1/query.php?key=${apiKey}&number=${encodeURIComponent(cleanNumber)}`;
    const fallbackResp = await fetch(fallbackUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json',
      },
    });

    if (fallbackResp.ok) {
      const fallbackJson = await fallbackResp.json();
      if (fallbackJson?.status === 'success' && fallbackJson?.data) {
        return res.json({
          success: true,
          layer: 'direct_api_key_gateway',
          data: fallbackJson.data,
          meta: fallbackJson.meta,
        });
      }
    }
  } catch (err) {
    console.error('Layer 2 lookup error:', err);
  }

  return res.json({
    success: false,
    message: 'No record found or rate limit reached on remote gateways.',
  });
});

// Vite Middleware for Dev, Static serving for Production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
