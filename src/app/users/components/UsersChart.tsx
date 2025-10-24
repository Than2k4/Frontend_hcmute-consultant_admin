"use client";

import React from "react";
import { User } from "../../api/users/users.api";

interface Props {
  users: User[];
  year?: number; // mặc định là năm hiện tại
}

const VN_MONTHS = ["Thg 1","Thg 2","Thg 3","Thg 4","Thg 5","Thg 6","Thg 7","Thg 8","Thg 9","Thg 10","Thg 11","Thg 12"];

export default function UsersChart({ users, year }: Props) {
  const now = new Date();
  const targetYear = year ?? now.getFullYear();

  // count per month for targetYear
  const counts = new Array(12).fill(0);
  for (const u of users) {
    if (!u.createdAt) continue;
    const d = new Date(u.createdAt);
    if (isNaN(d.getTime())) continue;
    if (d.getFullYear() === targetYear) counts[d.getMonth()]++;
  }

  const max = Math.max(...counts, 1);
  const chartHeight = 180;
  const barGap = 8;
  const barWidth = 28;

  return (
    <div className="bg-white rounded-md shadow p-4">
      <h3 className="text-lg font-semibold mb-3">Người dùng tạo trong năm {targetYear}</h3>
      <div className="overflow-x-auto">
        <svg
          width={Math.max(12 * (barWidth + barGap), 400)}
          height={chartHeight + 40}
          className="w-full"
        >
          {/* Y grid and labels */}
          {[0, 0.25, 0.5, 0.75, 1].map((t, i) => {
            const y = 10 + chartHeight * (1 - t);
            const value = Math.round(max * t);
            return (
              <g key={i}>
                <line x1={40} x2="100%" y1={y} y2={y} stroke="#eee" strokeWidth={1} />
                <text x={8} y={y + 4} fontSize={10} fill="#666">{value}</text>
              </g>
            );
          })}

          {/* Bars */}
          {counts.map((c, idx) => {
            const x = 40 + idx * (barWidth + barGap);
            const h = (c / max) * chartHeight;
            const y = 10 + (chartHeight - h);
            return (
              <g key={idx} transform={`translate(${x},0)`}>
                <rect x={0} y={y} width={barWidth} height={h} rx={4} fill="#10b981" />
                <text x={barWidth / 2} y={y - 6} fontSize={11} fill="#111" textAnchor="middle">{c}</text>
                <text x={barWidth / 2} y={chartHeight + 28} fontSize={11} fill="#444" textAnchor="middle">
                  {VN_MONTHS[idx]}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}