// // utils/axiosInstance.ts
// import axios from 'axios';
// import { useAppSelector } from './reduxhook';

// const token = useAppSelector((state) => state.data.token);
// const axiosInstance = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_BACKEND_URL, // change if needed
//   withCredentials: true,
//   headers: {
//     'Content-Type': 'application/json',
//     'Authorization': `Bearer ${token}`
//   }
// });

// export default axiosInstance;
