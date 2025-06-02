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

    return (
        <div className="flex flex-col items-center text-white px-4">
            <form
                onSubmit={handlePrijava}
                className="max-w-md mt-20 p-10 bg-[#2a263d] rounded-3xl flex flex-col gap-6">
                <h1 className='text-center text-3xl font-semibold'>Prijavi se</h1>
                <input
                    type="email"
                    name="Email"
                    value={formPrijava.Email}
                    onChange={handleChangePrijava}
                    placeholder="example@gmail.com"
                    className="w-full px-4 py-3 rounded-lg bg-[#3a3652] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                />
                <input
                    type="password"
                    name="Password"
                    value={formPrijava.Password}
                    onChange={handleChangePrijava}
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 rounded-lg bg-[#3a3652] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                />
                <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white font-semibold rounded-lg transition-all"
                >
                    Prijavi se
                </button>
            </form>
            {message && <p className="text-white mt-4">{message}</p>}
        </div>
    )
}
export default Prijava;