"use client";

import React, { useEffect, useState } from "react";
import { questionsApi, Question } from "../api/questions/questions.api";
import QuestionTable from "./components/QuestionTable";
import QuestionsChart from "./components/QuestionsChart";

export default function QuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const data = await questionsApi.getAll();
      setQuestions(data);
    } catch (err) {
      console.error("Tải câu hỏi thất bại:", err);
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (loading)
    return <p className="text-center mt-10">Đang tải danh sách câu hỏi...</p>;

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800">Câu hỏi</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <QuestionsChart questions={questions} />
        <div className="bg-white rounded-md shadow p-4">
          <h3 className="text-lg font-semibold mb-3">
            Tổng: {questions.length} câu hỏi
          </h3>
        </div>
      </div>

      <section>
        <QuestionTable questions={questions} onRefresh={load} />
      </section>
    </main>
  );
}
