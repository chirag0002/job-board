'use client'

import { mockSearchInputAtom } from '@/atoms/atom'
import React from 'react'
import { CiSearch } from "react-icons/ci"
import { useSetRecoilState } from 'recoil'

export const SuggsestedSearches = () => {
    return <div className='w-3/4 m-auto mt-8'>
        <h1 className='text-sm text-center font-bold text-gray-400'>You can <span className='font-bold text-black'>Post a job</span> or <span className='font-bold text-black'>Post your resume</span></h1>
        <div className='my-8'>
            <h1>Suggested job searches</h1>
            <div className='flex justify-center flex-wrap p-5'>
                <Search input={"Founder"} />
                <Search input={"Founding Partner"} />
                <Search input={"Board Member"} />
                <Search input={"Entrepreneur in residence"} />
                <Search input={"Personal Assistant"} />
                <Search input={"Sales"} />
                <Search input={"Project Manager"} />
                <Search input={"Co-founder"} />
                <Search input={"Developer"} />
                <Search input={"Managing director"} />
            </div>
        </div>
    </div>
}


function Search({ input }: { input: string }) {
    const setMockSearchInput = useSetRecoilState(mockSearchInputAtom)
    return <div
        className='cursor-pointer border-2 border-gray-200 flex justify-center items-center bg-gray-100 shadow-xl w-fit rounded-full px-3 m-3'
        onClick={() => setMockSearchInput(prev => {
            return {
               ...prev,
                search: input
            }
        })}
    >
        <CiSearch />
        {input}
    </div>
}