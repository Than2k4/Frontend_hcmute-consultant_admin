"use client";

import React from "react";
import { Post, postsApi } from "@/app/api/posts/posts.api";

interface Props {
  post: Post;
  onClose: () => void;
  onRefresh: () => void;
}

export default function PostDetail({ post, onClose, onRefresh }: Props) {
  const handleDelete = async () => {
    if (!confirm("Xác nhận xóa bài đăng này?")) return;
    try {
      await postsApi.delete(post._id);
      onRefresh();
      onClose();
    } catch (err) {
      console.error("Xóa thất bại:", err);
    }
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black opacity-40"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 z-10">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-lg font-semibold">Chi tiết bài đăng</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="space-y-2">
          <p><strong>Tiêu đề:</strong> {post.title}</p>
          <p>
            <strong>Nội dung:</strong>{" "}
            <span className="whitespace-pre-line">{post.content}</span>
          </p>

          {post.imageUrl && (
            <p>
              <strong>Ảnh:</strong>{" "}
              <a
                href={post.imageUrl}
                target="_blank"
                className="text-blue-600 hover:underline"
              >
                Xem ảnh
              </a>
            </p>
          )}

          {post.fileUrl && (
            <p>
              <strong>Tệp đính kèm:</strong>{" "}
              <a
                href={post.fileUrl}
                target="_blank"
                className="text-blue-600 hover:underline"
              >
                Xem tệp
              </a>
            </p>
          )}

          <p><strong>Người đăng:</strong> {post.user?.username || "-"}</p>
          <p><strong>Email:</strong> {post.user?.email || "-"}</p>
          <p>
            <strong>Ngày tạo:</strong>{" "}
            {new Date(post.createdAt).toLocaleString("vi-VN")}
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
