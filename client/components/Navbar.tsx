'use client'

import { showSignInAtom } from '@/atoms/atom';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { GoBell } from "react-icons/go";
import { useSetRecoilState } from 'recoil';
import { SignIn } from './SignIn';

export const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const router = useRouter()
    const token = sessionStorage.getItem('token')
    const setShowSignIn = useSetRecoilState(showSignInAtom)

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    function signIn() {
        setIsDropdownOpen(false)
        if (!token) setShowSignIn(true)
        else router.push('/admin')
    }

    return <nav className="shadow-xl">
        <div className='p-4 flex justify-between items-center w-3/4 m-auto'>
            <div className='flex jusify-center items-center'>
                <Link href={'/'}>
                    <img src="/logo.jpeg" alt="Logo" className="h-11 mr-10" />
                </Link>
                <div className='font-semibold'>
                    <button disabled className="mx-4 text-gray-400">Feed</button>
                    <button disabled className="mx-4 text-gray-400">Contacts</button>
                    <button
                        className="text-gray-500 mx-4"
                        onClick={() => router.push('/jobs')}
                    >
                        Jobs
                    </button>
                    <button disabled className="mx-4 text-gray-400">Messages</button>
                    <button disabled className="mx-4 text-gray-400">Updates</button>
                </div>
            </div>

            <div className="relative flex items-center justify-center">
                <GoBell className='mx-3 text-xl' />
                <button className="focus:outline-none" onClick={toggleDropdown}>
                    <img src="/userProfile.png" alt="User" className="h-10 w-10 rounded-full" />
                </button>

                {isDropdownOpen && (
                    <div className="absolute -mr-44 mt-40 w-48 bg-white rounded-lg shadow-lg z-10">
                        <ul className="py-1">
                            <li>
                                <button onClick={() => signIn()} className="w-full text-left px-4 py-2 hover:bg-gray-200">My Jobs</button>
                            </li>
                            <li>
                                <button
                                    className="w-full text-left px-4 py-2 hover:bg-gray-200"
                                    onClick={() => {
                                        sessionStorage.removeItem('token')
                                        alert("Logged out!")
                                        window.location.reload()
                                    }}
                                >
                                    Logout</button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
        <SignIn />
    </nav>
};