"use client";
import React, { useState, useEffect } from "react";
import { handleSignOut } from "@/app/utils/jobSignOut";
import { Job } from "@/app/types/job";

interface JobApplicationsProps {
    jobApplications: any[];            // Replace `any[]` with a more specific type if you have one
    fetchJobs: () => Promise<void>;
    setUserApplications: React.Dispatch<React.SetStateAction<Set<number>>>;
}

export default function JobApplications({ fetchJobs, setUserApplications }: JobApplicationsProps) {
  const [jobApplications, setJobApplications] = useState<Job[]>([]); // All jobs
  const [userAppliedJobIds, setUserAppliedJobIds] = useState<number[]>([]); // User's applied jobs

  // Fetch user applications (only once)
  useEffect(() => {
    const fetchUserApplications = async () => {
      try {
        const res = await fetch("/api/userApplications");
        const data = await res.json();
        console.log("Fetched user applications:", data); // Log applied job IDs
        if (data?.applications) {
          setUserAppliedJobIds(data.applications); // Store the applied job IDs
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchUserApplications();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Fetch all jobs and filter based on the applied job IDs
  useEffect(() => {
    if (userAppliedJobIds.length === 0) return; // Avoid fetching jobs until applied job IDs are ready

    const fetchJobsData = async () => {
      try {
        const res = await fetch("/api/jobs");
        const data = await res.json();
        console.log("Fetched jobs:", data); // Log the fetched jobs
        // Filter jobs to only include the ones that the user has applied for
        const appliedJobs = data.filter((job: Job) =>
          userAppliedJobIds.includes(Number(job.job_id)) // Cast to number if necessary
        );
        console.log("Filtered applied jobs:", appliedJobs); // Log filtered jobs
        setJobApplications(appliedJobs);
      } catch (err) {
        console.log(err);
      }
    };

    fetchJobsData(); // Fetch all jobs and filter them based on applied job IDs
  }, [userAppliedJobIds]); // This will run once the userAppliedJobIds is populated

  // Function to handle removing the job from the UI when "Sign Out" is clicked
  const handleJobRemoval = (jobId: number) => {
    setJobApplications((prevJobs) => prevJobs.filter((job) => job.job_id !== jobId));
  };

  return (
    <div>
      {jobApplications.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobApplications.map((job, index) => (
            <div key={index} className="p-4 border rounded shadow">
              <h2 className="text-lg font-semibold">{job.title}</h2>
              <p>{job.description}</p>
              <p className="text-sm text-gray-500">
                Applied on: {new Date(job.created_at).toLocaleDateString()}
              </p>
              <button
                className="text-white px-2 py-1 mt-2 rounded-lg font-semibold text-base border-red-700 bg-red-500 hover:cursor-pointer"
                onClick={() => {
                  // Call handleSignOut to remove the application from the database
                  handleSignOut({
                    job,
                    setUserApplications: () => {},
                    fetchJobs,
                  }).then(() => {
                    // Remove the job from the UI after successful sign-out
                    handleJobRemoval(job.job_id);
                  });
                }}
              >
                Odjavi se
              </button>
            </div>
          ))}
        </div>
      ) : (
        "No job applications found."
      )}
    </div>
  );
}
