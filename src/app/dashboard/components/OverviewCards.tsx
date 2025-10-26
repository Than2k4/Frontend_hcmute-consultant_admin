"use client";

export default function OverviewCards({ data }: { data: any }) {
  // Nếu data chưa có (đang loading), tránh crash
  if (!data) {
    return <p className="text-center text-gray-500">Đang tải dữ liệu tổng quan...</p>;
  }

  const items = [
    { label: "👥 Tổng User", value: data.totalUsers ?? 0 },
    { label: "🧑‍💻 Tư vấn viên", value: data.totalConsultants ?? 0 },
    { label: "❓ Câu hỏi", value: data.totalQuestions ?? 0 },
    { label: "💬 Câu trả lời", value: data.totalAnswers ?? 0 },
    { label: "🚫 Chưa trả lời", value: data.unansweredQuestions ?? 0 },
    { label: "📰 Bài viết", value: data.totalPosts ?? 0 },
    { label: "📚 Lĩnh vực", value: data.totalFields ?? 0 },
    { label: "🏢 Phòng ban", value: data.totalDepartments ?? 0 },
    { label: "📈 Tỷ lệ trả lời", value: `${data.answeredRate ?? 0}%` },
    { label: "🗓️ Câu hỏi trong tháng", value: data.questionsThisMonth ?? 0 },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="p-4 bg-white rounded-2xl shadow border hover:shadow-md transition"
        >
          <p className="text-gray-500 text-sm">{item.label}</p>
          <p className="text-xl font-bold text-indigo-600">
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
}
