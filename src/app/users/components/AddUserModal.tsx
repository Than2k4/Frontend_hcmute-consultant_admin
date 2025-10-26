"use client";

import React, { useState, useEffect } from "react";
import axiosClient from "../../../lib/axiosClient";
import { usersApi } from "@/app/api/users/users.api";

interface Department {
  _id: string;
  name: string;
}

interface Props {
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddUserModal({ onClose, onSuccess }: Props) {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    department: "",
  });

  // ✅ Lấy danh sách khoa khi mở modal
  useEffect(() => {
    (async () => {
      try {
        const res = await axiosClient.get("/departments");
        setDepartments(res.data?.data || []);
      } catch (err) {
        console.error("Lỗi tải danh sách khoa:", err);
        alert("Không thể tải danh sách khoa. Kiểm tra console.");
      }
    })();
  }, []);

  // ✅ Xử lý thay đổi input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Gửi dữ liệu lên API add-consultant
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await usersApi.addConsultant(form)
      .then(() => {
        alert("✅ Đã thêm tư vấn viên thành công!");
        onSuccess();
      })
      .catch((err: any) => {
        alert(err.response?.data?.message || err.message || "Không thể thêm tư vấn viên.");
      })
      .finally(() => setLoading(false));
  };



  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <h2 className="text-lg font-semibold mb-4">Thêm tư vấn viên mới</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Họ
            </label>
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="Nhập họ"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tên
            </label>
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="Nhập tên"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="Nhập email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Số điện thoại
            </label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="Nhập số điện thoại (nếu có)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mật khẩu
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="Nhập mật khẩu"
            />
          </div>

          {/* ✅ Chọn khoa (department) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Khoa
            </label>
            <select
              name="department"
              value={form.department}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="">-- Chọn khoa --</option>
              {departments.map((d) => (
                <option key={d._id} value={d._id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-sm"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm disabled:opacity-50"
            >
              {loading ? "Đang lưu..." : "Thêm"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
