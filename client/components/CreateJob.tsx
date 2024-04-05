'use client'

import { useRecoilState, useSetRecoilState } from "recoil";
import { LabeledInput } from "./InputField";
import { useState } from "react";
import { jobApi } from "@/api/job.api";
import { showCreateJobAtom } from "@/atoms/atom";
import countriesData from '../data/countries.data.json'


interface Job {
    logo: string,
    title: string,
    org: string,
    location: string,
    compensation: string,
    description: string,
}

export const CreateJob = () => {
    const [showCreateJob, setShowCreateJob] = useRecoilState(showCreateJobAtom)
    const token = sessionStorage.getItem('token');
    const [jobInputs, setJobInputs] = useState<Job>({
        logo: "",
        title: "",
        org: "",
        location: "",
        compensation: "",
        description: "",
    })

    const submit = () => {
        if (!token) return
        jobApi.createJob(token, jobInputs).then((res) => {
            alert(res.data.message)
            window.location.reload()
        }).catch((err) => {
            alert(err.response.data.message)
        })
    }

    return (
        <div className="flex justify-center items-center h-screen" style={{ display: showCreateJob ? 'block' : 'none' }}>
            <div className="bg-gray-400 bg-opacity-70 absolute inset-0 z-10 flex justify-center items-center">
                <div className="relative bg-white p-8 rounded-lg shadow-md">
                    <div
                        className="absolute top-4 right-4 font-bold rounded-full bg-gray-200 w-6 text-center cursor-pointer"
                        onClick={() => {
                            setShowCreateJob(!showCreateJob)
                        }}
                    >
                        x
                    </div>
                    <h2 className="text-lg font-semibold mb-4">Create New Job</h2>

                    <LabeledInput
                        label="Title"
                        placeholder="Title"
                        onChange={(e) => {
                            setJobInputs({
                                ...jobInputs,
                                title: e.target.value
                            })
                        }}
                        type="text"
                    />

                    <LabeledInput
                        label="Organisation Logo"
                        placeholder="Image link"
                        onChange={(e) => {
                            setJobInputs({
                                ...jobInputs,
                                logo: e.target.value
                            })
                        }}
                        type="text"
                    />

                    <LabeledInput
                        label="Organisation Name"
                        placeholder="Name"
                        onChange={(e) => {
                            setJobInputs({
                                ...jobInputs,
                                org: e.target.value
                            })
                        }}
                        type="text"
                    />

                    <label className="block mb-1 text-sm font-medium">Location:</label>
                    <select
                        onChange={(e) => {
                            setJobInputs({
                                ...jobInputs,
                                location: e.target.value
                            })
                        }}
                        className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-96 p-2.5"
                    >
                        <option value="">Select Location</option>
                        {countriesData.map((country, index) => (
                            <option key={index} value={country}>
                                {country}
                            </option>
                        ))}
                    </select>

                    <label className="block mb-1 text-sm font-medium">Description:</label>
                    <textarea
                        placeholder="Description"
                        className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-96 p-2.5"
                        onChange={(e) => {
                            setJobInputs({
                                ...jobInputs,
                                description: e.target.value
                            })
                        }}
                    />

                    <LabeledInput
                        label="Compensation"
                        placeholder="Compensation"
                        onChange={(e) => {
                            setJobInputs({
                                ...jobInputs,
                                compensation: e.target.value
                            })
                        }}
                        type="text"
                    />


                    <button
                        className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4"
                        onClick={submit}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};