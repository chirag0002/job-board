'use client'

import { jobsAtom } from '@/atoms/atom'
import { JobCard } from '@/components/Jobcard'
import { SearchBar } from '@/components/SearchBar'
import { useRecoilValue } from 'recoil'

const page = () => {
    const jobs = useRecoilValue(jobsAtom)

    if (jobs.length === 0) {
        return (
            <div className='pt-10 w-3/4 m-auto'>
                <SearchBar />

                <p className="my-5 text-center font-bold text-gray-400">
                    No search results found
                </p>
            </div>
        )
    }

    return <div className='pt-10 w-3/4 m-auto'>
        <SearchBar />
        <div className='grid grid-cols-3 gap-5'>
            {jobs.map(job => {
                return <JobCard key={job.id} job={job} />
            })}
        </div>
    </div>
}

export default page
