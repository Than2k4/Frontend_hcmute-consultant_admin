"use client";

import React, { useState } from "react";
import { User, usersApi } from "../../api/users/users.api";
import UserDetail from "./UserDetail";

interface Props {
  users: User[];
  onRefresh: () => void;
}

export default function UserTable({ users, onRefresh }: Props) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState<boolean>(false);

  const handleView = async (id: string) => {
    setLoadingUser(true);
    try {
      const u = await usersApi.getById(id);
      setSelectedUser(u);
    } catch (err) {
      console.error("Tải chi tiết user thất bại:", err);
      alert("Không thể tải chi tiết user.");
    } finally {
      setLoadingUser(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Xác nhận xóa người dùng vĩnh viễn?")) return;
    try {
      await usersApi.deleteUser(id);
      onRefresh();
    } catch (err) {
      console.error("Xóa người dùng thất bại:", err);
      alert("Xóa thất bại. Kiểm tra console.");
    }
  };

  return (
    <>
      <div className="bg-white rounded-md shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Tên</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Email</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Vai trò</th>
              <th className="px-4 py-2 text-right text-sm font-medium text-gray-500">Hành động</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((u) => (
              <tr key={u._id}>
                <td className="px-4 py-3 text-sm text-gray-700">{u.name ?? "—"}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{u.email ?? "—"}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{u.role ?? "—"}</td>
                <td className="px-4 py-3 text-sm text-gray-700 text-right space-x-2">
                  <button
                    onClick={() => handleView(u._id)}
                    className="inline-block px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                  >
                    Xem
                  </button>
                  <button
                    onClick={() => handleDelete(u._id)}
                    className="inline-block px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedUser && (
        <UserDetail
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onRefresh={() => {
            setSelectedUser(null);
            onRefresh();
          }}
          loading={loadingUser}
        />
      )}
    </>
  );
}