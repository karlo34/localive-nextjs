import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Extract the user's IP address
      const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

      // The Bearer token from ipinfo.io
      const token = 'd29010be905e68';

      // Request the country data from ipinfo.io using Bearer token
      const response = await axios.get(`https://ipinfo.io/${ip}/json`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      // Send back the country info as a response
      res.status(200).json({ country: response.data.country });
    } catch (error) {
      console.error('Error fetching country data', error);
      res.status(500).json({ error: 'Failed to fetch country data' });
    }
  } else {
    // Handle the case for other HTTP methods (e.g., POST, PUT)
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
