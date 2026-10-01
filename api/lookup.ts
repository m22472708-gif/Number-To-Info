import type { IncomingMessage, ServerResponse } from 'http';
import crypto from 'crypto';

interface VercelReq extends IncomingMessage {
  query: Record<string, string | string[]>;
  body?: any;
}

interface VercelRes extends ServerResponse {
  status: (code: number) => VercelRes;
  json: (data: any) => void;
  setHeader: (name: string, value: string | number | readonly string[]) => this;
}

export default async function handler(req: any, res: any) {
  // Enable CORS for Vercel deployment
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Parse query parameter
  let number = '';
  if (req.query && req.query.number) {
    number = Array.isArray(req.query.number) ? req.query.number[0] : req.query.number;
  } else if (req.url) {
    const parsed = new URL(req.url, 'http://localhost');
    number = parsed.searchParams.get('number') || '';
  }

  const cleanNumber = number.trim().replace(/[^0-9]/g, '');
  if (!cleanNumber) {
    return res.status(400).json({ success: false, message: 'Invalid phone number provided.' });
  }

  const formattedNum = cleanNumber.startsWith('880')
    ? cleanNumber.slice(2)
    : cleanNumber.startsWith('01')
    ? cleanNumber
    : `0${cleanNumber}`;

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
      const tokenData: any = await tokenResp.json().catch(() => null);
      if (tokenData?.success && tokenData?.token) {
        const lookupUrl = `https://lookupnow.top/api/lookup?number=${encodeURIComponent(formattedNum)}&token=${encodeURIComponent(tokenData.token)}`;
        const lookupResp = await fetch(lookupUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Origin': 'https://lookupnow.top',
            'Referer': 'https://lookupnow.top/',
            'Accept': 'application/json, text/plain, */*',
          },
        });

        if (lookupResp.ok) {
          const resultJson: any = await lookupResp.json().catch(() => null);
          if (resultJson?.success && resultJson?.name) {
            return res.status(200).json({
              success: true,
              layer: 'primary_live_engine',
              data: resultJson,
            });
          }
        }
      }
    }
  } catch (err) {
    console.error('Vercel serverless layer 1 error:', err);
  }

  // Layer 2: Direct API Key Gateway
  try {
    const apiKey = 'pk_live_4517c83368661400fe509518b5cf0bf071de82b0';
    const fallbackUrl = `https://api.lookupnow.top/api/v1/query.php?key=${apiKey}&number=${encodeURIComponent(formattedNum)}`;
    const fallbackResp = await fetch(fallbackUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json',
      },
    });

    if (fallbackResp.ok) {
      const fallbackJson: any = await fallbackResp.json().catch(() => null);
      if (fallbackJson?.status === 'success' && fallbackJson?.data) {
        return res.status(200).json({
          success: true,
          layer: 'direct_api_key_gateway',
          data: fallbackJson.data,
          meta: fallbackJson.meta,
        });
      }
    }
  } catch (err) {
    console.error('Vercel serverless layer 2 error:', err);
  }

  return res.status(200).json({
    success: false,
    message: 'No record found or remote gateway rate limit reached.',
  });
}
