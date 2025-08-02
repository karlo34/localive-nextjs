"use client";
import { useState } from 'react';
import { FaEnvelope } from 'react-icons/fa';

import SuccessMessage from '../components/successMessage';
import { time } from 'console';

export default function JoinMailForm() {
    const [form, setForm] = useState({
        name: '', email: '', company: '', message: ''
    });
    const [sent, setSent] = useState<true | null>(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setForm((f) => ({ ...f, [name]: value }));
    };

    const autoGrowTextArea = (e: React.FormEvent<HTMLTextAreaElement>) => {
        const ta = e.currentTarget;
        ta.style.height = 'auto';
        ta.style.height = `${ta.scrollHeight}px`;
    };

    const mailtoHref = () => {
        const subject = encodeURIComponent(`Join request: ${form.company} — ${form.name}`);
        const body = encodeURIComponent(`
            Name: ${form.name}
            Email: ${form.email}
            Company: ${form.company}

            Message:
            ${form.message}
            `);
        return `mailto:you@yourdomain.com?subject=${subject}&body=${body}`;
    };

    function checkEmail() {
        setSent(true);
        setTimeout(() => {
            setSent(null);
        }, 5000); // Reset sent state after 5 seconds
    }

    return (
        <div className="min-h-screen flex items-start justify-center bg-gradient-to-r from-purple-600 to-purple-500 py-20">
            <form className="flex flex-col w-full max-w-md space-y-4 pt-5 px-4 pb-10 rounded-2xl bg-white shadow-lg text-black h-fit" >
                <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="pl-2 mt-2 border rounded-2xl h-10"
                    required
                />

                <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Your email"
                    type="email"
                    className="pl-2 border rounded-2xl h-10"
                    required
                />

                <input
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="Company"
                    className="pl-2 border rounded-2xl h-10"
                    required
                />

                <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Your message"
                    rows={1}
                    onInput={autoGrowTextArea}
                    className="pl-2 p-2 min-h-20 border rounded-2xl w-full resize-none h-auto overflow-hidden"
                    required
                />

                <a
                    href={mailtoHref()}
                    className="py-2 px-4 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white font-semibold rounded-lg transition-all inline-flex items-center justify-center"
                    onClick={checkEmail}
                >
                    <FaEnvelope className="h-5 w-5 mr-2" aria-hidden="true" />
                    Send via Email
                </a>
            </form>
            <SuccessMessage sent={sent}/>
        </div>
    );
}
