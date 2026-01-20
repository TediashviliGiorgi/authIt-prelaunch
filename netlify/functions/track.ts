import { Handler } from '@netlify/functions';
import { query } from './db';

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { page, duration } = JSON.parse(event.body || '{}');
    const headers = event.headers;

    // მონაცემების ამოღება ჰედერებიდან
    const ip = headers['x-nf-client-connection-ip'] || headers['client-ip'] || 'unknown';
    const country = headers['x-nf-country-name'] || 'unknown'; // Netlify GeoIP
    const city = headers['x-nf-city-name'] || 'unknown';       // Netlify GeoIP
    const userAgent = headers['user-agent'];

    await query(
      `INSERT INTO page_visits (ip_address, country, city, page_path, duration_seconds, user_agent) 
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [ip, country, city, page, duration, userAgent]
    );

    return { statusCode: 200, body: 'Tracked' };
  } catch (error) {
    console.error('Tracking error:', error);
    return { statusCode: 500, body: 'Error' };
  }
};