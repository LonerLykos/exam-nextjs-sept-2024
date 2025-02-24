import axios from "axios";

const baseUrlPublic = process.env.NEXT_PUBLIC_URL;

const axiosPublic = axios.create({
    baseURL: baseUrlPublic,
    headers: {}
})

export const allRoute = async <T, > (url: string) => {
    return await axiosPublic.get<T>(url);
}

export const logout = async () => {
    const {status} = await axiosPublic.post('/logout');
    return status;
}