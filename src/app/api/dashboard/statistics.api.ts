import axiosClient from "@/lib/axiosClient";

export const statisticsApi = {
  getOverview: () => axiosClient.get("/statistics/overview"),
  getQuestions: () => axiosClient.get("/statistics/questions"),
  getAnswers: () => axiosClient.get("/statistics/answers"),
};
