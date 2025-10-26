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

// Chặn log lỗi 400–499 khỏi console (chỉ log lỗi server hoặc network)
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status >= 500 || !error.response) {
      console.error("API Error:", error);
    }
    return Promise.reject(error);
  }
);


export default axiosClient;
