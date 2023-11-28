import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: "http://localhost:5000/",
});

export default api;
