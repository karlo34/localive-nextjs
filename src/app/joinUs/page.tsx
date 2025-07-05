'use client';

import { useState } from 'react';
import Navbar from '../components/navbar';

const JoinUs = () => {
    const [formData, setFormData] = useState({
        Username: '',
        Email: '',
        Password: '',
        checkPassword: ''
    });

    const [formPrijava, setFormPrijava] = useState({
        email: '',
        password: ''
    })

    const [message, setMessage] = useState('');
    const [prijava, setPrijava] = useState(true);

    const handleChangeRegistracija = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleChangePrijava = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormPrijava({ ...formPrijava, [e.target.name]: e.target.value });
    };

    const handleRegistracija = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.Password !== formData.checkPassword) {
            alert("Šifre nisu iste!");
            return;
        }

        try {
            const response = await fetch('/api/userExport', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Uspješno ste se prijavili!');
                setFormData({ Username: '', Email: '', Password: '', checkPassword: '' });
            } else {
                setMessage(data.error || 'Greška pri prijavi.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setMessage('Nešto je pošlo po zlu.');
        }
    };
    const handlePrijava = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/userExists', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formPrijava),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Uspješno ste se prijavili!');
                setFormPrijava({ email: '', password: ''});
            } else {
                setMessage(data.error || 'Greška pri prijavi.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setMessage('Nešto je pošlo po zlu.');
        }
    };

    const changeForm = () => {
        setPrijava(prev => !prev);
    };

    return (
        <div>
            <Navbar />

            {prijava ? (
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
                    <button onClick={changeForm} className="mt-4 underline">
                        Promijeni formu
                    </button>
                </div>
            ) : (
                <div><form onSubmit={handlePrijava}>
                    <div>
                        <label>Email:</label>
                        <input
                            className="bg-white text-black"
                            type="email"
                            name="email"
                            value={formPrijava.email}
                            onChange={handleChangePrijava}
                            required
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            className="bg-white text-black"
                            type="password"
                            name="password"
                            value={formPrijava.password}
                            onChange={handleChangePrijava}
                            required
                        />
                    </div>
                    <button type="submit" className="bg-green-600 text-white mt-3 ml-10">
                        Pošalji
                    </button>
                </form>
                    {message && <p>{message}</p>}
                    <button onClick={changeForm} className="mt-4 underline">
                        Promijeni formu
                    </button>
                </div>
            )}
        </div>
    );
};

export default JoinUs;
