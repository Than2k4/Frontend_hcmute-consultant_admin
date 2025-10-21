"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

export default function QuestionChart({ data }: { data: any }) {
  if (!data) return <p className="text-center text-gray-500">Đang tải dữ liệu...</p>;

  const monthData = data?.questionsByMonth?.map((m: any) => ({
    name: `${m._id.month}/${m._id.year}`,
    total: m.total,
  })) || [];

  const topFields = data?.topFields?.map((f: any) => ({
    name: f.fieldName || "Không rõ",
    total: f.total,
  })) || [];

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Biểu đồ đường */}
      <div className="bg-white p-4 rounded-2xl shadow">
        <h3 className="font-medium mb-2">📅 Câu hỏi theo tháng</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={monthData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="total" stroke="#6366f1" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Biểu đồ cột */}
      <div className="bg-white p-4 rounded-2xl shadow">
        <h3 className="font-medium mb-2">🏆 Top lĩnh vực nhiều câu hỏi</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={topFields}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
