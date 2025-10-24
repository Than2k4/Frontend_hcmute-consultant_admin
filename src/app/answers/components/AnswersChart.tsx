"use client";

import React, { useMemo } from "react";
import { Answer } from "@/app/api/answers/answers.api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  answers: Answer[];
  selectedYear: number | "all";
  setSelectedYear: (year: number | "all") => void;
}

export default function AnswersChart({
  answers,
  selectedYear,
  setSelectedYear,
}: Props) {
  const currentYear = new Date().getFullYear();

  // ✅ Danh sách năm: năm hiện tại và 10 năm trước
  const years = useMemo(() => {
    const list = [];
    for (let i = 0; i <= 10; i++) {
      list.push(currentYear - i);
    }
    return list;
  }, [currentYear]);

  // ✅ Lọc câu trả lời theo năm được chọn
  const filteredAnswers = useMemo(() => {
    if (selectedYear === "all") return answers;
    return answers.filter(
      (a) => new Date(a.createdAt).getFullYear() === selectedYear
    );
  }, [answers, selectedYear]);

  // ✅ Dữ liệu thống kê theo tháng
  const data = useMemo(() => {
    const months = Array.from({ length: 12 }, (_, i) => ({
      name: `T${i + 1}`,
      count: 0,
    }));
    filteredAnswers.forEach((a) => {
      const month = new Date(a.createdAt).getMonth();
      months[month].count++;
    });
    return months;
  }, [filteredAnswers]);

  return (
    <div className="bg-white shadow rounded-md p-4 text-gray-600">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold">Thống kê câu trả lời theo tháng</h3>

        <div className="flex items-center gap-2">
          <label htmlFor="year" className="text-sm">
            Năm:
          </label>
          <select
            id="year"
            className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
            value={selectedYear}
            onChange={(e) =>
              setSelectedYear(
                e.target.value === "all" ? "all" : Number(e.target.value)
              )
            }
          >
            <option value="all">Tất cả</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="text-sm mb-4">
        Tổng số câu trả lời: {filteredAnswers.length}
      </p>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#60a5fa" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
