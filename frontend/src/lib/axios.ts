// apiClient.ts
import axios from "axios";

const endpoint = process.env.NEXT_PUBLIC_BACKEND_URL;

const apiClient = axios.create({
  baseURL: endpoint,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default apiClient;


