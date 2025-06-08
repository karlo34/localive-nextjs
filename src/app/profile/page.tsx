"use client";

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'; // or 'next/router' for older versions

import Navbar from '../navbar';



const Profile = () => {
    const router = useRouter();
    const [logedIn, setLogedIn] = useState(false);


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
                    <div>
                        <Navbar />
                        My profile

                    </div>
                    )
            }

        </div>
    )
}
export default Profile;