import { API } from "./api"

export const AdminApi = {
    signUp : (payload:{name:string, email:string, role:string }) => {
        return API.post('/api/admin/signup', payload)
    },

    signIn: (payload:{email:string}) => {
        return API.post('/api/admin/signin', payload)
    }
}