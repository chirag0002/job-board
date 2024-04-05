'use client'

import { jobApi } from '@/api/job.api';
import { jobsAtom, mockSearchInputAtom, searchInputAtom } from '@/atoms/atom';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { CiLocationOn } from "react-icons/ci";
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import countriesData from '../data/countries.data.json'

export const SearchBar = () => {
    const [mockSearchInput, setMockSearchInput] = useRecoilState(mockSearchInputAtom)
    const [searchInput, setSearchInput] = useRecoilState(searchInputAtom)
    const setJobs = useSetRecoilState(jobsAtom)
    const router = useRouter()

    function handleClick() {
        setSearchInput(prev => {
            return {
                ...prev,
                search: mockSearchInput.search,
                location: mockSearchInput.location
            }
        })

        router.push('/jobs');
    }

    useEffect(() => {
        jobApi.getAllJobs({ search: searchInput.search, location: searchInput.location, page: searchInput.page }).then(res => {
            setJobs(res.data.jobs)
        }).catch(err => {
            console.log(err)
        })
    }, [searchInput])

    return <div className=" relative my-2 mb-4 w-3/4 m-auto rounded-full flex justify-center items-center z-20 border-2 border-gray-200 p-2 bg-white">
        <button
            type="submit"
            className="p-2.5 text-sm font-medium h-full text-white bg-green-400 rounded-full border focus:outline-none"
            onClick={handleClick}
        >
            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
            <span className="sr-only">Search</span>
        </button>
        <input
            type="search"
            value={mockSearchInput.search}
            className="p-2.5 text-sm  outline-none w-3/4 font-bold text-gray-500"
            placeholder='Job title, keyword or company'
            onChange={(e) => setMockSearchInput(prev => {
                return {
                    ...prev,
                    search: e.target.value
                }
            })}
        />
        <div className="relative w-1/4">
            <CiLocationOn className="absolute top-1/2 transform -translate-y-1/2 left-2 text-xl text-gray-400" />
            <select
                className="cursor-pointer bg-gray-100 rounded-full py-2.5 pl-10 pr-4 w-full font-bold text-gray-500 outline-none appearance-none"
                value={mockSearchInput.location}
                onChange={(e) => setMockSearchInput(prev => {
                    return {
                        ...prev,
                        location: e.target.value
                    }
                })}
            >
                <option value="">Select Country</option>
                {countriesData.map((country, index) => (
                    <option key={index} value={country}>
                        {country}
                    </option>
                ))}
            </select>
        </div>
    </div>
}
