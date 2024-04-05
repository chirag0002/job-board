import { API } from "./api"

export const jobApi = {
    createJob : (token:string, payload:{logo:string, title:string, location:string, org:string, compensation:string, description:string}) => {
        return API.post('/api/job/', payload, {
            headers: {
                "Authorization": token
            }
        })
    },

    getAllJobs: ({search, location, page}:{search?:string, location?:string, page?:string}) => {
        let queryString = '';

        if (search) queryString += `&search=${search}`;
        if (location) queryString += `&location=${location}`;
        if (page) queryString += `&page=${page}`;
        return API.get(`/api/job?${queryString}`);
    },

    getMyJobs: (token:string) => {
        return API.get('/api/job/myjobs', {
            headers: {
                "Authorization": token
            }
        })
    },

    getJob: (jobId:string) => {
        return API.get(`/api/job/${jobId}`)
    },

    updateJob : (jobId:string, payload:{title:string, location:string, org:string, compensation:string, description:string}, token:string) => {
        return API.put(`/api/job/${jobId}`, payload, {
            headers: {
                "Authorization": token
            }
        })
    },
    
    deleteJob: (jobId:string, token:string) => {
        return API.delete(`/api/job/${jobId}`, {
            headers: {
                "Authorization": token
            }
        })
    }
}