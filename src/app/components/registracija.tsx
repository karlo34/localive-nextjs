"use client";
import { useState, useEffect } from 'react';
const Registracija = () => {
  const [formData, setFormData] = useState({
    Username: '',
    Email: '',
    Password: '',
    checkPassword: ''
  });
  const [message, setMessage] = useState('');
  const [hasCheckedCookie, setHasCheckedCookie] = useState(false);

  const handleChangeRegistracija = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegistracija = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.Password !== formData.checkPassword) {
      alert("Šifre nisu iste!");
      return;
    }

    try {
      const registerResponse = await fetch('/api/userExport', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const registerData = await registerResponse.json();

      if (!registerResponse.ok) {
        setMessage(registerData.error || 'Greška pri registraciji.');
        return;
      }

      setMessage('Uspješno ste se registrirali!');

      // Automatically log in user after successful registration
      try {
        const loginResponse = await fetch('/api/userExists', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Email: formData.Email,
            Password: formData.Password,
          }),
        });

        const loginData = await loginResponse.json();

        if (!loginResponse.ok) {
          setMessage(loginData.error || 'Greška pri prijavi.');
          return;
        }

        setMessage('Uspješno ste se prijavili!');
        setFormData({ Username: '', Email: '', Password: '', checkPassword: '' });

        // Optionally redirect user
        // window.location.href = '/dashboard'; // or use router.push('/dashboard');
      } catch (loginError) {
        console.error('Login error:', loginError);
        setMessage('Nešto je pošlo po zlu pri prijavi.');
      }
    } catch (registerError) {
      console.error('Registration error:', registerError);
      setMessage('Nešto je pošlo po zlu pri registraciji.');
    }
  };

  return (
    <div className="flex flex-col items-center text-white px-4">
      <form
        onSubmit={handleRegistracija}
        className="w-75 mt-20 p-10 bg-[#2a263d] rounded-3xl flex flex-col gap-6"
      >
        <h1 className='text-center text-3xl'>Pridruži nam se</h1>
        <div className="flex gap-4">
          <input
            type="text"
            name="Username"
            placeholder="Username"
            value={formData.Username}
            onChange={handleChangeRegistracija}

            className="flex-1 px-4 py-3 rounded-lg bg-[#3a3652] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <input
          type="email"
          name="Email"
          value={formData.Email}
          onChange={handleChangeRegistracija}
          placeholder="example@gmail.com"
          className="w-full px-4 py-3 rounded-lg bg-[#3a3652] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
        <input
          type="password"
          name="Password"
          value={formData.Password}
          onChange={handleChangeRegistracija}
          placeholder="Enter your password"
          className="w-full px-4 py-3 rounded-lg bg-[#3a3652] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
        <input
          type="password"
          name="checkPassword"
          value={formData.checkPassword}
          onChange={handleChangeRegistracija}
          placeholder="Confirm password"
          className="w-full px-4 py-3 rounded-lg bg-[#3a3652] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white font-semibold rounded-lg transition-all"
        >
          Napravi profil
        </button>
      </form>
      {message && <p className="text-white mt-4">{message}</p>}
    </div>

  )
}

export default Registracija;