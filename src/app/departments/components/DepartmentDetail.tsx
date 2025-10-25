"use client";
import { useEffect, useState } from "react";
import { departmentsApi } from "@/app/api/departments/departments.api";
import { Button } from "@/components/ui/button";
import FieldsTable from "./FieldsTable";

export default function DepartmentDetail({ department, onBack }: any) {
  const [detail, setDetail] = useState<any>(null);

  const fetchDetail = async () => {
    const res = await departmentsApi.getById(department._id);
    setDetail(res.data?.data);
  };

  useEffect(() => {
    if (department) fetchDetail();
  }, [department]);

  if (!detail) return <p>Đang tải chi tiết khoa...</p>;

  return (
    <div className="p-4 bg-white rounded-2xl shadow">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">{detail.name}</h2>
        <Button size="sm" variant="outline" onClick={onBack}>
          ← Quay lại
        </Button>
      </div>
      <p className="text-gray-600 mt-2">{detail.description}</p>

      <div className="mt-4">
        <h3 className="font-semibold mb-2">Danh sách lĩnh vực</h3>
        <FieldsTable fields={detail.fields} />
      </div>
    </div>
  );
}
