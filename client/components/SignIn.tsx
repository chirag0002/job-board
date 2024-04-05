import { useRecoilState, useSetRecoilState } from "recoil";
import { useState } from "react";
import { showSignInAtom, showSignUpAtom } from "@/atoms/atom";
import { AdminApi } from "@/api/admin.api";
import { LabeledInput } from "./InputField";
import { SignUp } from "./SignUp";
import { useRouter } from "next/navigation";

export const SignIn = () => {
    const setShowSignUp = useSetRecoilState(showSignUpAtom)
    const [showSignIn, setShowSignIn] = useRecoilState(showSignInAtom)
    const [email, setEmail] = useState('')
    const router = useRouter()

    const submit = () => {
        AdminApi.signIn({ email }).then(res => {
            sessionStorage.setItem('token', res.data.token)
            setShowSignIn(false)
            alert(res.data.message)
            router.push('/admin')
        }).catch(err => {
            alert(err.response.data.message)
        })
    }

    function addUser() {
        setShowSignUp(true)
    }

    return (
        <div className="flex justify-center items-center h-screen" style={{ display: showSignIn ? 'block' : 'none' }}>
            <div className="bg-gray-200 bg-opacity-70 absolute inset-0 z-10 flex justify-center items-center">
                <div className="bg-white p-8 rounded-lg shadow-md relative">
                    <div
                        className="absolute top-4 right-4 font-bold rounded-full bg-gray-200 w-6 text-center cursor-pointer"
                        onClick={() => setShowSignIn(!showSignIn)}
                    >
                        x
                    </div>
                    <h2 className="text-lg font-semibold mb-4">Sign In</h2>
                    <LabeledInput
                        label="Email"
                        placeholder="Enter your email"
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                    />
                    <button
                        onClick={submit}
                        className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4"
                    >
                        Sign In
                    </button>
                    <p className="text-blue-500 mt-2">New User? <span className="underline cursor-pointer" onClick={addUser} >Add here</span></p>
                </div>
            </div>
            <SignUp />
        </div>
    );
};