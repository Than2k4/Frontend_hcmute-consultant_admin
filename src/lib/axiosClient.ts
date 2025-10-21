import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:9090",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken"); // 👈 đúng key
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // 👈 đúng format
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default axiosClient;
