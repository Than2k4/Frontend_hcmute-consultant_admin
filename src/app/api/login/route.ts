import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("👉 process.env.NEXT_PUBLIC_API_URL =", process.env.NEXT_PUBLIC_API_URL);

    // Dùng URL tuyệt đối, tránh localhost
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:9090";
    console.log("👉 URL gọi thực tế =", `${apiUrl}/auth/login`);

    const res = await fetch(`${apiUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("❌ Lỗi khi gọi API:", error);
    return NextResponse.json({ message: "Lỗi kết nối đến backend" }, { status: 500 });
  }
}
