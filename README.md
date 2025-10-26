# 🎓 HCMUTE Consultant Admin Dashboard

License: MIT  
Build Status: ✅ Stable  
Stars: ⭐⭐⭐⭐  

Một hệ thống **quản lý tư vấn sinh viên** được phát triển dành riêng cho Trường Đại học Sư phạm Kỹ thuật TP.HCM (HCMUTE).  
Ứng dụng cung cấp nền tảng giúp **quản trị viên, tư vấn viên và người dùng** tương tác, đặt câu hỏi, trả lời, và theo dõi thống kê học thuật.

---

## 🖼️ Project Banner
*(Ví dụ: thêm ảnh minh họa UI vào thư mục `public/banner.png`)*

![HCMUTE Dashboard](./public/banner.png)

---

## 📑 Table of Contents
- [Overview](#-overview)
- [Key Features](#-key-features)
- [User Workflow](#-user-workflow)
- [Tech Stack](#-tech-stack)
- [Installation Guide](#️-installation-guide)
- [Usage](#-usage)
- [Author](#-author)

---

## 📌 Overview
Hệ thống **HCMUTE Consultant Admin** được xây dựng nhằm **số hóa hoạt động tư vấn sinh viên** — bao gồm quản lý người dùng, câu hỏi, câu trả lời, bài viết, lĩnh vực và phòng ban.  
Dự án giúp **ban quản lý và tư vấn viên** dễ dàng nắm bắt nhu cầu sinh viên, theo dõi dữ liệu và nâng cao hiệu quả hỗ trợ.

---

## ✨ Key Features

### 👨‍💼 Dành cho Quản trị viên
- Quản lý **User**, **Consultant**, **Câu hỏi**, **Câu trả lời**, **Bài viết**, **Phòng ban**, **Lĩnh vực**.
- Dashboard hiển thị thống kê tổng quan theo thời gian thực.
- Quản lý quyền truy cập và xác thực người dùng (JWT).

### 🧑‍🏫 Dành cho Tư vấn viên
- Trả lời câu hỏi được giao.
- Quản lý thông tin cá nhân và bài viết chuyên môn.

### 🎓 Dành cho Sinh viên / Người dùng
- Đặt câu hỏi, đọc bài viết, xem thông tin lĩnh vực.
- Theo dõi phản hồi và tương tác với tư vấn viên.

---

## 🔄 User Workflow

1. **Đăng nhập / Xác thực:** Người dùng đăng nhập với quyền tương ứng.  
2. **Đặt câu hỏi:** Sinh viên gửi câu hỏi thuộc lĩnh vực cụ thể.  
3. **Phân công tư vấn viên:** Câu hỏi được chuyển đến người phù hợp.  
4. **Trả lời & đăng bài:** Tư vấn viên phản hồi và chia sẻ bài viết hữu ích.  
5. **Thống kê & Quản lý:** Admin giám sát hoạt động toàn hệ thống qua Dashboard.

---

## 🧰 Tech Stack

| **Mảng** | **Công nghệ sử dụng** |
|-----------|------------------------|
| **Frontend Framework** | [Next.js 14](https://nextjs.org/) |
| **Ngôn ngữ** | [TypeScript](https://www.typescriptlang.org/) |
| **UI Framework** | [TailwindCSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/) |
| **Chart & Visualization** | [Recharts](https://recharts.org/) |
| **HTTP Client** | [Axios](https://axios-http.com/) |
| **Icons** | [Lucide React](https://lucide.dev/icons) |
| **Font** | [Geist Font](https://vercel.com/fonts/geist) |
| **State Management** | React Hooks / Context API |
| **Auth Integration** | JWT Token (localStorage) |

---

## ⚙️ Installation Guide

### 1️⃣ Requirements
- Node.js ≥ 18  
- npm / yarn / pnpm  
- Backend API (NestJS) đang chạy tại `http://localhost:9090`

---

### 2️⃣ Clone Repository

```bash
git clone https://github.com/Than2k4/Frontend_hcmute-consultant_admin.git
cd Frontend_hcmute-consultant_admin.git
```

---

### 3️⃣ Install Dependencies

```bash
npm install
# hoặc
yarn install
```

---

### 4️⃣ Configure Environment Variables

Tạo file `.env.local` trong thư mục gốc:

```env
NEXT_PUBLIC_API_URL=http://localhost:9090
```

---

### 5️⃣ Run Development Server

```bash
npm run dev
```

Truy cập:  
👉 http://localhost:3000

---


## 📜 License

This project is licensed under the **MIT License**.
