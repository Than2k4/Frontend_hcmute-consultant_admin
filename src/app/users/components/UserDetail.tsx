"use client";

import React from "react";
import { User, usersApi } from "../../api/users/users.api";
import { Department } from "../../api/departments/departments.api";

interface Props {
  user: User;
  loading?: boolean;
  onClose: () => void;
  onRefresh: () => void;
  departments?: Department[]; // ✅ nhận danh sách khoa từ UserTable
}

export default function UserDetail({
  user,
  loading = false,
  onClose,
  onRefresh,
  departments = [],
}: Props) {
  // 🧩 Xử lý xóa user
  const handleDelete = async () => {
    if (!confirm("Xác nhận xóa người dùng vĩnh viễn?")) return;
    try {
      await usersApi.deleteUser(user._id);
      onRefresh();
      onClose();
    } catch (err) {
      console.error("Xóa user thất bại:", err);
      alert("Xóa thất bại. Kiểm tra console.");
    }
  };

  // 🧠 Lấy tên khoa từ ObjectId hoặc object
  const getDepartmentName = (dept: any) => {
    if (!dept) return "—";

    // ✅ Nếu dept là object (đã populate)
    if (typeof dept === "object" && dept.name) return dept.name;

    // ✅ Nếu dept là string (ObjectId), tìm trong danh sách departments
    if (typeof dept === "string") {
      const d = departments.find((dep) => dep._id === dept);
      return d ? d.name : dept; // nếu không tìm thấy thì hiển thị ID để debug
    }

    return "—";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Lớp phủ nền tối */}
      <div className="absolute inset-0 bg-black opacity-40" onClick={onClose} />

      {/* Hộp chi tiết người dùng */}
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-xl p-6 z-10">
        {/* Header */}
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold">Chi tiết người dùng</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            Đóng
          </button>
        </div>

        {/* Nội dung chi tiết */}
        <div className="mt-4 space-y-2 text-sm text-gray-800">
          <div>
            <strong>Tên:</strong> {user.fullName ?? "—"}
          </div>
          <div>
            <strong>Email:</strong> {user.email ?? "—"}
          </div>
          <div>
            <strong>Vai trò:</strong> {user.role ?? "—"}
          </div>
          <div>
            <strong>Khoa:</strong> {getDepartmentName(user.department)}
          </div>
          <div>
            <strong>ID:</strong> {user._id}
          </div>
          <div>
            <strong>Ngày tạo:</strong>{" "}
            {user.createdAt ? new Date(user.createdAt).toLocaleString() : "—"}
          </div>
          <div>
            <strong>Ngày cập nhật:</strong>{" "}
            {user.updatedAt ? new Date(user.updatedAt).toLocaleString() : "—"}
          </div>
        </div>

        {/* Nút hành động */}
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            disabled={loading}
          >
            Xóa
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
