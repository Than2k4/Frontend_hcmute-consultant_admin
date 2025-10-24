"use client";

import React from "react";
import { Question } from "@/app/api/questions/questions.api";

interface Props {
  questions: Question[];
}

export default function QuestionsChart({ questions }: Props) {
  return (
    <div className="bg-white shadow rounded-md p-4 text-gray-600">
      <h3 className="font-semibold mb-2">Thống kê câu hỏi</h3>
      <p>Tổng số câu hỏi: {questions.length}</p>
      {/* sau này có thể thêm biểu đồ Recharts */}
    </div>
  );
}
