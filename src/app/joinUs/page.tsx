"use client";
import { useState } from 'react';

export default function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('../api/test', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert('Registracija uspješna!');
    } else {
      alert('Došlo je do greške prilikom registracije.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Ime" onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Lozinka" onChange={handleChange} required />
      <button type="submit">Registriraj se</button>
    </form>
  );
}