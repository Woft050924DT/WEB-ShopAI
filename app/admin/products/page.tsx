"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function ProductsPage() {
  const router = useRouter();

  // Fake categories & brands
  const categories = [
    { id: "c1", name: "Phone" },
    { id: "c2", name: "Laptop" },
  ];

  const brands = [
    { id: "b1", name: "Apple" },
    { id: "b2", name: "Samsung" },
  ];

  const [products, setProducts] = useState([
    {
      product_id: "1",
      name: "iPhone 15",
      slug: "iphone-15",
      price: 20000000,
      category_id: "c1",
      brand_id: "b1",
      status: "published",
    },
  ]);

  const handleDelete = (id: string) => {
    setProducts(products.filter((p) => p.product_id !== id));
  };

  return (
    <div className="p-6 bg-white min-h-screen text-black">
      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Products</h1>

        <button
          onClick={() => router.push("/admin/products/create")}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          ➕
        </button>
      </div>

      {/* TABLE */}
      <div className="border rounded-lg overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Slug</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Brand</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p.product_id} className="border-t hover:bg-gray-50">
                <td className="p-3">{p.product_id}</td>

                <td className="p-3 font-medium">{p.name}</td>

                <td className="p-3 text-gray-600">{p.slug}</td>

                {/* CATEGORY */}
                <td className="p-3">
                  {categories.find((c) => c.id === p.category_id)?.name || "N/A"}
                </td>

                {/* BRAND */}
                <td className="p-3">
                  {brands.find((b) => b.id === p.brand_id)?.name || "N/A"}
                </td>

                {/* PRICE */}
                <td className="p-3 text-green-600 font-semibold">
                  {p.price.toLocaleString()} đ
                </td>

                {/* STATUS */}
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      p.status === "published"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>


                {/* ACTION */}
                <td className="p-3 text-right space-x-2">
                  <button
                    onClick={() =>
                      router.push(`/admin/products/${p.product_id}`)
                    }
                    className="border px-3 py-1 rounded hover:bg-gray-100"
                  >
                    ✏️
                  </button>

                  <button
                    onClick={() => handleDelete(p.product_id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    🗑
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}