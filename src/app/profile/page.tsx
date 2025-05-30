"use client";
import '../animations.css';

import { useEffect, useState } from "react";

import Navbar from '../navbar';

interface User {
  id: number;
  name: string;
  email: string;
}

export default function Home() {
  const [users, setUser] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/users');
        const data = await response.json();
        console.log(data);
        setUser(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Navbar/>
      <ul>
        {users.map((user) => (
          <div>
            <li key={user.id}>Ime:{user.name}</li>
            <li>Mail:{user.email}</li>
          </div>
        ))}
      </ul>
    </div>
  );
}
