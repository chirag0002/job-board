'use client'

import { jobApi } from "@/api/job.api"
import { Job, myJobsAtom, showCreateJobAtom } from "@/atoms/atom"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useRecoilState, useSetRecoilState } from "recoil"
import { CreateJob } from "./CreateJob"

export const MyJobs = () => {
    const [myJobs, setMyJobs] = useRecoilState(myJobsAtom)
    const token = sessionStorage.getItem('token')
    const router = useRouter()
    const setShowCreateJob = useSetRecoilState(showCreateJobAtom)

    useEffect(() => {
        if (!token) return
        jobApi.getMyJobs(token)
            .then(res => setMyJobs(res.data.jobs))
            .catch((err: any) => alert(err.response.data.message))
    }, [])

    function onDelete(jobId: string) {
        if (!token) return
        jobApi.deleteJob(jobId, token)
            .then(res => {
                alert(res.data.message)
                window.location.reload()
            })
            .catch((err: any) => alert(err.response.data.message))
    }

    function onEdit(jobId: string) {
        router.push(`/update/${jobId}`)
    }

    function createJob() {
        setShowCreateJob(true)
    }

    if (myJobs.length === 0) {
        return <div className='py-4 w-3/4 m-auto'>
            <div className="bg-green-400 px-4 py-2 w-fit rounded-full text-white font-bold cursor-pointer" onClick={createJob}>
                Create Job
            </div>
            <div className="text-center font-bold text-gray-400">
                you have not posted any jobs yet
            </div>
            <CreateJob />
        </div>
    }
    return <div className='py-4 w-3/4 m-auto'>
        <div className="bg-green-400 px-4 py-2 w-fit rounded-full text-white font-bold cursor-pointer" onClick={createJob}>
            Create Job
        </div>
        <div>
            {myJobs.map((job: any) => (
                <Card
                    key={job.id}
                    job={job}
                    onDelete={() => onDelete(job.id)}
                    onEdit={() => onEdit(job.id)}
                />
            ))}
        </div>
        <CreateJob />
    </div>
}

function Card({ job, onDelete, onEdit }: { job: Job, onDelete: () => void, onEdit: () => void }) {
    const [showModal, setShowModal] = useState(false);

    const handleDeleteClick = () => {
        setShowModal(true);
    };

    const confirmDelete = () => {
        onDelete();
        setShowModal(false);
    };

    const handleEditClick = () => {
        onEdit();
    };

    return (
        <div className='shadow-xl border-2 border-gray-300 p-3 my-4 rounded-2xl cursor-pointer'>
            <img src={job.logo} alt="" className="w-14 rounded-full p-2 my-3 bg-gray-100" />
            <h1 className="font-bold my-3">{job.title}</h1>
            <div className="flex my-2 items-center text-sm text-gray-500">
                <p>{job.location}</p>
                <div className="w-1 my-2 h-1 rounded-full bg-gray-400 mx-2"></div>
                <p>{job.org}</p>
            </div>
            <div>
                <p>Description: <span>{job.description}</span></p>
            </div>
            <p className="my-2 font-bold text-sm bg-gray-100 boder-2 border-gray-300 rounded-full px-3 py-1 w-fit">{job.compensation} per month</p>
            <div className="flex justify-center items-center">
                <button onClick={handleEditClick} className="mx-3 w-2/12 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Edit</button>
                <button onClick={handleDeleteClick} className="mx-3 w-2/12 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Delete</button>
            </div>
            {showModal && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"></path>
                                        </svg>
                                    </div>
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">Delete Job</h3>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">Are you sure you want to delete this job?</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button onClick={confirmDelete} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                                    Delete
                                </button>
                                <button onClick={() => setShowModal(false)} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}