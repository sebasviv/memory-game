import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: '',
  timeout: 80000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});