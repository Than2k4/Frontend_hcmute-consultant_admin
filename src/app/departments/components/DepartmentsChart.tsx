"use client";

import React, { useEffect, useState } from "react";
import { departmentsApi } from "@/app/api/departments/departments.api";

interface Department {
  _id: string;
  name: string;
  fields?: { _id: string; name: string }[];
}

export default function DepartmentsChart() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDepartments = async () => {
      try {
        const data = await departmentsApi.getAll();
        setDepartments(data);
      } catch (error) {
        console.error("❌ Lỗi khi tải khoa:", error);
      } finally {
        setLoading(false);
      }
    };
    loadDepartments();
  }, []);

  if (loading)
    return (
      <div className="bg-white shadow rounded-md p-4 text-gray-600">
        <p>Đang tải thống kê...</p>
      </div>
    );

  // ✅ Tổng số lĩnh vực
  const totalFields = departments.reduce(
    (acc, dept) => acc + (dept.fields?.length || 0),
    0
  );

  // ✅ Tìm khoa có nhiều / ít lĩnh vực nhất
  const sortedByFields = [...departments].sort(
    (a, b) => (b.fields?.length || 0) - (a.fields?.length || 0)
  );
  const mostFields = sortedByFields[0];
  const leastFields = sortedByFields[sortedByFields.length - 1];

  return (
    <div className="bg-white shadow rounded-md p-4 text-gray-700">
      <h3 className="font-semibold mb-4 text-blue-600 text-lg">
        📊 Thống kê Khoa & Lĩnh vực
      </h3>

      {/* 🧭 Chia 2 cột */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Cột trái: Tổng quan */}
        <div className="space-y-1 border-r border-gray-200 pr-4">
          <p>
            Tổng số khoa: <strong>{departments.length}</strong>
          </p>
          <p>
            Tổng số lĩnh vực: <strong>{totalFields}</strong>
          </p>
          <p>
            Trung bình mỗi khoa có{" "}
            <strong>
              {(totalFields / (departments.length || 1)).toFixed(1)}
            </strong>{" "}
            lĩnh vực.
          </p>
        </div>

        {/* Cột phải: Top / Bottom */}
        <div className="space-y-2 pl-4 text-sm">
          <p>
            🏆 <strong>Khoa có nhiều lĩnh vực nhất:</strong>{" "}
            {mostFields?.name || "—"}{" "}
            <span className="text-blue-600 font-medium">
              ({mostFields?.fields?.length || 0} lĩnh vực)
            </span>
          </p>
          <p>
            📉 <strong>Khoa có ít lĩnh vực nhất:</strong>{" "}
            {leastFields?.name || "—"}{" "}
            <span className="text-red-500 font-medium">
              ({leastFields?.fields?.length || 0} lĩnh vực)
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
