"use client";
import { useState, useEffect } from "react";
import { departmentsApi } from "@/app/api/departments/departments.api";
import { Button } from "@/components/ui/button";

interface EditFieldModalProps {
  open: boolean;
  field: any | null;
  onClose: () => void;
  onUpdated: () => void;
}

export default function EditFieldModal({
  open,
  field,
  onClose,
  onUpdated,
}: EditFieldModalProps) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (field) setName(field.name || "");
  }, [field]);

  if (!open || !field) return null;

  const handleSubmit = async () => {
    if (!name.trim()) return alert("Vui lòng nhập tên lĩnh vực!");
    try {
      await departmentsApi.updateField(field._id, { name });
      onUpdated();
      onClose();
    } catch (err) {
      console.error("❌ Lỗi khi cập nhật lĩnh vực:", err);
      alert("Cập nhật thất bại!");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-[380px] shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Chỉnh sửa lĩnh vực</h3>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tên lĩnh vực"
          className="border w-full px-3 py-2 rounded text-sm mb-4"
        />

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Hủy
          </Button>
          <Button onClick={handleSubmit}>Lưu</Button>
        </div>
      </div>
    </div>
  );
}
