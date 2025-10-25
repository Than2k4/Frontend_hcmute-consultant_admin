import axiosClient from "@/lib/axiosClient";

export interface Field {
  _id: string;
  name: string;
  department: string;
  createdAt?: string;
}

export interface Department {
  logo: string;
  _id: string;
  name: string;
  description?: string;
  fields?: Field[];
  createdAt?: string;
}

export const departmentsApi = {
  // ✅ Lấy tất cả khoa (kèm danh sách field)
  async getAll(): Promise<Department[]> {
    const res = await axiosClient.get("/departments");
    return res.data.data || [];
  },

  // ✅ Lấy chi tiết khoa (nếu cần reload riêng)
  async getById(id: string): Promise<Department> {
    const res = await axiosClient.get(`/departments/${id}`);
    return res.data.data;
  },

  // ✅ Thêm mới khoa
  async createDepartment(data: { name: string; description?: string }) {
    const res = await axiosClient.post("/departments", data);
    return res.data.data;
  },

  // ✅ Xóa khoa
  async deleteDepartment(id: string) {
    await axiosClient.delete(`/departments/${id}`);
  },

  // ✅ Thêm mới field cho khoa
  async createField(departmentId: string, name: string) {
    const res = await axiosClient.post("/departments/field", {
      name,
      department: departmentId,
    });
    return res.data.data;
  },

  // ✅ Xóa field
  async deleteField(id: string) {
    await axiosClient.delete(`/departments/field/${id}`);
  },

  // ✅ Cập nhật khoa
  async updateDepartment(
    id: string,
    data: { name?: string; description?: string; logo?: string }
  ) {
    const res = await axiosClient.patch(`/departments/${id}`, data);
    return res.data.data;
  },

  async updateField(id: string, data: { name?: string }) {
  const res = await axiosClient.patch(`/departments/field/${id}`, data);
  return res.data.data;
},
};
