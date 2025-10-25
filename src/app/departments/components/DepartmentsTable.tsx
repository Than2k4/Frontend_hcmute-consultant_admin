"use client";
import { useEffect, useState } from "react";
import { departmentsApi, Department } from "@/app/api/departments/departments.api";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, Plus, Trash } from "lucide-react";
import AddDepartmentModal from "./AddDepartmentModal";
import EditDepartmentModal from "./EditDepartmentModal";
import EditFieldModal from "./EditFieldModal";

export default function DepartmentsTable() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [newFieldName, setNewFieldName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingDept, setEditingDept] = useState<Department | null>(null);
  const [editingField, setEditingField] = useState<any | null>(null);


  const loadDepartments = async () => {
    setLoading(true);
    try {
      const data = await departmentsApi.getAll();
      setDepartments(data);
    } catch (err) {
      console.error("❌ Lỗi khi tải danh sách khoa:", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (id: string) => {
    setExpanded(expanded === id ? null : id);
  };

  const handleAddField = async (deptId: string) => {
    if (!newFieldName.trim()) return alert("Vui lòng nhập tên lĩnh vực!");
    try {
      await departmentsApi.createField(deptId, newFieldName);
      await loadDepartments();
      setNewFieldName("");
    } catch (err) {
      console.error("❌ Lỗi khi thêm lĩnh vực:", err);
    }
  };

  const handleDeleteDepartment = async (id: string) => {
    if (!confirm("Bạn có chắc muốn xóa khoa này?")) return;
    try {
      await departmentsApi.deleteDepartment(id);
      await loadDepartments();
    } catch (err) {
      console.error("❌ Lỗi khi xóa khoa:", err);
    }
  };

  const handleDeleteField = async (fieldId: string) => {
    if (!confirm("Bạn có chắc muốn xóa lĩnh vực này?")) return;
    try {
      await departmentsApi.deleteField(fieldId);
      await loadDepartments();
    } catch (err) {
      console.error("❌ Lỗi khi xóa lĩnh vực:", err);
    }
  };

  useEffect(() => {
    loadDepartments();
  }, []);

  return (
    <div className="p-4 bg-white rounded-2xl shadow">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold">Danh sách khoa</h2>
        <Button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1"
        >
          <Plus size={16} /> Thêm khoa
        </Button>
      </div>

      {loading ? (
        <p className="text-gray-500">Đang tải...</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-sm text-left">
              <th className="p-2">Tên khoa</th>
              <th className="p-2">Mô tả</th>
              <th className="p-2">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((d) => (
              <Fragment key={d._id}>
                <tr>
                  <td className="p-2 flex items-center gap-2 font-medium">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleExpand(d._id)}
                    >
                      {expanded === d._id ? <ChevronDown /> : <ChevronRight />}
                    </Button>
                    {d.name}
                  </td>
                  <td className="p-2">{d.description || "—"}</td>
                  <td className="p-2 flex gap-2">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteDepartment(d._id)}
                    >
                      <Trash size={16} />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingDept(d)}
                    >
                      ✏️
                    </Button>

                  </td>
                </tr>

                {expanded === d._id && (
                  <tr key={`${d._id}-fields`}>
                    <td colSpan={3} className="bg-gray-50 p-3">
                      <div className="ml-10">
                        <h4 className="font-semibold mb-2">Lĩnh vực:</h4>
                        {d.fields?.length ? (
                          <ul className="list-disc ml-6 text-sm text-gray-700">
                            {d.fields.map((f) => (
                              <li key={f._id} className="flex justify-between items-center">
                                <span>{f.name}</span>
                                <div className="flex gap-2 text-xs">
                                  <button
                                    onClick={() => setEditingField(f)}
                                    className="text-blue-500 hover:underline"
                                  >
                                    ✏️ Sửa
                                  </button>
                                  <button
                                    onClick={() => handleDeleteField(f._id)}
                                    className="text-red-500 hover:underline"
                                  >
                                    Xóa
                                  </button>
                                </div>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-gray-500 text-sm">
                            Chưa có lĩnh vực nào.
                          </p>
                        )}

                        <div className="flex items-center gap-2 mt-3">
                          <input
                            type="text"
                            value={newFieldName}
                            onChange={(e) => setNewFieldName(e.target.value)}
                            placeholder="Tên lĩnh vực mới..."
                            className="border px-2 py-1 rounded w-60 text-sm"
                          />
                          <Button
                            size="sm"
                            onClick={() => handleAddField(d._id)}
                            className="flex items-center gap-1"
                          >
                            <Plus size={14} /> Thêm
                          </Button>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      )}

      <AddDepartmentModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onAdded={loadDepartments}
      />
      <EditDepartmentModal
        open={!!editingDept}
        department={editingDept}
        onClose={() => setEditingDept(null)}
        onUpdated={loadDepartments}
      />
      <EditFieldModal
        open={!!editingField}
        field={editingField}
        onClose={() => setEditingField(null)}
        onUpdated={loadDepartments}
      />

    </div>
  );
}

import { Fragment } from "react";
