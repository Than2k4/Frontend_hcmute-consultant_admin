"use client";

import React, { useMemo } from "react";
import { Post } from "@/app/api/posts/posts.api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface Props {
  posts: Post[];
}

export default function PostsChart({ posts }: Props) {
  // Gom nhóm bài đăng theo tháng
  const chartData = useMemo(() => {
    const months = Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      total: 0,
    }));

    posts.forEach((p) => {
      if (p.createdAt) {
        const date = new Date(p.createdAt);
        const month = date.getMonth(); // 0-11
        months[month].total += 1;
      }
    });

    return months.map((m) => ({
      name: `Tháng ${m.month}`,
      "Số bài": m.total,
    }));
  }, [posts]);

  return (
    <div className="bg-white shadow rounded-md p-4 text-gray-600">
      <h3 className="font-semibold mb-3">Thống kê bài đăng</h3>
      <p className="mb-4">Tổng số bài đăng: {posts.length}</p>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="Số bài" fill="#60a5fa" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
