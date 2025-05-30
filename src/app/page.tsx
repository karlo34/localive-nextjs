"use client";
import './animations.css';

import { useEffect, useState } from "react";

import Navbar from './navbar';

interface User {
  id: number;
  name: string;
}

export default function Home() {
  const [users, setUser] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/test');
        const data = await response.json();
        
        // Log data and its type for debugging
        console.log('Fetched data:', data);
        console.log('Type of fetched data:', typeof data);

        // Ensure the data is an array
        if (Array.isArray(data)) {
          setUser(data);
        } else {
          console.error('Data is not an array', data);
          // Optionally, check if it is a nested array within an object
          if (data.users && Array.isArray(data.users)) {
            setUser(data.users); // If users are inside the "users" property
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
