import { Handler } from '@netlify/functions';
import { query } from './db';

export const handler: Handler = async (event) => {
  // CORS Headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const { page, duration } = JSON.parse(event.body || '{}');
    const h = event.headers;

    // 1. IP-ის ამოღების ყველაზე აგრესიული მეთოდი Netlify-სთვის
    const ip = h['x-nf-client-connection-ip'] || h['client-ip'] || h['x-forwarded-for']?.split(',')[0].trim() || '127.0.0.1';

    console.log(`[DEBUG] Detected IP: ${ip}`); // ეს გამოჩნდება Netlify Logs-ში

    let country = 'Unknown';
    let city = 'Unknown';

    // 2. მეთოდი A: ვამოწმებთ Netlify-ს ჩაშენებულ ჰედერებს (ყველაზე სწრაფია)
    if (h['x-nf-country-name']) country = h['x-nf-country-name'];
    if (h['x-nf-city-name']) city = h['x-nf-city-name'];

    // 3. მეთოდი B: თუ Netlify-მ არ მოგვცა ინფო, ვეკითხებით გარე API-ს (HTTPS-ით!)
    // მხოლოდ მაშინ, თუ IP ვალიდურია და არა localhost
    if ((country === 'Unknown' || city === 'Unknown') && ip !== '127.0.0.1' && ip.length > 7) {
      try {
        console.log(`[DEBUG] Fetching location for IP via ipapi.co...`);
        
        // ვიყენებთ ipapi.co-ს (HTTPS მხარდაჭერით)
        const geoReq = await fetch(`https://ipapi.co/${ip}/json/`);
        
        if (geoReq.ok) {
          const geoData = await geoReq.json();
          // ipapi.co აბრუნებს 'Undefined' სტრინგს თუ ვერ იპოვა, ამიტომ ვამოწმებთ
          if (geoData.country_name) country = geoData.country_name;
          if (geoData.city) city = geoData.city;
        } else {
           console.error(`[DEBUG] GeoAPI Error: ${geoReq.statusText}`);
        }
      } catch (e) {
        console.error('[DEBUG] Geo Lookup Failed completely:', e);
      }
    }

    const userAgent = h['user-agent'] || 'unknown';

    // 4. ბაზაში ჩაწერა
    await query(
      `INSERT INTO page_visits (ip_address, country, city, page_path, duration_seconds, user_agent) 
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [ip, country, city, page, duration, userAgent]
    );

    return { 
      statusCode: 200, 
      headers,
      body: JSON.stringify({ status: 'tracked', location: `${city}, ${country}`, ip_debug: ip }) 
    };

  } catch (error) {
    console.error('Tracking Handler Error:', error);
    return { statusCode: 500, headers, body: 'Internal Error' };
  }
};