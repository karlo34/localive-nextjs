"use client";

import React, { useEffect, useState } from "react";
import { FaArrowDown } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";

const createEvent = () => {
    const [userWrapper, setUserWrapper] = useState<any>(null);
    const [formError, setFormError] = useState<string>(""); // For form validation error messages

    const handleRegistracija = (e: React.FormEvent) => {
        e.preventDefault();

        // Validate if at least one checkbox is checked
        const checkboxes = document.querySelectorAll<HTMLInputElement>("input[name='zanr']");
        const isChecked = Array.from(checkboxes).some((checkbox) => checkbox.checked);

        if (!isChecked) {
            setFormError("Molimo odaberite barem jedan žanr.");
            return;
        }

        setFormError(""); // Clear any previous error if validation passes
        // Handle your form submission logic here
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("/api/profile");
                const data = await res.json();
                console.log(data);
                setUserWrapper(data);
            } catch (err) {
                console.error(err);
                console.log("Greška pri dohvaćanju podataka");
            }
        };
        fetchData();
    }, []);

    return (
        <div className="w-full bg-gradient-to-r rounded-b-none from-purple-600 to-purple-500 min-h-[83.3vh] flex items-center justify-center">
            <form
                onSubmit={handleRegistracija}
                className="w-150 p-10 -mt-5 bg-[#2a263d] rounded-3xl flex flex-col flex-wrap gap-6"
            >
                <h1 className="text-center text-3xl">Prijavi događaj koji organizirate</h1>
                <div className="flex gap-4">
                    <input
                        disabled
                        type="text"
                        name={"organizacija"}
                        placeholder="Organizacija"
                        className="flex-1 px-4 py-3 rounded-lg bg-[#3a3652] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <input
                        type="text"
                        name="imeDogadaja"
                        placeholder="Ime događaja"
                        className="w-full px-4 py-3 rounded-lg bg-[#3a3652] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                    />
                </div>

                <div className="flex gap-4">
                    <input
                        type="text"
                        name="adresa"
                        placeholder="Adresa"
                        className="w-full px-4 py-3 rounded-lg bg-[#3a3652] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                    />
                    <select
                        id="grad"
                        name="grad"
                        className="pl-4 py-3 w-40 rounded-lg bg-[#3a3652] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none"
                        required
                    >
                        <option value="Dicmo">Dicmo</option>
                        <option value="Novalja">Novalja</option>
                        <option value="Split">Split</option>
                        <option value="Solin">Solin</option>
                        
                    </select>
                    <FaChevronDown className="relative self-center right-9 mt-1"/>
                </div>
                <div className="flex flex-wrap items-start justify-center sm:justify-between">
                    <div className="flex flex-col mt-3 sm:mt-0">
                        <label htmlFor="eventTime" className="text-white font-medium pb-2 text-center">
                            Odaberi datum i vrijeme
                        </label>
                        <input
                            type="datetime-local"
                            id="eventTime"
                            name="eventTime"
                            className="px-4 py-3 rounded-lg bg-[#3a3652] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            min={new Date().toISOString().slice(0, 16)}
                            required
                        />
                    </div>
                    <div className="mt-3 sm:mt-0 ml-2 sm:ml-0 grid grid-cols-2 gap-2">
                        <h1>Odaberi žanr:</h1>
                        <br />
                        <label className="flex items-center space-x-2">
                            <input type="checkbox" name="zanr" value="edukacija" />
                            <span>Edukacija</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input type="checkbox" name="zanr" value="knjige" />
                            <span>Knjige</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input type="checkbox" name="zanr" value="djeca" />
                            <span>Djeca</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input type="checkbox" name="zanr" value="volontiranje" />
                            <span>Volontiranje</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input type="checkbox" name="zanr" value="tehnologija" />
                            <span>IT i tehnologija</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input type="checkbox" name="zanr" value="koncert" />
                            <span>Koncert</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input type="checkbox" name="zanr" value="protest" />
                            <span>Protest</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input type="checkbox" name="zanr" value="druženje" />
                            <span>Druženje</span>
                        </label>
                        {/* repeat for each genre */}
                        <button
                            type="button"
                            className="w-30 h-8 mt-3 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-gree-600 text-white font-semibold rounded-lg transition-all ml-[50%]"
                            onClick={() => {
                                document
                                    .querySelectorAll<HTMLInputElement>("input[name=\"zanr\"]")
                                    .forEach((cb) => (cb.checked = true));
                            }}
                        >
                            Odaberi sve
                        </button>
                    </div>
                </div>

                {/* Show error message */}
                {formError && <p className="text-red-500 text-center mt-2">{formError}</p>}

                <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white font-semibold rounded-lg transition-all"
                >
                    Prijavi
                </button>
            </form>
        </div>
    );
};

export default createEvent;
