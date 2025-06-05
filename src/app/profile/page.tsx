"use client";

import { useEffect } from "react";
import { useRouter } from 'next/navigation'; // or 'next/router' for older versions

import Navbar from '../navbar';



const Profile = () => {
    const router = useRouter();

    useEffect(() => {
        const cookies = document.cookie;
        const tokenExists = cookies.includes("logedIn");

        if (!tokenExists) {
            router.push('/profile/registracija');
        }
    }, []);
    return (
        <div>
            <Navbar/>
            My profile
        </div>
    )
}
export default Profile;