import axiosClient from "../../../lib/axiosClient";

export interface User {
  _id: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const usersApi = {
  // 🧩 Lấy tất cả user
  getAll: async (): Promise<User[]> => {
    const res = await axiosClient.get("/users");
    const raw = res.data?.data ?? [];
    return raw.map((u: any) => {
      const nameFromParts = `${(u.firstName ?? "").trim()} ${(u.lastName ?? "").trim()}`.trim();
      const name = u.name ?? (nameFromParts === "" ? undefined : nameFromParts);
      return { ...u, name };
    });
  },

  // 🧩 Lấy user theo ID
  getById: async (id: string): Promise<User | null> => {
    const res = await axiosClient.get(`/users/${id}`);
    const u = res.data?.data ?? null;
    if (!u) return null;
    const nameFromParts = `${(u.firstName ?? "").trim()} ${(u.lastName ?? "").trim()}`.trim();
    const name = u.name ?? (nameFromParts === "" ? undefined : nameFromParts);
    return { ...u, name };
  },

  // 🧩 Xóa user
  deleteUser: async (id: string): Promise<User | null> => {
    const res = await axiosClient.delete(`/users/${id}`);
    return res.data?.data ?? null;
  },

  // ✅ Thêm tư vấn viên mới (dành cho ADMIN)
  addConsultant: async (data: any): Promise<User> => {
    try {
      const res = await axiosClient.post("/users/add-consultant", data);
      return res.data?.data;
    } catch (err) {
      throw err; // 🔁 Ném lỗi ra để frontend xử lý
    }
  },
};
