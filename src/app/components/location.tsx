import { useEffect, useState } from 'react';

const Location = () => {
  const [country, setCountry] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        // Make sure the request is hitting the correct API route
        const response = await fetch('/api/getUserCountry');
        
        // Check if the response is successful
        if (!response.ok) {
          throw new Error('Failed to fetch country data');
        }

        // Parse the response data
        const data = await response.json();

        // Update the state with the country data
        setCountry(data.country);
      } catch (err) {
        console.error('Failed to fetch country data', err);
        setError('Unable to fetch country data');
      }
    };

    fetchCountry();
  }, []);

  return (
    <div>
      <h1>Welcome to my website</h1>
      {error ? (
        <p>{error}</p>
      ) : country ? (
        <p>You're visiting from {country}.</p>
      ) : (
        <p>Loading country information...</p>
      )}
    </div>
  );
};

export default Location;
