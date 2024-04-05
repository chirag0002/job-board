'use client'

import { jobApi } from "@/api/job.api";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import countriesData from '../data/countries.data.json'

export const EditJob = () => {
    const [isEditable, setIsEditable] = useState(false);
    const [jobData, setJobData] = useState({
        logo: "",
        title: "",
        location: "",
        org: "",
        description: "",
        compensation: "",
    })
    const { jobId } = useParams()
    const jobIdString = Array.isArray(jobId) ? jobId[0] : jobId;
    const token = sessionStorage.getItem("token")
    const router = useRouter()

    useEffect(() => {
        if (!jobIdString) return

        jobApi.getJob(jobIdString)
            .then((res) => {
                setJobData(res.data.job);
            })
            .catch((err) => {
                alert(err.response.data.message)
            });
    }, []);

    const handleUpdate = () => {
        setIsEditable(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setJobData((prevData) => {
            return {
                ...(prevData || {}),
                [name]: value
            }
        });
    };


    const handleSave = () => {
        if (!token || !jobIdString) return;
        const payload = {
            title: jobData.title,
            location: jobData.location,
            org: jobData.org,
            compensation: jobData.compensation,
            description: jobData.description
        };

        jobApi.updateJob(jobIdString, payload, token).then((res) => {
            alert(res.data.message);
            setIsEditable(false);
        }).catch((err) => {
            alert(err.response.data.message);
        });
        router.push('/admin')
    };

    return (
        <div className="bg-gray-100">
            <div className="flex justify-center mt-8">
                <div className="bg-white rounded-lg p-8 shadow-xl w-11/12">
                    <img src={jobData.logo} alt="Avatar" className="rounded-full h-24 w-24 mx-auto mb-4 border-2" />

                    <div className='flex flex-col sm:flex-row'>
                        <div>
                            <label className="font-semibold mr-2 text-sm md:text-lg sm:text-base my-1">Title:</label>
                            <input type="text" name="title" value={jobData.title} onChange={handleInputChange} disabled={!isEditable} className="text-sm md:text-lg sm:text-base font-semibold border-b border-gray-400 focus:outline-none" />
                        </div>
                    </div>

                    <div className='flex mt-4 flex-col sm:flex-row'>
                        <label className="text-gray-600 mr-2 text-sm md:text-lg sm:text-base">Organisation:</label>
                        <input type="text" name="org" value={jobData.org} onChange={handleInputChange} disabled={!isEditable} className="text-sm md:text-lg sm:text-base text-gray-600 border-b border-gray-400 focus:outline-none block" />
                    </div>

                    <div className='flex mt-4 flex-col sm:flex-row'>
                        <label className="text-gray-600 block mr-2 text-sm md:text-lg sm:text-base">Location:</label>
                        <select
                            value={jobData.location}
                            onChange={handleInputChange}
                            disabled={!isEditable}
                            name="location"
                        >
                            <option value="">{jobData.location}</option>
                            {countriesData.map((country, index) => (
                                <option key={index} value={country}>
                                    {country}
                                </option>
                            ))}
                        </select>

                    </div>

                    <div className='flex mt-4 flex-col sm:flex-row h-44'>
                        <label className="text-gray-600 block mr-2 text-sm md:text-lg sm:text-base">Description:</label>
                        <textarea name="description" value={jobData.description} onChange={handleInputChange} disabled={!isEditable} className="text-sm md:text-lg sm:text-base text-gray-600 border-b border-gray-400 focus:outline-none block w-full" />

                    </div>

                    <div className='flex mt-4 flex-col sm:flex-row '>
                        <label className="text-gray-600 block mr-2 text-sm md:text-lg sm:text-base">Compensation:</label>
                        <input type="text" name="compensation" value={jobData.compensation} onChange={handleInputChange} disabled={!isEditable} className="text-sm md:text-lg sm:text-base text-gray-600 border-b border-gray-400 focus:outline-none block" />

                    </div>

                    <div className="flex justify-center mt-6 text-sm md:text-lg sm:text-base">
                        {isEditable ? (
                            <button onClick={handleSave} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-4 rounded focus:outline-none">
                                Save
                            </button>
                        ) : (
                            <button onClick={handleUpdate} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-4 rounded focus:outline-none">
                                Update
                            </button>
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
};