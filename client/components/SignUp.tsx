import { useRecoilState, useSetRecoilState } from "recoil";
import { LabeledInput } from "./InputField";
import { showSignInAtom, showSignUpAtom } from "@/atoms/atom";
import { useState } from "react";
import { AdminApi } from "@/api/admin.api";
import { useRouter } from "next/navigation";


interface Admin {
    name: string;
    email: string;
    role: string;
}

export const SignUp = () => {
    const [showSignUp, setShowSignUp] = useRecoilState(showSignUpAtom)
    const setShowSignIn = useSetRecoilState(showSignInAtom)
    const [userInputs, setUserInputs] = useState<Admin>({
        name: '',
        email: '',
        role: ''
    })
    const router = useRouter()

    const submit = () => {
        AdminApi.signUp(userInputs).then((res) => {
            sessionStorage.setItem("token", res.data.token)
            setShowSignUp(false)
            setShowSignIn(false)
            alert(res.data.message)
            router.push('/admin')
        }).catch((err) => {
            alert(err.response.data.message)
        })
    }

    return (
        <div className="flex justify-center items-center h-screen" style={{ display: showSignUp ? 'block' : 'none' }}>
            <div className="bg-gray-400 bg-opacity-70 absolute inset-0 z-10 flex justify-center items-center">
                <div className="relative bg-white p-8 rounded-lg shadow-md">
                    <div
                        className="absolute top-4 right-4 font-bold rounded-full bg-gray-200 w-6 text-center cursor-pointer"
                        onClick={() => {
                            setShowSignUp(!showSignUp)
                            setShowSignIn(false)
                        }}
                    >
                        x
                    </div>
                    <h2 className="text-lg font-semibold mb-4">Register</h2>

                    <LabeledInput
                        label="Name"
                        placeholder="John Doe"
                        onChange={(e) => {
                            setUserInputs({
                                ...userInputs,
                                name: e.target.value
                            })
                        }}
                        type="text"
                    />

                    <LabeledInput
                        label="Email"
                        placeholder="abc@gmail.com"
                        onChange={(e) => {
                            setUserInputs({
                                ...userInputs,
                                email: e.target.value
                            })
                        }}
                        type="text"
                    />

                    <LabeledInput
                        label="Role"
                        placeholder="Manager/CTO/CEO/HR/..."
                        onChange={(e) => {
                            setUserInputs({
                                ...userInputs,
                                role: e.target.value
                            })
                        }}
                        type="text"
                    />

                    <button
                        className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4"
                        onClick={submit}
                    >
                        Sign In
                    </button>
                </div>
            </div>
        </div>
    );
};