export default function handler(req, res) {
  console.log("Request method:", req.method); // Log the method

  if (req.method === 'POST') {
    // Clear cookies
    res.clearCookie('username', { path: '/' });
    res.clearCookie('email', { path: '/' });

    // Send success response
    res.status(200).json({ message: 'Logged out successfully' });
  } else {
    // Return Method Not Allowed if it's not a POST
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}