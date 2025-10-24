"use client";

import React, { useEffect, useState } from "react";
import { usersApi, User } from "../api/users/users.api";
import UserTable from "./components/UserTable";
import UsersChart from "./components/UsersChart";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const data = await usersApi.getAll();
      setUsers(data);
    } catch (err) {
      console.error("Tải users thất bại:", err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) return <p className="text-center mt-10">Đang tải danh sách người dùng...</p>;

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800">Người dùng</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UsersChart users={users} />
        <div className="bg-white rounded-md shadow p-4">
          <h3 className="text-lg font-semibold mb-3">Tổng: {users.length} người dùng</h3>
        </div>
      </div>

      <section>
        <UserTable users={users} onRefresh={load} />
      </section>
    </main>
  );
}