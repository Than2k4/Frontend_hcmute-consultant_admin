"use client";

import React, { useState } from "react";
import { Question, questionsApi } from "@/app/api/questions/questions.api";
import QuestionDetail from "./QuestionDetail";

interface Props {
  questions: Question[];
  onRefresh: () => void;
}

export default function QuestionTable({ questions, onRefresh }: Props) {
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [loadingQuestion, setLoadingQuestion] = useState<boolean>(false);

  const handleView = async (id: string) => {
    setLoadingQuestion(true);
    try {
      const q = await questionsApi.getById(id);
      setSelectedQuestion(q);
    } catch (err) {
      console.error("Tải chi tiết câu hỏi thất bại:", err);
      alert("Không thể tải chi tiết câu hỏi.");
    } finally {
      setLoadingQuestion(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc muốn xóa câu hỏi này không?")) return;
    try {
      await questionsApi.delete(id);
      onRefresh();
    } catch (err) {
      console.error("Xóa câu hỏi thất bại:", err);
      alert("Xóa thất bại. Kiểm tra console.");
    }
  };

  if (!questions.length)
    return <p className="text-center text-gray-500">Không có câu hỏi nào.</p>;

  return (
    <>
      <div className="bg-white shadow rounded-md overflow-hidden">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="border p-3 text-left">Tiêu đề</th>
              <th className="border p-3 text-left">Người hỏi</th>
              <th className="border p-3 text-left">Khoa</th>
              <th className="border p-3 text-left">Lĩnh vực</th>
              <th className="border p-3 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((q) => (
              <tr key={q._id} className="hover:bg-gray-50">
                <td className="border p-3">{q.title}</td>
                <td className="border p-3">{q.user?.email || "-"}</td>
                <td className="border p-3">{q.department?.name || "-"}</td>
                <td className="border p-3">{q.field?.name || "-"}</td>
                <td className="border p-3 text-center space-x-2">
                  <button
                    onClick={() => handleView(q._id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Xem chi tiết
                  </button>
                  <button
                    onClick={() => handleDelete(q._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedQuestion && (
        <QuestionDetail
          question={selectedQuestion}
          onClose={() => setSelectedQuestion(null)}
          onRefresh={() => {
            setSelectedQuestion(null);
            onRefresh();
          }}
          loading={loadingQuestion}
        />
      )}
    </>
  );
}
