"use client";
import { get } from 'http';
import React, { useEffect, useState } from 'react';

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
  application_count: number;
}


interface JobApplicationsProps {
  jobApplications: Job[];
}

export default function JobApplications({ jobApplications }: JobApplicationsProps) {
    const [jobs, setJobs] = useState<Job[]>([]);

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
            </div>
          ))}
        </div>
      ) : (
        "No job applications found."
      )}
        </div>
    )
}