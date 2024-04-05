'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { RecoilRoot } from 'recoil'

export const Main = ({ children }: { children: React.ReactNode }) => {
    const token = sessionStorage.getItem('token')
    const router = useRouter()
    useEffect(() => {
        if (!token) {
            router.push('/')
        }
    }, [])
    return <RecoilRoot>
        {children}
    </RecoilRoot>
}
