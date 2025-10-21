"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#10b981", "#f43f5e"];

export default function AnswerChart({ data }: { data: any }) {
  // ✅ Tránh lỗi khi data chưa có
  if (!data) {
    return <p className="text-center text-gray-500">Đang tải dữ liệu...</p>;
  }

  const answerStatus = [
    { name: "Đã duyệt", value: data?.approvedAnswers ?? 0 },
    { name: "Chưa duyệt", value: data?.notApprovedAnswers ?? 0 },
  ];

  const topConsultants = data?.topConsultants ?? [];

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Biểu đồ tròn */}
      <div className="bg-white p-4 rounded-2xl shadow">
        <h3 className="font-medium mb-2">Tình trạng câu trả lời</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={answerStatus}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={(entry: any) =>
                `${entry.name}: ${(
                  ((entry.value ?? 0) /
                    (answerStatus[0].value + answerStatus[1].value || 1)) *
                  100
                ).toFixed(0)}%`
              }
            >
              {answerStatus.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Danh sách top tư vấn viên */}
      <div className="bg-white p-4 rounded-2xl shadow">
        <h3 className="font-medium mb-2">Top tư vấn viên</h3>
        <ul className="space-y-2">
          {topConsultants.length > 0 ? (
            topConsultants.map((c: any, i: number) => (
              <li
                key={i}
                className="flex justify-between border-b pb-1 text-gray-700"
              >
                <span>
                  #{i + 1} – {c.user?.firstName
                    ? `${c.user.firstName} ${c.user.lastName || ""}`
                    : "Không rõ"}
                </span>
                <span className="font-semibold text-indigo-600">
                  {c.total}
                </span>
              </li>
            ))
          ) : (
            <li className="text-gray-400">Không có dữ liệu</li>
          )}
        </ul>

        <p className="text-sm text-gray-500 mt-3">
          ⏱ Thời gian phản hồi TB:{" "}
          <span className="font-semibold text-green-600">
            {data?.avgResponseTime ?? 0} phút
          </span>
        </p>
      </div>
    </div>
  );
}
