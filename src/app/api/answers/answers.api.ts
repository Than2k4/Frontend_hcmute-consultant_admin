import axiosClient from "../../../lib/axiosClient";

export interface Answer {
  _id: string;
  title?: string;
  content: string;
  file?: string;
  question?: { _id: string; title: string };
  user?: { _id: string; username: string; email: string; role: string };
  roleConsultant: string;
  statusApproval: boolean;
  statusAnswer: boolean;
  createdAt: string;
  updatedAt: string;
}

export const answersApi = {
  async getAll(): Promise<Answer[]> {
    try {
      const res = await axiosClient.get("/answers");
      const data = res.data.data || [];
      // Lọc chỉ câu trả lời có statusAnswer = true
      return data.filter((a: Answer) => a.statusAnswer === true);
    } catch (error: any) {
      console.error("❌ Lỗi khi tải danh sách câu trả lời:", error);
      throw error;
    }
  },

  async getById(id: string): Promise<Answer> {
    try {
      const res = await axiosClient.get(`/answers/${id}`);
      return res.data.data;
    } catch (error: any) {
      console.error("❌ Lỗi khi tải chi tiết câu trả lời:", error);
      throw error;
    }
  },

  async delete(id: string): Promise<void> {
    try {
      await axiosClient.delete(`/answers/${id}`);
    } catch (error: any) {
      console.error("❌ Lỗi khi xóa câu trả lời:", error);
      throw error;
    }
  },
};
