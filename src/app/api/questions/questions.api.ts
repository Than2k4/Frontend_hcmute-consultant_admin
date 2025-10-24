import axiosClient from "../../../lib/axiosClient";

export interface Question {
  _id: string;
  title: string;
  content: string;
  fileUrl?: string;
  user?: { email?: string; role?: string };
  department?: { name?: string };
  field?: { name?: string };
  views?: number;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Các API tương ứng backend:
 * GET /questions       => Lấy tất cả câu hỏi
 * GET /questions/:id   => Lấy chi tiết 1 câu hỏi
 * DELETE /questions/:id => Xóa mềm (statusDelete=true)
 */
export const questionsApi = {
  getAll: async (): Promise<Question[]> => {
    const res = await axiosClient.get("/questions");
    return res.data?.data ?? [];
  },

  getById: async (id: string): Promise<Question | null> => {
    const res = await axiosClient.get(`/questions/${id}`);
    return res.data?.data ?? null;
  },

  delete: async (id: string): Promise<Question | null> => {
    const res = await axiosClient.delete(`/questions/${id}`);
    return res.data?.data ?? null;
  },
};
