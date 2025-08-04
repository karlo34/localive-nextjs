"use client";
import React from "react";
import { handleSignOut } from "@/app/utils/jobSignOut";
import { Job } from "@/app/types/job";

// Define JobApplicationsProps correctly, without duplication
interface JobApplicationsProps {
  jobApplications: Job[];
  fetchJobs: () => void;
  setUserApplications: React.Dispatch<React.SetStateAction<Set<number>>>;
}

export default function JobApplications({
  jobApplications,
  fetchJobs,
  setUserApplications,
}: JobApplicationsProps) {

  // Debugging logs
  console.log('jobApplications:', jobApplications);
  console.log('fetchJobs:', fetchJobs);
  console.log('setUserApplications:', setUserApplications);

  return (
    <div>
      {jobApplications.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobApplications.map((job, index) => (
            <div data-user={job.job_id} key={index} className="p-4 border rounded shadow">
              <h2 className="text-lg font-semibold">{job.title}</h2>
              <p>{job.description}</p>
              <p className="text-sm text-gray-500">
                Applied on: {new Date(job.created_at).toLocaleDateString()}
              </p>
              <button
                className="text-white px-2 py-1 mt-2 rounded-lg font-semibold text-base border-red-700 bg-red-500 hover:cursor-pointer"
                onClick={() =>
                  handleSignOut({
                    job,
                    setUserApplications,
                    fetchJobs,
                  })
                }
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