"use client";

import { useState } from 'react';
import Navbar from '../navbar';

const JoinUs = () => {
  const [formData, setFormData] = useState({
    Username: '',
    Email: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/exportUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Uspješno ste se prijavili!');
        setFormData({ Username: '', Email: '' });
      } else {
        setMessage(data.error || 'Greška pri prijavi.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setMessage('Nešto je pošlo po zlu.');
    }
  };

  return (
    <div>
        <Navbar/>
      <h1>Pridruži nam se</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Ime:</label>
          <input className='bg-white text-black'
            type="text"
            name="Username"
            value={formData.Username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input  className='bg-white text-black'
            type="email"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className='bg-green-600 text-white mt-3 ml-10'>Pošalji</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default JoinUs;