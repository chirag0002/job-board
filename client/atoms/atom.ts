import { atom } from "recoil";

export interface Job {
    id: string;
    logo:string;
    title:string;
    location:string;
    org:string;
    compensation:string;
    description:string;
    admin: {
        name:string;
        role:string;
    }
}

interface Search{
    search:string;
    page:string;
    location:string;
}

export const jobsAtom = atom({
    key: "jobs",
    default: <Job[]>[]
})

export const searchInputAtom = atom({
    key: "searchInputAtom",
    default: <Search>{}
}) 

export const mockSearchInputAtom = atom({
    key: "mockSearchInputAtom",
    default: <Search>{
        search: "",
        page: "",
        location: ""
    }
}) 

export const myJobsAtom = atom ({
    key: "myJobs",
    default: <Job[]>[]
}) 

export const showSignInAtom = atom ({
    key: "showSignIn",
    default: false
})

export const showSignUpAtom = atom ({
    key: "showSignUp",
    default: false
})

export const showCreateJobAtom = atom ({
    key: "showCreateJob",
    default: false
})