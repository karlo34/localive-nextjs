'use client';

import { useState, useEffect } from 'react';
import Navbar from '../../components/navbar';
import Prijava from '@/app/components/prijava';
import Registracija from '@/app/components/registracija';

const JoinUs = () => {

  const [prijava, setPrijava] = useState(true);

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
  const changeForm = () => {
    setPrijava(prev => !prev);
  };

  return (
    <div>
      <Navbar />
      {prijava ? (
        <div>
          <div className='flex flex-col items-center'>
            <Prijava />
              <button onClick={changeForm} className="-mt-8 underline">
                Nemaš profil? Registriraj se.
              </button>
          </div>
        </div>

      ) : (
        <div>
          <div className='flex flex-col items-center'>
            <Registracija />
            {/* <button onClick={changeForm} className="mt-4 underline"> */}
              <button onClick={changeForm} className="-mt-8 underline">
                Prijavi se ne postojeći profil.
              </button>
          </div>
          </div>
      )}
        </div>
      );
};

      export default JoinUs;