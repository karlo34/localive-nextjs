"use client";

import React from "react";
import { useState, useEffect } from "react"
import { FaUser, FaEnvelope, FaPhone, FaHome, FaBuilding, FaPager, FaVenus, FaIdCard, FaHospital, FaRulerVertical, FaWeight, FaCheckCircle, FaTimesCircle, FaClock, FaBan, FaSearch, FaPlus, FaCar, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import "@/app/css/profile.css";

import Navbar from "@/app/navbar";


const PatientDetailsDashboard = () => {
  const [showSection, setShowSection] = useState("podaci")

  useEffect(() => {
    console.log(showSection);
  }, [showSection])

  return (
    <div className="min-h-screen bg-[#0d0b1e] text-white pt-0">
      <Navbar />
      <div className="max-w-[1440px] mx-auto flex rounded-2xl overflow-hidden shadow-lg">
        {/* Sidebar */}
        <aside className="w-1/5 min-h-180 bg-white text-black p-4 space-y-4">
          <h1 className="text-2xl font-bold mb-4">kinetik</h1>
          {/* <button className="w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white py-2 rounded flex items-center justify-center gap-2">
            <FaPlus/> New Trip
          </button> */}
          <nav className="flex flex-col space-y-2 text-sm h-125 justify-center">
            <button
              onClick={() => setShowSection("podaci")}
              className={showSection === "podaci" ? "active-button" : ""}>
              Moji podaci
            </button>
            <button
              onClick={() => setShowSection("dogadaji")}
              className={showSection === "dogadaji" ? "active-button" : ""}>
              Prijavljeni događaji
            </button>
            <button
              onClick={() => setShowSection("leaderboard")}
              className={showSection === "leaderboard" ? "active-button" : ""}>
              Ljestvica
            </button>
            <button
              onClick={() => setShowSection("bedzevi")}
              className={showSection === "bedzevi" ? "active-button" : ""}
            >
              Bedževi
            </button>

            {/* <button>All Patients</button>
            <button>Productivity</button>
            <button>Feedback Corner</button>
            <button>Reports</button>
            <button>Reimbursement</button> */}
          </nav>
          {/* <div className="mt-auto text-xs text-gray-500">
            Last screened on May 18, 2022 at 12:06pm
          </div> */}
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-[#f9f9fb] text-black p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Patient’s details</h2>
            <div className="relative">
              <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-8 pr-2 py-2 border border-gray-300 rounded-md w-64"
              />
            </div>
          </div>
          {
            showSection === "podaci" && (
              <p>{showSection}</p>
            )
            // Ime, prezime
            // Email
            // Korisničko ime
            // Mogućnost izmjene lozinke
            // Uredi profil (možda i profilna slika)
          }
          {
            showSection === "dogadaji" && (
              <p>{showSection}</p>
              // Lista događaja na koje je korisnik prijavljen
              // Status (npr. "U tijeku", "Završen")
              // Gumbi za odjavu (ako je primjenjivo)
            )
          }
          {
            showSection === "leaderboard" && (
              <p>{showSection}</p>
              // broj bodova korisnika
              // ljestvica prvih 10
              // koji je on + 2 ispred i iza
            )
          }
          {
            showSection === "bedzevi" && (
              <p>{showSection}</p>
              // lista otkrivenih
              // lista neotkrivenih (na hover ima div koji pise kako se dobije i koliko je blizu da ostvari cilj)
            )
          }


          <div className="grid grid-cols-3 gap-4">
            {/* Profile Card */}
            <div className="col-span-1 bg-[#2a263d] text-white p-6 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full overflow-hidden">
                  {/* <img src="/placeholder.jpg" alt="Jenny Wilson" className="w-full h-full object-cover" /> */}
                </div>
                <div>
                  <div className="flex flex-row items -ml-5">
                    <FaUser className="text-fuchsia-700 mt-2 mr-5" />
                    <h3 className="text-lg font-bold">Mrs. Jenny Wilson</h3>
                  </div>
                  <p className="text-sm">03.22.1990 (34)</p>
                </div>
              </div>
              <div className="mt-4 space-y-2 text-sm">
                <p><FaMapMarkerAlt className="inline mr-2" />123 Main Street, New York</p>
                <p><FaEnvelope className="inline mr-2" />jenny.w@gmail.com</p>
                <p><FaPhone className="inline mr-2" />Cell: (817) 234-3244</p>
                <p><FaHome className="inline mr-2" />Home: (817) 234-0000</p>
                <p><FaBuilding className="inline mr-2" />Work: (817) 100-0000</p>
                <p><FaPager className="inline mr-2" />Other: (817) 210-0000</p>
                <p><FaVenus className="inline mr-2" />Sex: female</p>
                <p><FaIdCard className="inline mr-2" />ID number: 014299212</p>
                <p><FaHospital className="inline mr-2" />Insurance: Blue Cross Blue Shield</p>
                <p><FaRulerVertical className="inline mr-2" />Height: 5.7’</p>
                <p><FaWeight className="inline mr-2" />Weight: 165.9 lb</p>
              </div>
            </div>

            {/* Stats */}
            <div className="col-span-2 grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <h4 className="text-sm font-semibold mb-2">Car Rides Stats (This Week)</h4>
                <ul className="text-sm space-y-1">
                  <li><FaCheckCircle className="inline mr-2 text-green-600" />Completed: 2139</li>
                  <li><FaTimesCircle className="inline mr-2 text-red-600" />Incompleted: 2222</li>
                  <li><FaClock className="inline mr-2 text-yellow-600" />Scheduled: 3736</li>
                  <li><FaBan className="inline mr-2 text-gray-600" />Canceled: 1422</li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded-lg shadow">
                <h4 className="text-sm font-semibold mb-2">Total Trip Spend (All Time)</h4>
                <p className="text-lg font-bold">$22099</p>
                <p className="text-sm">Average Ride Cost: $61</p>
              </div>
            </div>
          </div>


        </main>
      </div>
    </div>
  );
};

export default PatientDetailsDashboard;
