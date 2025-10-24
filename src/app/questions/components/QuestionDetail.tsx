"use client";

import React from "react";
import { Question, questionsApi } from "@/app/api/questions/questions.api";

interface Props {
  question: Question;
  onClose: () => void;
  onRefresh: () => void;
  loading?: boolean;
}

export default function QuestionDetail({
  question,
  onClose,
  onRefresh,
  loading = false,
}: Props) {
  const handleDelete = async () => {
    if (!confirm("Xác nhận xóa câu hỏi này?")) return;
    try {
      await questionsApi.delete(question._id);
      onRefresh();
      onClose();
    } catch (err) {
      console.error("Xóa câu hỏi thất bại:", err);
      alert("Xóa thất bại. Kiểm tra console.");
    }
  };

  return (
    // 🔹 Không dùng fixed nữa — chuyển sang absolute để chỉ che phần form cha
    <div className="absolute inset-0 z-50 flex items-center justify-center">
      {/* Nền mờ nhẹ, click ra ngoài để đóng */}
      <div
        className="absolute inset-0 bg-black opacity-40"
        onClick={onClose}
      />
      {/* Hộp chi tiết */}
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 z-10">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-lg font-semibold">Chi tiết câu hỏi</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="space-y-2">
          <p><strong>Tiêu đề:</strong> {question.title}</p>
          <p><strong>Nội dung:</strong> <span className="whitespace-pre-line">{question.content}</span></p>
          {question.fileUrl && (
            <p>
              <strong>Tệp đính kèm:</strong>{" "}
              <a
                href={question.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Xem tệp
              </a>
            </p>
          )}
          <p><strong>Người hỏi:</strong> {question.user?.email || "—"}</p>
          <p><strong>Khoa:</strong> {question.department?.name || "—"}</p>
          <p><strong>Lĩnh vực:</strong> {question.field?.name || "—"}</p>
          <p>
            <strong>Ngày tạo:</strong>{" "}
            {question.createdAt
              ? new Date(question.createdAt).toLocaleString("vi-VN")
              : "—"}
          </p>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={handleDelete}
            disabled={loading}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Xóa
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
