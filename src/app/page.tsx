"use client";
import { useEffect, useState } from "react";

interface Beer {
  id: number;
  name: string;
  // Add more fields if needed
}

export default function Home() {
  const [beer, setBeer] = useState<Beer[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/test');
        const data = await response.json();
        console.log(data);
        setBeer(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <ul>
        {beer.map((a) => (
          <li key={a.id}>{a.name}</li>
        ))}
      </ul>
    </div>
  );
}
