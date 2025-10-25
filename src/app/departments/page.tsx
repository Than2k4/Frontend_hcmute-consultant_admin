"use client";

import React, { useEffect, useState } from "react";
import { departmentsApi, Department } from "../api/departments/departments.api";
import DepartmentsTable from "./components/DepartmentsTable";
import DepartmentsChart from "./components/DepartmentsChart";

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const data = await departmentsApi.getAll();
      setDepartments(data);
    } catch (err) {
      console.error("❌ Lỗi khi tải danh sách khoa:", err);
      setDepartments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (loading)
    return <p className="text-center mt-10">Đang tải danh sách khoa...</p>;

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800">Quản lý Khoa</h1>

      {/* --- Khu vực thống kê --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DepartmentsChart /> {/* Thống kê tổng số khoa + lĩnh vực */}
      </div>

      {/* --- Khu vực bảng dữ liệu --- */}
      <section>
        <DepartmentsTable />
      </section>
    </main>
  );
}
