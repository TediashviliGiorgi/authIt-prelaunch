import { Handler } from '@netlify/functions';
import { query } from './db';

export const handler: Handler = async (event) => {
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

    // 1. IP-ის ამოღება (ეს უკვე მუშაობს, როგორც ლოგებში ვნახეთ)
    const ip = h['x-nf-client-connection-ip'] || h['client-ip'] || h['x-forwarded-for']?.split(',')[0].trim() || '127.0.0.1';

    console.log(`[DEBUG] Detected IP: ${ip}`);

    let country = 'Unknown';
    let city = 'Unknown';

    // 2. Netlify-ს მშობლიური ჰედერების შემოწმება (ყველაზე სწრაფი)
    if (h['x-nf-country-name']) country = h['x-nf-country-name'];
    if (h['x-nf-city-name']) city = h['x-nf-city-name'];

    // 3. თუ Netlify-მ არ მოგვცა ინფო, ვცდილობთ გარე API-ებს
    if ((country === 'Unknown' || city === 'Unknown') && ip !== '127.0.0.1' && ip.length > 7) {
      
      // მცდელობა 1: ipwho.is (ძალიან ლიბერალური უფასო API)
      try {
        console.log('[DEBUG] Trying Primary GeoAPI (ipwho.is)...');
        const req1 = await fetch(`http://ipwho.is/${ip}`);
        const data1 = await req1.json();
        
        if (data1.success) {
          country = data1.country;
          city = data1.city;
          console.log('[DEBUG] Success with ipwho.is');
        } else {
          throw new Error('ipwho.is failed');
        }
      } catch (e) {
        console.error('[DEBUG] Primary GeoAPI failed, switching to backup...');
        
        // მცდელობა 2: ipapi.co (Backup, HTTPS)
        try {
          const req2 = await fetch(`https://ipapi.co/${ip}/json/`);
          if (req2.ok) {
            const data2 = await req2.json();
            if (data2.country_name) {
              country = data2.country_name;
              city = data2.city;
              console.log('[DEBUG] Success with ipapi.co');
            }
          }
        } catch (err2) {
          console.error('[DEBUG] All Geo lookups exhausted.');
        }
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
      body: JSON.stringify({ status: 'tracked', location: `${city}, ${country}` }) 
    };

  } catch (error) {
    console.error('Tracking Handler Error:', error);
    return { statusCode: 500, headers, body: 'Internal Error' };
  }
};