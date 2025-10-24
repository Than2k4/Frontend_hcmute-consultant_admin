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

/**
 * NOTE:
 * - Endpoint giả sử: GET /users => { data: [...] }
 * - Backend hiện tại xóa vĩnh viễn khi gọi DELETE /users/:id
 */
export const usersApi = {
  getAll: async (): Promise<User[]> => {
    const res = await axiosClient.get("/users");
    const raw = res.data?.data ?? [];
    // map để đảm bảo luôn có trường `name`
    return raw.map((u: any) => {
      const nameFromParts = `${(u.firstName ?? "").trim()} ${(u.lastName ?? "").trim()}`.trim();
      const name = u.name ?? (nameFromParts === "" ? undefined : nameFromParts);
      return { ...u, name };
    });
  },

  getById: async (id: string): Promise<User | null> => {
    const res = await axiosClient.get(`/users/${id}`);
    const u = res.data?.data ?? null;
    if (!u) return null;
    const nameFromParts = `${(u.firstName ?? "").trim()} ${(u.lastName ?? "").trim()}`.trim();
    const name = u.name ?? (nameFromParts === "" ? undefined : nameFromParts);
    return { ...u, name };
  },

  deleteUser: async (id: string): Promise<User | null> => {
    const res = await axiosClient.delete(`/users/${id}`);
    return res.data?.data ?? null;
  },
};