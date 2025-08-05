// utils/jobHandlers.ts
import { Job } from "@/app/types/job"; // Adjust import path based on where your Job type lives

interface HandleSignOutParams {
    job: Job;
    setUserApplications: React.Dispatch<React.SetStateAction<Set<number>>>;
    fetchJobs: () => void;
}

export async function handleSignOut({
    job,
    setUserApplications,
    fetchJobs,
}: HandleSignOutParams): Promise<void> {
    console.log("You clicked on Sign Out:", job.job_id);
    try {
        console.log("Sending request to remove application for job ID:", job);
        const response = await fetch("/api/jobApplication", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ jobId: job.job_id }),
            credentials: "include", // ✅ This sends the userId cookie!
        });

        const data = await response.json();

        if (response.ok) {
            alert("Job application removed successfully!");
            setUserApplications((prev) => {
                const newApplications = new Set(prev);
                newApplications.delete(job.job_id); // Remove the job from the applied set
                fetchJobs();
                return newApplications;
            });
        } else {
            console.log(data.error || "An error occurred");
        }
    } catch (error) {
        console.error("Error removing application:", error);
    }
}