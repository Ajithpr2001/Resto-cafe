import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: "https://zartek-task.vercel.app/api", 
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem("token");
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
api.interceptors.response.use(
  (response) => {
    return response; 
  },
  (error) => {

    console.log(error)
    return Promise.reject(error);
  }
);

export default api;
