"use client";
import './css/animations.css';

import Navbar from './navbar';
import Gallery from './components/gallery'

export default function Home() {




  return (
    <div className=''>
      <Navbar />

      <Gallery />
      <div className='flex flex-col items-center w-full mt-15'>
        <h1 className='text-4xl font-bold mb-5'>Naš cilj</h1>
        <p className='w-1/2 text-lg text-center mb-15'>Projekt <strong>Localive</strong> ima za cilj potaknuti ljude da se <strong>aktivnije uključe</strong> u <strong>društvene aktivnosti</strong> i <strong>događanja</strong> u svojoj lokalnoj zajednici. Kroz ovaj projekt, korisnicima omogućujemo da <strong>lako saznaju</strong> o nadolazećim događanjima, bilo da su u pitanju <strong>kulturne manifestacije</strong>, <strong>sportski susreti</strong>, <strong>edukativne radionice</strong> ili <strong>društvene večeri</strong>. Naša misija je smanjiti osjećaj <strong>izolacije</strong> i potaknuti ljude da izađu iz svojih kuća, upoznaju nove ljude i stvaraju nova prijateljstva. Vjerujemo da redovito sudjelovanje u društvenim aktivnostima ne samo da obogaćuje osobni život, već i doprinosi <strong>jačanju zajednice</strong> u cjelini. U današnjem digitalnom dobu, gdje se osobni susreti često zamjenjuju virtualnim interakcijama, važno je pružiti <strong>jednostavan način</strong> za pronalaženje i sudjelovanje u lokalnim događanjima. <strong>Localive</strong> nastoji biti <strong>most između online svijeta i stvarnog života</strong>, olakšavajući korisnicima da se povežu s drugima i <strong>aktivno sudjeluju</strong> u životu svoje zajednice.
        </p>
      </div>
    </div>
  );
}
