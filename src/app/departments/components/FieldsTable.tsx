"use client";
export default function FieldsTable({ fields }: { fields: any[] }) {
  if (!fields?.length)
    return <p className="text-gray-500 text-sm">Chưa có lĩnh vực nào.</p>;

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-100 text-sm text-left">
          <th className="p-2">Tên lĩnh vực</th>
          <th className="p-2">ID</th>
        </tr>
      </thead>
      <tbody>
        {fields.map((f) => (
          <tr key={f._id} className="border-t hover:bg-gray-50">
            <td className="p-2">{f.name}</td>
            <td className="p-2 text-gray-500 text-xs">{f._id}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
