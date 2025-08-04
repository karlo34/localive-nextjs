"use client";
import { FaUser } from "react-icons/fa";
import { useEffect, useState } from "react";
import { handleSignOut } from "@/app/utils/jobSignOut";
import { Job } from "@/app/types/job";

interface JobOfferCardsProps {
  jobType: string;
  jobArea: string
}


interface JobOfferCardsProps {
  abletosignup: boolean;
}
const JobOfferCards = ({ jobType, jobArea, abletosignup }: JobOfferCardsProps) => {
  const [jobs, setJobs] = useState<Job[]>([]); // Use Job type here
  const [displayJobs, setDisplayJobs] = useState<Job[]>([]); // Use Job type here
  const [userApplications, setUserApplications] = useState<Set<number>>(new Set()); // Track user's applications

  const fetchJobs = async () => {
    try {
      const res = await fetch("/api/jobs");
      const data = await res.json();
      const formattedJobs = data.map((data: any) => ({
        ...data,
        created_at: new Date(data.created_at),
        expires_at: new Date(data.expires_at),
      }));
      setJobs(formattedJobs);
      setDisplayJobs(formattedJobs);
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch all jobs
  useEffect(() => {
    fetchJobs();
  }, []);

  // Fetch user's job applications
  useEffect(() => {
    const fetchUserApplications = async () => {
      try {
        const res = await fetch("/api/userApplications");
        const data = await res.json();
        if (data?.applications) {
          setUserApplications(new Set(data.applications)); // Store applied job IDs in a Set
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserApplications();
  }, []);

  // Handle job application
  async function handleButtonClick(job: Job): Promise<void> {
    console.log("You clicked on the job:", job);

    try {
      const response = await fetch("/api/jobApplication", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jobId: job.job_id }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Job application submitted successfully!");
        setUserApplications((prev) => new Set(prev).add(job.job_id)); // Add job to the applied set
        fetchJobs();
      } else {
        console.log(data.error || "An error occurred");
      }
    } catch (error) {
      console.error("Error applying for job:", error);
    }
  }
  
   

  return (
    <div className="w-full rounded-lg mt-5 p-8 overflow-auto min-h-[100vh] text-black">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs?.length === 0 && <p>No jobs available 😕</p>}
        {displayJobs?.map((job) => (
          <div
            key={job.job_id}
            className="p-4 border shadow bg-white rounded-lg gap-y-1 gap-x-4 items-start events min-h-[300px] flex flex-col transform hover:scale-102 transition duration-300"
          >
            <div className="flex w-2/2 justify-between items-center">
              <h3 className="text-xl font-semibold">{job.title}</h3>
              <div className="flex items-center gap-x-2 text-lg">
                <p>{job.application_count}</p>
                <FaUser />
              </div>
            </div>
            <p>
              <strong>Company:</strong> {job.company_name}
            </p>
            <p>
              <strong>Posted:</strong> {new Date(job.created_at).toLocaleString()}
            </p>
            <p>
              <strong>Expires:</strong> {new Date(job.expires_at).toLocaleString()}
            </p>
            <p className="mt-2">
              <strong>Location:</strong> {job.country}, {job.region}, {job.city}
            </p>
            <p className="mt-2">{job.description}</p>

            {userApplications.has(job.job_id) ? (
              <button
                className="text-white px-2 py-1 mt-2 rounded-lg font-semibold text-base border-red-700 bg-red-500 hover:cursor-pointer"
                onClick={() =>
                  handleSignOut({
                    job, // Pass the job
                    setUserApplications, // Pass setUserApplications
                    fetchJobs, // Pass fetchJobs function
                  })
                }
              >
                Odjavi se
              </button>
            ) : (
              <button
                className={`text-white px-2 py-1 mt-2 rounded-lg font-semibold text-base border-green-700 bg-green-500 hover:cursor-pointer ${abletosignup ? "active" : "disabled opacity-50 cursor-not-allowed"
                  }`}
                onClick={() => handleButtonClick(job)}
              >
                Prijavi se
              </button>
            )}
            {!abletosignup && <p className="text-red-500">Ulogiraj se za prijavu</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobOfferCards;