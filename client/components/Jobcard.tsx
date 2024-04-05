import { Job } from "@/atoms/atom"
import { Jobmodal } from "./JobModal"
import { useState } from "react";

export const JobCard = ({ job }: { job: Job }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = (e:any) => {
        e.stopPropagation()
        setIsModalOpen(false);
    };

    return <div className='shadow-xl border-2 border-gray-300 p-3 rounded-2xl cursor-pointer' onClick={openModal}>
        <img src={job.logo} alt="" className="w-14 rounded-full p-2 my-3 bg-gray-100" />
        <h1 className="font-bold my-3">{job.title}</h1>
        <div className="flex my-2 items-center text-sm text-gray-500">
            <p>{job.location}</p>
            <div className="w-1 my-2 h-1 rounded-full bg-gray-400 mx-2"></div>
            <p>{job.org}</p>
        </div>
        <p className="my-2 font-bold text-sm bg-gray-100 boder-2 border-gray-300 rounded-full px-3 py-1 w-fit">{job.compensation} per month</p>
        {isModalOpen && <Jobmodal job={job} onClick={(e:any) => closeModal(e)} />}
    </div>
}