"use client";

import React, { useEffect, useMemo, useState } from "react";
import { answersApi, Answer } from "@/app/api/answers/answers.api";
import AnswersDetail from "./AnswersDetail";
import AnswersChart from "./AnswersChart";

export default function AnswersTable() {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selected, setSelected] = useState<Answer | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedYear, setSelectedYear] = useState<number | "all">("all"); // ✅ Thêm state lọc năm

  const loadAnswers = async () => {
    setLoading(true);
    try {
      const data = await answersApi.getAll();
      setAnswers(data);
    } catch (err) {
      console.error("Lỗi khi tải danh sách:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc muốn ẩn câu trả lời này?")) return;
    try {
      await answersApi.delete(id);
      await loadAnswers();
    } catch (err) {
      console.error("Lỗi khi xóa:", err);
    }
  };

  useEffect(() => {
    loadAnswers();
  }, []);

  // ✅ Lọc danh sách câu trả lời theo năm được chọn
  const filteredAnswers = useMemo(() => {
    if (selectedYear === "all") return answers;
    return answers.filter(
      (a) => new Date(a.createdAt).getFullYear() === selectedYear
    );
  }, [answers, selectedYear]);

  return (
    <div className="relative w-full">
      <h2 className="text-2xl font-semibold mb-4">Danh sách câu trả lời</h2>

      {/* ✅ Truyền selectedYear và setSelectedYear xuống biểu đồ */}
      <AnswersChart
        answers={answers}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
      />

      {loading ? (
        <p className="text-gray-500 mt-4">Đang tải...</p>
      ) : filteredAnswers.length === 0 ? (
        <p className="text-gray-500 text-center mt-4">
          {selectedYear === "all"
            ? "Không có câu trả lời nào."
            : `Không có câu trả lời nào trong năm ${selectedYear}.`}
        </p>
      ) : (
        <table className="w-full border border-gray-200 rounded-lg overflow-hidden shadow-sm mt-6">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Câu hỏi</th>
              <th className="p-3">Người trả lời</th>
              <th className="p-3">Vai trò</th>
              <th className="p-3">Ngày tạo</th>
              <th className="p-3 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredAnswers.map((a) => (
              <tr key={a._id} className="border-t hover:bg-gray-50">
                <td className="p-3">{a.question?.title || "-"}</td>
                <td className="p-3">{a.user?.username || "-"}</td>
                <td className="p-3">{a.roleConsultant}</td>
                <td className="p-3">
                  {new Date(a.createdAt).toLocaleString("vi-VN")}
                </td>
                <td className="p-3 text-center space-x-2">
                  <button
                    onClick={() => setSelected(a)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Xem chi tiết
                  </button>
                  <button
                    onClick={() => handleDelete(a._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selected && (
        <AnswersDetail
          answer={selected}
          onClose={() => setSelected(null)}
          onRefresh={loadAnswers}
        />
      )}
    </div>
  );
}
