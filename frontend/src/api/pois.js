import axios from "axios";

const baseURL = "http://localhost:4000";

export const api = axios.create({
    baseURL: baseURL
})

export const getPois = async () => {
    const response = await api.get('/get-pois')
    return response.data
}