import axios from "axios";

const baseUrlPublic = process.env.NEXT_PUBLIC_URL;

const axiosPublic = axios.create({
    baseURL: baseUrlPublic,
    headers: {}
})

export const allRoute = async (url: string) => {
    const {data} = await axiosPublic.get(url);

    return data;
}
