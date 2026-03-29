"use client";

import { useEffect, useState, ChangeEvent } from "react";

interface Brand {
  id: string;
  name: string;
  isActive: boolean;
}

export default function BrandAdminPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [newBrand, setNewBrand] = useState("");
  const [status, setStatus] = useState<"Active" | "Inactive">("Active");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const API_BASE = "http://localhost:5000/api/brands"; // đổi port nếu khác

  // ===== FETCH BRANDS =====
  const fetchBrands = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_BASE);
      const data = await res.json();
      const mapped: Brand[] = (data.brands || []).map((b: any) => ({
        id: b.id,
        name: b.name,
        isActive: b.isActive,
      }));
      setBrands(mapped);
    } catch (err) {
      alert("Không thể load thương hiệu");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  // ===== ADD / UPDATE =====
  const handleAddOrUpdate = async () => {
    if (!newBrand.trim()) return alert("Nhập tên thương hiệu");

    const payload = {
      name: newBrand.trim(),
      isActive: status === "Active",
    };

    try {
      let res;
      if (editingId) {
        res = await fetch(`${API_BASE}/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(API_BASE, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      const data = await res.json();
      if (!res.ok) return alert(data.message);

      // reset form
      setNewBrand("");
      setStatus("Active");
      setEditingId(null);
      fetchBrands();
    } catch (err: any) {
      alert(err.message);
    }
  };

  // ===== EDIT =====
  const handleEdit = (brand: Brand) => {
    setNewBrand(brand.name);
    setStatus(brand.isActive ? "Active" : "Inactive");
    setEditingId(brand.id);
  };

  // ===== SOFT DELETE / TOGGLE ACTIVE =====
  const handleToggleActive = async (brand: Brand) => {
    const confirmMsg = brand.isActive 
      ? "Bạn có chắc muốn ẩn thương hiệu này?" 
      : "Bạn có chắc muốn kích hoạt thương hiệu này?";
    if (!confirm(confirmMsg)) return;

    try {
      const res = await fetch(`${API_BASE}/${brand.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !brand.isActive, name: brand.name }),
      });
      const data = await res.json();
      if (!res.ok) return alert(data.message);
      fetchBrands(); // load lại danh sách
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen text-black">
      <h1 className="text-2xl font-bold mb-6">Quản lý thương hiệu</h1>

      {/* FORM ADD / EDIT */}
      <div className="bg-white border border-gray-300 rounded-xl p-4 flex flex-col md:flex-row gap-2 mb-6 shadow-sm">
        <input
          type="text"
          placeholder="Nhập tên thương hiệu..."
          value={newBrand}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setNewBrand(e.target.value)
          }
          className="border border-gray-300 p-2 rounded w-full"
        />

        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value as "Active" | "Inactive")
          }
          className="border border-gray-300 p-2 rounded w-full md:w-48"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <button
          onClick={handleAddOrUpdate}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 w-full md:w-auto"
        >
          {editingId ? "Cập nhật" : "➕ Thêm"}
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white border border-gray-300 rounded-xl p-2 shadow-sm">
        {loading ? (
          <p className="p-4 text-center text-gray-500">Đang tải...</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="p-2">ID</th>
                <th className="p-2">Tên</th>
                <th className="p-2">Trạng thái</th>
                <th className="p-2 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {brands.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-gray-500">
                    Chưa có thương hiệu nào
                  </td>
                </tr>
              ) : (
                brands.map((brand) => (
                  <tr key={brand.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-2">{brand.id}</td>
                    <td className="p-2">{brand.name}</td>
                    <td className="p-2">
                      <span
                        className={`px-2 py-1 rounded text-sm ${
                          brand.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {brand.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="p-2 text-right space-x-2">
                      <button
                        onClick={() => handleEdit(brand)}
                        className="px-3 py-1 border border-gray-400 rounded hover:bg-gray-100"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleToggleActive(brand)}
                        className={`px-3 py-1 rounded text-white ${
                          brand.isActive ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
                        }`}
                      >
                        {brand.isActive ? "Ẩn" : "Kích hoạt"}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}