'use client';

import { useState, useEffect } from 'react';

const Prijava = () => {
    const [formPrijava, setFormPrijava] = useState({
        Email: '',
        Password: ''
    })

    const [message, setMessage] = useState('');
    const [prijava, setPrijava] = useState(true);
    const [hasCheckedCookie, setHasCheckedCookie] = useState(false);

    useEffect(() => {
        const cookies = document.cookie;
        const tokenExists = cookies.includes("logedIn");
        const hasReloaded = localStorage.getItem("hasReloaded");

        if (tokenExists && !hasReloaded) {
            localStorage.setItem("hasReloaded", "true");
            window.location.reload();
        }

        // Optional: clean up the flag later if needed
        return () => {
            localStorage.removeItem("hasReloaded");
        };
    }, []);
    const handleChangePrijava = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormPrijava({ ...formPrijava, [e.target.name]: e.target.value });
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
                setFormPrijava({ Email: '', Password: '' });
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
        setFormPrijava({ Email: '', Password: '' });
    };
    return (
        <div><form onSubmit={handlePrijava}>
            <div>
                <label>Email:</label>
                <input
                    className="bg-white text-black"
                    type="email"
                    name="Email"
                    value={formPrijava.Email}
                    onChange={handleChangePrijava}
                    required
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    className="bg-white text-black"
                    type="password"
                    name="Password"
                    value={formPrijava.Password}
                    onChange={handleChangePrijava}
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
export default Prijava;