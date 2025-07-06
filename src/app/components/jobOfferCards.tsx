"use client";
import { FaUser } from "react-icons/fa";
import { useEffect, useState } from "react";

interface JobOfferCardsProps {
    jobType: string;
}

interface Job {
    country: string;
    region: string;
    city: string;
    company_name: string;
    created_at: Date;
    description: string;
    expires_at: Date;
    job_id: number;
    is_active: number;
    location_id: number;
    posted_by: number;
    title: string;
}

const jobOfferCards = ({ jobType }: JobOfferCardsProps) => {
    const [jobs, setJobs] = useState<Job[]>([]);
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                console.log("data");
                const res = await fetch("api/jobs");
                const data = await res.json();

                const formattedJobs = data.map((data: any) => ({
                    ...data,
                    created_at: new Date(data.created_at),
                    expires_at: new Date(data.expires_at),
                }));

                setJobs(formattedJobs);
                console.log(formattedJobs);
            } catch (err) {
                console.log(err);
            } finally {
            }
        };
        fetchJobs();
    }, []);

    return (
        <div className="w-full rounded-lg mt-5 p-8 overflow-auto min-h-[100vh] text-black">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {jobs === null && <p>Učitavanje poslova…</p>}
                {jobs?.length === 0 && <p>Nema poslova za prikaz 😕</p>}
                {jobs?.map(job => (
                    <div key={job.job_id} data-city={job.city} data-region={job.region} data-country={job.country}
                    className="p-4 border shadow bg-white rounded-lg gap-y-1 gap-x-4 items-start events min-h-[300px] flex flex-col transform hover:scale-102 transition duration-300">
                        <div className="flex w-2/2 justify-between items-center">
                            <h3 className="text-xl font-semibold">{job.title}</h3>
                            <div className="flex items-center">
                                <span className="text-2xl pr-2">1</span>
                                <FaUser className="text-2xl text-blue-700" />

                            </div>
                        </div>
                        <p><strong>Kompanija:</strong> {job.company_name}</p>
                        <p><strong>Objavljeno:</strong>{new Date(job.created_at).toLocaleString()}</p>
                        <p><strong>Istek:</strong>{new Date(job.expires_at).toLocaleString()}</p>
                        <p className="mt-2"><strong>Lokacija:</strong>{job.country},{job.region},{job.city}</p>
                        <p className="mt-2">{job.description}</p>
                        {/* <p className="text-sm text-gray-500">
                            Lokacija ID: {job.location_id} • Objavio: {job.posted_by} • Aktivno: {job.is_active === 1 ? "Da" : "Ne"}
                        </p> */}
                        <button className="text-white px-2 py-1 rounded-lg font-semibold font-xl border-green-700 bg-green-500 hover:cursor-pointer">Prijavi se</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default jobOfferCards;

//gap-8