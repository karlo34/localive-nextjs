"use client";
import JobOfferCards from "../components/jobOfferCards";
import Navbar from "../components/navbar";

import { useState } from "react";
// import "../css/profile.css";

const Jobs = () => {
    const [jobType, setJobType] = useState<string>("");
    const handleSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedPerson = event.target.value;
        if (selectedPerson === "") {
            setJobType(""); // Reset jobType when selection is empty
        } else {
            setJobType(selectedPerson); // Update jobType with the selected value
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
                <option value="">-- Choose a person --</option>
                <option value="John Doe">John Doe</option>
                <option value="Jane Smith">Jane Smith</option>
                <option value="Samuel Adams">Samuel Adams</option>
                <option value="Emily Clark">Emily Clark</option>
            </select>
            <JobOfferCards jobType={jobType} />
        </div>
    )
}

export default Jobs;