"use client";
import JobOfferCards from "../components/jobOfferCards";
import Navbar from "../components/navbar";

import { useState } from "react";
// import "../css/profile.css";

const Jobs = () => {
    const [jobType, setJobType] = useState<string>("");
    const [jobArea, setJobArea] = useState<string>("");
    const handleSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedPerson = event.target.value;
        if (selectedPerson === "") {
            setJobArea(""); // Reset jobType when selection is empty
        } else {
            setJobArea(selectedPerson); // Update jobType with the selected value
        }
    };
    return (
        <div>
            <Navbar />
            <h1 className="my-7 font-semibold text-white text-4xl text-center">Pronađi posao</h1>
            <select
                id="person"
                onChange={handleSelection}
                className="w-1/4 ml-[70vw] bg-white border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="">-- Izaberi grad --</option>
                <option value="Split">Split</option>
                <option value="Makarska">Makarska</option>
                <option value="Trogir">Trogir</option>
                <option value="Hvar">Hvar</option>
            </select>
            <JobOfferCards jobType={jobType} jobArea={jobArea}/>
        </div>
    )
}

export default Jobs;