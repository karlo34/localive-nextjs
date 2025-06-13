"use client";

import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';


import Navbar from '../navbar';
import MyProfile from '@/app/components/myProfile';
import CreateEvent from '@/app/components/createEvent';

import "@/app/css/profile.css";


const Profile = () => {
    const router = useRouter();
    const [logedIn, setLogedIn] = useState(false);
    const [role, setRole] = useState("user");
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
            getCookieValue("role");
        }
    }, [logedIn]);

    function getCookieValue(name: string) {
        const cookies = document.cookie.split('; ');
        for (let cookie of cookies) {
            const [cookieName, cookieValue] = cookie.split('=');
            if (cookieName === name) {
                setRole(decodeURIComponent(cookieValue));
            }
        }
        return null;
    }
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
                                {
                                    (role === "admin" || role === "organizer") ? (
                                        <button
                                    onClick={() => setShowSection("organiziraj")}
                                    className={`px-2 bg-gradient-to-r rounded-2xl rounded-b-none hover:from-purple-700 hover:to-purple-600 hover:text-white ${showSection === "organiziraj" ? "active-button h-10 from-purple-600 to-purple-500" : ""}`}>
                                    Prijavi/upiši događaj
                                </button>
                                    ) : (null)
                                }
                                
                            </nav>
                        </aside>
                        {
                            showSection === "podaci" ? (<MyProfile />) : (<CreateEvent />)
                        }

                    </div>
                )
            }
        </div>
    )
}
export default Profile;