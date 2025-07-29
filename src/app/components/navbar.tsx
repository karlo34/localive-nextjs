'use client';
import '../css/animations.css';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';


const Navbar = () => {
  const [letters, setLetters] = useState<{ char: string; delay: number }[]>([]);
  const [menu, setMenu] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [animatingOut, setAnimatingOut] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [logedIn, setLogedIn] = useState(false);




  const router = useRouter();


  useEffect(() => {
    const text = 'Localive';
    const spans = text.split('').map((char, i) => ({
      char,
      delay: i * 350,
    }));
    setLetters(spans);

    
  }, []);

  const menuToggle = () => {
    if (isDisabled) return;

    setIsDisabled(true);

    if (menu) {
      setAnimatingOut(true);
      setTimeout(() => {
        setMenu(false);
        setShowMenu(false);
        setAnimatingOut(false);
      }, 800);
    } else {
      setMenu(true);
      setShowMenu(true);
    }

    setTimeout(() => {
      setIsDisabled(false);
    }, 1500);
  };

  const logOut = async () => {
    try {
      // Clear client-side cookies (these are the non-httpOnly cookies)
      document.cookie.split(';').forEach(cookie => {
        const [name] = cookie.trim().split('=');
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      });
      // Redirect user to home page
      router.push("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  useEffect(() => {
    const cookies = document.cookie;
    const tokenExists = cookies.includes("logedIn");

    if (!tokenExists) {
      // router.push('/profile/registracija');
    } else {
      setLogedIn(true);
    }
  }, [logedIn]);

  return (
    <div>
      {menu && (
        <div
          className={`
          fixed inset-0 bg-black bg-opacity-75 z-2 flex flex-col items-center text-white text-2xl font-bold mt-17.5
          ${animatingOut ? 'menu-slide-fade-out' : 'menu-slide-fade-in'}`}
        >
          <a onClick={() => router.push('/')} className="mt-16">Početna</a>
          <div className="bg-white w-24 h-0.5 my-2"></div>

          <a onClick={() => router.push('/events')} className="mt-3">Događaji</a>
          <div className="bg-white w-28 h-0.5 my-2"></div>

          <a onClick={() => router.push('/jobs')} className="mt-3">Poslovi</a>
          <div className="bg-white w-20 h-0.5 my-2"></div>

          <a onClick={() => router.push('/volunteering')} className="mt-3">Volontiranje</a>
          <div className="bg-white w-36 h-0.5 my-2"></div>

          <a onClick={() => router.push('/partners')} className="mt-3">Partneri</a>
          <div className="bg-white w-24 h-0.5 my-2"></div>

          <a onClick={() => router.push('/profile')} className="mt-3">Moj profil</a>
          <div className="bg-white w-30 h-0.5 my-2"></div>

          <a onClick={() => router.push('/joinUs')} className="mt-3">Pridruži nam se</a>
          <div className="bg-white w-44 h-0.5 my-2"></div>
          {logedIn ? (
            <div className='flex flex-col items-center'>
              <a onClick={logOut} className="mt-3">Odjavi se</a>
              <div className="bg-white w-30 h-0.5 my-2"></div>
            </div>) : null}
        </div>
      )}
      <nav className="w-full bg-black text-white flex items-center justify-between px-4 py-3">
        <div className="text-5xl font-semibold flex justify-center flex-grow relative">
          <div className="top-0 flex pl-10">
            {letters.map(({ char, delay }, index) => (
              <span
                key={index}
                className="letter-fade-in text-white"
                style={{ animationDelay: `${delay}ms` }}>
                {char}
              </span>
            ))}
          </div>
        </div>
        <button onClick={menuToggle} className={`
          text-white text-3xl cursor-pointer translate-y-1 w-10 z-3
          ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}>
          {menu ? '✕' : '☰'}
        </button>
      </nav>
    </div>
  );
};

export default Navbar;
