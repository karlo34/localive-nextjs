"use client";

import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'; // or 'next/router' for older versions
import { FaUser, FaEnvelope, FaPhone, FaHome, FaPencilAlt, FaStopwatch, FaBuilding, FaPager, FaVenus, FaIdCard, FaHospital, FaRulerVertical, FaWeight, FaCheckCircle, FaClock, FaBan, FaSearch, FaPlus, FaCar, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { FaCakeCandles } from 'react-icons/fa6';
import Navbar from '../navbar';
import "@/app/css/profile.css";


const Profile = () => {
    const router = useRouter();
    const [logedIn, setLogedIn] = useState(false);
    const [showSection, setShowSection] = useState("podaci")

    useEffect(() => {
        console.log(showSection);
    }, [showSection])


    useEffect(() => {
        const cookies = document.cookie;
        const tokenExists = cookies.includes("logedIn");

        if (!tokenExists) {
            router.push('/profile/registracija');
        } else {
            setLogedIn(true);
        }
    }, [logedIn]);
    return (
        <div>
            {
                logedIn && (
                    <div className="min-h-screen bg-[#0d0b1e] text-white pt-0">
                        <Navbar />
                        <aside className="w-full lg:min-w-64 bg-white text-black p-4 space-y-4 pb-0">
                            <nav className="flex flex-row justify-center align-bottom gap-3">
                                <button
                                    onClick={() => setShowSection("podaci")}
                                    className={`w-30 h-10  bg-gradient-to-r rounded-2xl rounded-b-none hover:from-purple-700 hover:to-purple-600 hover:text-white ${showSection === "podaci" ? "active-button from-purple-600 to-purple-500" : ""}`}>
                                    Moji podaci
                                </button>
                                <button
                                    onClick={() => setShowSection("organiziraj")}
                                    className={`px-2 bg-gradient-to-r rounded-2xl rounded-b-none hover:from-purple-700 hover:to-purple-600 hover:text-white ${showSection === "organiziraj" ? "active-button h-10 from-purple-600 to-purple-500" : ""}`}>
                                    Prijavljeni događaji
                                </button>
                            </nav>
                        </aside>
                        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center lg:items-start rounded-2xl overflow-hidden shadow-lg rounded-t-none px-4">
                            


                            {/* Main Content */}
                            <main className="w-full bg-gradient-to-r rounded-b-none from-purple-600 to-purple-500 text-black p-6 pt-0">
                                <div className="flex flex-wrap gap-4 mt-5 justify-center">
                                    {/* Profile Card */}
                                    <div className=" w-80 bg-[#2a263d] text-white p-6 rounded-lg">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-16 h-16 rounded-full overflow-hidden">
                                                {/* <img src="/placeholder.jpg" alt="Jenny Wilson" className="w-full h-full object-cover" /> */}
                                            </div>
                                            <div>
                                                <div className="flex flex-row items min-w-50 -ml-5 items-center">
                                                    <FaUser className="text-fuchsia-700 text-3xl" />
                                                    <h3 className="font-bold pl-1 text-2xl">Domagoj</h3>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col mt-4 space-y-2 text-sm">
                                            <p><FaMapMarkerAlt className="inline mr-2" />Split, Hrvatska</p>
                                            <p><FaEnvelope className="inline mr-2" />domagoj@gmail.com</p>
                                            <p><FaVenus className="inline mr-2" />Spol: Muško</p>
                                            <p><FaCakeCandles className="inline mr-2" />Rođendan: 20.02.2006.</p>
                                            <button className="self-start pt-3">Promijeni podatke<FaPencilAlt className="inline ml-2 " /></button>
                                        </div>
                                    </div>

                                    {/* Stats container - take remaining space */}
                                    <div className="flex-grow flex flex-row flex-wrap gap-4 justify-center">
                                        <div className="bg-white p-4 rounded-lg shadow w-80" style={{ height: '400px' }}>
                                            <h4 className="text-xl font-semibold mb-2">Bedževi</h4>
                                            <div
                                                className="overflow-y-auto"
                                                style={{ height: 'calc(100% - 1.5rem)' }}
                                            >
                                                {/* Add enough content here to overflow */}
                                                <ul className="mb-10 badges">
                                                    <li>1</li>
                                                    <li>2</li>
                                                    <li>3</li>
                                                    <li>4</li>
                                                    <li>5</li>
                                                    <li>6</li>
                                                    <li>7</li>
                                                    <li>8</li>
                                                    <li>9</li>
                                                    <li>10</li>
                                                    <li>11</li>
                                                    <li>12</li>
                                                    <li>13</li>
                                                    <li>14</li>
                                                    <li>15</li>
                                                    <li>16</li>
                                                    <li>17</li>
                                                    <li>18</li>
                                                    <li>19</li>
                                                    <li>20</li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="bg-white p-4 rounded-lg shadow w-full lg:w-1/2 overflow-auto max-h-[500px]">
                                            <h1 className="font-semibold mb-2 text-xl">Bodovna ljestvica</h1>
                                            <ol className="">
                                                {[
                                                    { ime: "Domagoj", bodovi: "69 420", grad: "Novalja", datum: "18.10.2007." },
                                                    { ime: "Lana", bodovi: "42 000", grad: "Solin", datum: "03.11.2006." },
                                                    { ime: "Timea", bodovi: "42 000", grad: "Split", datum: "28.03.2007." },
                                                    { ime: "Tara", bodovi: "40 000", grad: "Dicmo", datum: "07.07.2008." },
                                                    { ime: "Essi", bodovi: "38 600", grad: "Jyväskylä", datum: "14.09.2008." }
                                                ].map((data, i) => (
                                                    <li
                                                        key={i}
                                                        className={`flex items-center gap-4 p-3 rounded-lg shadow ${data.ime === "Domagoj" ? "bg-blue-500 text-white" : "bg-white text-black"
                                                            }`}
                                                    >
                                                        <span className="text-right w-6">{i + 1}.</span>
                                                        <span className="w-1/5">{data.ime}</span>
                                                        <span className="w-1/5">{data.bodovi}</span>
                                                        <span className="w-1/6">{data.grad}</span>
                                                        <span className="w-1/5">{data.datum}</span>
                                                    </li>
                                                ))}
                                            </ol>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full bg-white rounded-lg mt-5 p-5 overflow-auto max-h-[500px]">
                                    <div>
                                        <h1 className="mb-5 text-xl font-semibold">Prijavljeni događaji</h1>
                                        <ul className="space-y-4">
                                            {[
                                                { organizacija: "Jedna mladost", lokacija: "Velebitska 23, Split", tip: "Djeca, Edukacija", datum: "14.6.2025.", naslov: "InterSTEM" },
                                                { organizacija: "Split Tech City", lokacija: "Poljička 19, Split", tip: "Druženje", datum: "03.7.2025.", naslov: "Locals & nomads" },
                                                { organizacija: "Dump", lokacija: "Ulica kralja Zvonimira 45", tip: "Edukacija", datum: "28.03.2025.", naslov: "Php" },
                                                { organizacija: "Digitalna Dalmacija", lokacija: "Put Firula 12", tip: "Neznan više", datum: "07.08.2025.", naslov: "Razvoj umjetne inteligencije" },
                                                { organizacija: "Open Coffe", lokacija: "Velebitska ulica 88", tip: "Neznan više", datum: "14.09.2025.", naslov: "Živi lokalno radi globalno jaba diba di" },
                                                { organizacija: "Open Coffe", lokacija: "Poljička cesta 23", tip: "Neznan više", datum: "31.12.2025.", naslov: "InterSTEM" },
                                                { organizacija: "Open Coffe", lokacija: "Domovinskog rata 102", tip: "Neznan više", datum: "7.01.2026.", naslov: "InterSTEM" },
                                                { organizacija: "Open Coffe", lokacija: "Matice hrvatske 17", tip: "Neznan više", datum: "19.2.2026.", naslov: "InterSTEM" },
                                                { organizacija: "Open Coffe", lokacija: "Put Trstenika 39", tip: "Neznan više", datum: "23.12.2026.", naslov: "InterSTEM" },
                                            ].map((data, i) => (
                                                <li
                                                    key={i}
                                                    className="border rounded-lg shadow p-4 grid gap-y-1 gap-x-4 md:grid-cols-6 grid-cols-1 items-start"
                                                >
                                                    <span className="font-medium text-gray-500">#{i + 1}</span>
                                                    <span><strong>{data.organizacija}</strong></span>
                                                    <span>{data.naslov}</span>
                                                    <span>{data.lokacija}</span>
                                                    <span>{data.tip}</span>
                                                    <span>{data.datum}</span>
                                                    <div className="md:col-span-6 flex justify-start items-center align-middle md:justify-end">
                                                        <button className="text-red-600 font-semibold hover:underline">
                                                            Odjavi se
                                                        </button>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </main>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
export default Profile;