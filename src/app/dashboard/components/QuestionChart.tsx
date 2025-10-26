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
            <defs>
              <linearGradient id="colorGreen" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#34d399" stopOpacity={0.5} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              interval={0}
              tick={{ fontSize: 12 }}
              angle={-15}
              textAnchor="end"
              padding={{ left: 40, right: 40 }}
              height={60}
            />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="total"
              fill="url(#colorGreen)"
              radius={[8, 8, 0, 0]} // 👈 Bo tròn góc trên
            />
          </BarChart>
        </ResponsiveContainer>

      </div>
    </div>
  );
}
