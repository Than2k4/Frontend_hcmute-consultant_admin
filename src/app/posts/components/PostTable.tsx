"use client";

import React, { useEffect, useState } from "react";
import { postsApi, Post } from "@/app/api/posts/posts.api";
import PostDetail from "./PostDetail";
import PostsChart from "./PostChart";

export default function PostTable() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(false);

  const loadPosts = async () => {
    setLoading(true);
    try {
      const data = await postsApi.getAll();
      setPosts(data);
    } catch (err) {
      console.error("Lỗi khi tải danh sách bài đăng:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc muốn xóa bài đăng này?")) return;
    try {
      await postsApi.delete(id);
      await loadPosts();
    } catch (err) {
      console.error("Lỗi khi xóa:", err);
    }
  };

  return (
    <div className="relative w-full">
      <h2 className="text-2xl font-semibold mb-4">Danh sách bài đăng</h2>
      <div className="mb-6">
        <PostsChart posts={posts} />
      </div>

      {loading ? (
        <p className="text-gray-500">Đang tải...</p>
      ) : posts.length === 0 ? (
        <p className="text-gray-500 text-center">Không có bài đăng nào.</p>
      ) : (
        <table className="w-full border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Tiêu đề</th>
              <th className="p-3">Người đăng</th>
              <th className="p-3">Ngày tạo</th>
              <th className="p-3 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((p) => (
              <tr key={p._id} className="border-t hover:bg-gray-50">
                <td className="p-3">{p.title}</td>
                <td className="p-3">{p.user?.username || "-"}</td>
                <td className="p-3">
                  {new Date(p.createdAt).toLocaleString("vi-VN")}
                </td>
                <td className="p-3 text-center space-x-2">
                  <button
                    onClick={() => setSelectedPost(p)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Xem
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
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

      {/* Modal chi tiết */}
      {selectedPost && (
        <PostDetail
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
          onRefresh={loadPosts}
        />
      )}
    </div>
  );
}
