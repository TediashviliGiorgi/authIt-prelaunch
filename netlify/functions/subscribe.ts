import { Handler } from '@netlify/functions';
import { query } from './db';

export const handler: Handler = async (event) => {
  // CORS ჰედერები (რომ ლოკალურადაც იმუშაოს და პროდაქშენზეც)
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: 'Method Not Allowed' };
  }

  try {
    const { email, name, phone } = JSON.parse(event.body || '{}');

    if (!email || !email.includes('@')) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid email' }) };
    }

    // მონაცემების ჩაწერა ბაზაში
    await query(
      `INSERT INTO leads (email, name, phone) VALUES ($1, $2, $3) 
       ON CONFLICT (email) DO UPDATE SET name = $2, phone = $3`,
      [email, name || null, phone || null]
    );

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'Success' }),
    };
  } catch (error) {
    console.error('Database error:', error);
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Internal Server Error' }) };
  }
};