"use client";
import { useState, useEffect } from "react";
import { departmentsApi, Department } from "@/app/api/departments/departments.api";
import { Button } from "@/components/ui/button";

interface EditDepartmentModalProps {
  open: boolean;
  department: Department | null;
  onClose: () => void;
  onUpdated: () => void;
}

export default function EditDepartmentModal({
  open,
  department,
  onClose,
  onUpdated,
}: EditDepartmentModalProps) {
  const [form, setForm] = useState({ name: "", description: "", logo: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (department) {
      setForm({
        name: department.name || "",
        description: department.description || "",
        logo: department.logo || "",
      });
    }
  }, [department]);

  if (!open || !department) return null;

  const handleSubmit = async () => {
    if (!form.name.trim()) return alert("Vui lòng nhập tên khoa!");
    setSubmitting(true);
    try {
      await departmentsApi.updateDepartment(department._id, form);
      onUpdated();
      onClose();
    } catch (err) {
      console.error("❌ Lỗi khi cập nhật khoa:", err);
      alert("Cập nhật khoa thất bại!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-[400px] shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Chỉnh sửa khoa</h3>

        <div className="space-y-3 text-center">
          <input
            type="text"
            placeholder="Tên khoa"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border w-full px-3 py-2 rounded text-sm"
          />
          <input
            type="text"
            placeholder="Mô tả"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="border w-full px-3 py-2 rounded text-sm"
          />
          <input
            type="text"
            placeholder="URL logo (tùy chọn)"
            value={form.logo}
            onChange={(e) => setForm({ ...form, logo: e.target.value })}
            className="border w-full px-3 py-2 rounded text-sm"
          />
          {form.logo && (
            <div className="flex justify-center mt-3">
              <img
                src={form.logo}
                alt="preview"
                className="w-24 h-24 object-cover rounded-full border-2 border-gray-300 shadow-sm"
              />
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 mt-5">
          <Button variant="outline" onClick={onClose}>
            Hủy
          </Button>
          <Button onClick={handleSubmit} disabled={submitting}>
            {submitting ? "Đang lưu..." : "Lưu thay đổi"}
          </Button>
        </div>
      </div>
    </div>
  );
}
