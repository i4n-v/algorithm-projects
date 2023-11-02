import axios, { AxiosInstance } from "axios";


const api: AxiosInstance = axios.create({
    headers: {
        "Content-Type": "application/json",
    },
    baseURL: "https://1adb-177-223-26-209.ngrok-free.app/",
});

export default api;