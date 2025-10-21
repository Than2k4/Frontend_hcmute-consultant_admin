import { NextResponse } from "next/server";

export async function GET() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const endpoints = [
      "users",
      "questions",
      "posts",
      "answers",
      "departments"
    ];

    const results = await Promise.all(
      endpoints.map(async (ep) => {
        const res = await fetch(`${apiUrl}/${ep}`);
        const data = await res.json();
        return { [ep]: data.length ?? 0 };
      })
    );

    const merged = Object.assign({}, ...results);
    return NextResponse.json(merged);
  } catch (error) {
    console.error("❌ Dashboard fetch error:", error);
    return NextResponse.json({ message: "Lỗi lấy dữ liệu Dashboard" }, { status: 500 });
  }
}
