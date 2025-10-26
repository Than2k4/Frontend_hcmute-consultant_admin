"use client";

export default function AnswerChart({ data }: { data: any }) {
  if (!data) {
    return <p className="text-center text-gray-500">Đang tải dữ liệu...</p>;
  }

  const topConsultants = data?.topConsultants ?? [];

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h3 className="font-medium mb-4 text-lg">Top tư vấn viên</h3>
      <ul className="space-y-2">
        {topConsultants.length > 0 ? (
          topConsultants.map((c: any, i: number) => (
            <li
              key={i}
              className="flex justify-between border-b pb-1 text-gray-700"
            >
              <span>
                #{i + 1} – {c.user?.fullName || "Không rõ"}
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

      <p className="text-sm text-gray-500 mt-4">
        ⏱ Thời gian phản hồi trung bình:{" "}
        <span className="font-semibold text-green-600">
          {data?.avgResponseTime ?? 0} phút
        </span>
      </p>
    </div>
  );
}
