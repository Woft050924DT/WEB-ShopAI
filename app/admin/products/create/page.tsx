"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateProductPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    slug: "",
    price: 0,
    category_id: "",
    brand_id: "",
    status: "draft",
    featured: false,
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = () => {
    console.log("CREATE:", form);
    router.push("/admin/products");
  };

  return (
    <div className="p-8 max-w-xl mx-auto bg-white rounded-xl shadow text-black">
      <h1 className="text-2xl font-bold mb-6">Thêm sản phẩm</h1>

      <div className="flex flex-col gap-3">
        <input
          name="name"
          placeholder="Tên sản phẩm"
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <input
          name="slug"
          placeholder="Slug"
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <input
          name="price"
          type="number"
          placeholder="Giá"
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <input
          name="category_id"
          placeholder="Category ID"
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <input
          name="brand_id"
          placeholder="Brand ID"
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <select
          name="status"
          onChange={handleChange}
          className="border p-3 rounded-lg"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>

        <label className="flex items-center gap-2 mt-2">
          <input type="checkbox" name="featured" onChange={handleChange} />
          Nổi bật
        </label>

        <button
          onClick={handleSubmit}
          className="bg-black text-white py-3 rounded-lg mt-4 hover:bg-gray-800"
        >
          Lưu
        </button>
      </div>
    </div>
  );
}