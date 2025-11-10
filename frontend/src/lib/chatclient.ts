import axios from "axios";

const endpoint = process.env.NEXT_PUBLIC_CHAT_URL;

const chatClient = axios.create({
  baseURL: endpoint,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default chatClient;
