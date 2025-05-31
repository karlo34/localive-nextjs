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
    <div>
        <h1>Pridruži nam se</h1>
        <form onSubmit={handleRegistracija}>
            <div>
                <label>Ime:</label>
                <input
                    className="bg-white text-black"
                    type="text"
                    name="Username"
                    value={formData.Username}
                    onChange={handleChangeRegistracija}
                    required
                />
            </div>
            <div>
                <label>Email:</label>
                <input
                    className="bg-white text-black"
                    type="email"
                    name="Email"
                    value={formData.Email}
                    onChange={handleChangeRegistracija}
                    required
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    className="bg-white text-black"
                    type="password"
                    name="Password"
                    value={formData.Password}
                    onChange={handleChangeRegistracija}
                    required
                />
            </div>
            <div>
                <label>Potvrdi šifru:</label>
                <input
                    className="bg-white text-black"
                    type="password"
                    name="checkPassword"
                    value={formData.checkPassword}
                    onChange={handleChangeRegistracija}
                    required
                />
            </div>
            <button type="submit" className="bg-green-600 text-white mt-3 ml-10">
                Pošalji
            </button>
        </form>
        {message && <p>{message}</p>}
    </div>
)
}

export default Registracija;