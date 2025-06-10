"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Registracija = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    Username: '',
    Email: '',
    Password: '',
    checkPassword: ''
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [hasCheckedCookie, setHasCheckedCookie] = useState(false);

  const handleChangeRegistracija = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegistracija = async (e: React.FormEvent) => {
    e.preventDefault();

    // Start loading
    setLoading(true);
    setMessage('');

    if (formData.Password !== formData.checkPassword) {
      alert("Šifre nisu iste!");
      setLoading(false); // Stop loading here if early return
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

      // Auto-login after successful registration
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

      router.push("/profile");

    } catch (error) {
      console.error('Greška:', error);
      setMessage('Nešto je pošlo po zlu.');
    } finally {
      // Stop loading at the end, no matter what happened
      setLoading(false);
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
          {loading ? "Šalje se..." : "Registriraj se"}
        </button>
      </form>
      {message && <p className="text-white mt-4">{message}</p>}
    </div>

  )
}

export default Registracija;