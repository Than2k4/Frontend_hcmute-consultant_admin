"use client";

import { useEffect, useState } from "react";
import { statisticsApi } from "../api/dashboard/statistics.api";
import OverviewCards from "./components/OverviewCards";
import QuestionChart from "./components/QuestionChart";
import AnswerChart from "./components/AnswerChart";

export default function DashboardPage() {
  const [overview, setOverview] = useState<any>(null);
  const [questions, setQuestions] = useState<any>(null);
  const [answers, setAnswers] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [ov, qs, as] = await Promise.all([
          statisticsApi.getOverview(),
          statisticsApi.getQuestions(),
          statisticsApi.getAnswers(),
        ]);

        // ✅ Lấy đúng trường `data` thực tế từ API
        setOverview(ov.data.data);
        setQuestions(qs.data.data);
        setAnswers(as.data.data);
      } catch (err) {
        console.error("Lỗi tải thống kê:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <p className="text-center mt-10">Đang tải dữ liệu...</p>;

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        📊 Thống kê tổng quan hệ thống
      </h1>

      {/* ✅ Hiển thị khi có dữ liệu */}
      {overview ? <OverviewCards data={overview} /> : <p>Không có dữ liệu tổng quan.</p>}

      {questions && (
        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            🧩 Thống kê câu hỏi
          </h2>
          <QuestionChart data={questions} />
        </section>
      )}

      {answers && (
        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            💬 Thống kê câu trả lời
          </h2>
          <AnswerChart data={answers} />
        </section>
      )}
    </main>
  );
}
