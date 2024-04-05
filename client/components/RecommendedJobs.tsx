'use client'

import { jobApi } from "@/api/job.api"
import { Job, jobsAtom, openModalAtom } from "@/atoms/atom"
import { useEffect } from "react"
import { useRecoilValue } from "recoil"
import { JobCard } from "./Jobcard"
import { useRouter } from "next/navigation"

export const RecommendedJobs = () => {
    const jobs = useRecoilValue(jobsAtom)
    const router = useRouter()
    const lessJobs = jobs.slice(0, 3)

    return <div className="w-3/4 m-auto">
        <p className="my-5">
            Recommended for you
        </p>
        <div className="grid grid-cols-3 gap-5">
            {lessJobs.map((job: Job) => (
                <JobCard key={job.id} job={job} />
            ))}
        </div>
        <div className="flex justify-center pt-5">
            <button 
            className="rounded-full px-4 py-1 bg-green-400 text-white font-bold"
            onClick={() => router.push('/jobs')}
            >
                See More
            </button>
        </div>
    </div>
}