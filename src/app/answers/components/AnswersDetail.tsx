"use client";

import React from "react";
import { Answer, answersApi } from "@/app/api/answers/answers.api";

interface Props {
  answer: Answer;
  onClose: () => void;
  onRefresh: () => void;
}

export default function AnswersDetail({ answer, onClose, onRefresh }: Props) {
  const handleDelete = async () => {
    if (!confirm("Bạn có chắc muốn ẩn câu trả lời này?")) return;
    try {
      await answersApi.delete(answer._id);
      onRefresh();
      onClose();
    } catch (err) {
      console.error("Xóa câu trả lời thất bại:", err);
      alert("Xóa thất bại. Kiểm tra console.");
    }
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center">
      {/* Nền mờ nhẹ trong vùng form */}
      <div
        className="absolute inset-0 bg-black opacity-40"
        onClick={onClose}
      />

      {/* Hộp chi tiết */}
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-xl p-6 z-10">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold">Chi tiết câu trả lời</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="space-y-2">
          <p><strong>Người trả lời:</strong> {answer.user?.username ?? "—"}</p>
          <p><strong>Email:</strong> {answer.user?.email ?? "—"}</p>
          <p><strong>Vai trò:</strong> {answer.roleConsultant ?? "—"}</p>
          <p><strong>Thuộc câu hỏi:</strong> {answer.question?.title ?? "—"}</p>
          <p><strong>Trạng thái duyệt:</strong> {answer.statusApproval ? "Đã duyệt" : "Chưa duyệt"}</p>
          <p><strong>Hiển thị:</strong> {answer.statusAnswer ? "Có" : "Không"}</p>
          <p><strong>Nội dung:</strong></p>
          <div className="border rounded p-2 whitespace-pre-line text-gray-700">
            {answer.content ?? "—"}
          </div>
          {answer.file && (
            <p>
              <strong>Tệp đính kèm:</strong>{" "}
              <a
                href={answer.file}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Xem file
              </a>
            </p>
          )}
          <p>
            <strong>Ngày tạo:</strong>{" "}
            {answer.createdAt
              ? new Date(answer.createdAt).toLocaleString("vi-VN")
              : "—"}
          </p>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={handleDelete}
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
