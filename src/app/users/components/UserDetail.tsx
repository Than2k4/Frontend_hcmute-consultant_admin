"use client";

import React from "react";
import { User, usersApi } from "../../api/users/users.api";

interface Props {
  user: User;
  loading?: boolean;
  onClose: () => void;
  onRefresh: () => void;
}

export default function UserDetail({ user, loading = false, onClose, onRefresh }: Props) {
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-40" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-xl p-6 z-10">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold">Chi tiết người dùng</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            Đóng
          </button>
        </div>

        <div className="mt-4 space-y-2">
          <div>
            <strong>Tên:</strong> {user.name ?? "—"}
          </div>
          <div>
            <strong>Email:</strong> {user.email ?? "—"}
          </div>
          <div>
            <strong>Vai trò:</strong> {user.role ?? "—"}
          </div>
          <div>
            <strong>ID:</strong> {user._id}
          </div>
          <div>
            <strong>Ngày tạo:</strong> {user.createdAt ?? "—"}
          </div>
          <div>
            <strong>Ngày cập nhật:</strong> {user.updatedAt ?? "—"}
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            disabled={loading}
          >
            Xóa
          </button>
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}