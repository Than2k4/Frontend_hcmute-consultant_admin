import { redirect } from "next/navigation";

export default function Home() {
  // Khi người dùng vào "/", tự động chuyển sang "/dashboard"
  redirect("/login");
}
