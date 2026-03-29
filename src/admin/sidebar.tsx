"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const menu = [
    // Dashboard
    { name: "Dashboard", href: "/admin" },

    // User
    { name: "Users", href: "/admin/Users" },
    { name: "Addresses", href: "/admin/addresses" },

    // Product
    { name: "Products", href: "/admin/products" },
    { name: "Categories", href: "/admin/categories" },
    { name: "Brands", href: "/admin/brands" },
    { name: "Variants", href: "/admin/variants" },
    { name: "Inventory", href: "/admin/inventory" },

    // Order
    { name: "Orders", href: "/admin/orders" },
    { name: "Payments", href: "/admin/payments" },

    // Marketing
    { name: "Coupons", href: "/admin/coupons" },
    { name: "Reviews", href: "/admin/reviews" },

    // Chat & AI
    { name: "Conversations", href: "/admin/conversations" },
    { name: "AI Chat", href: "/admin/ai" },
  ];

  return (
    <aside className="w-64 h-screen bg-[#1F2937] text-white p-5 fixed overflow-y-auto">
      <h2 className="text-2xl font-bold mb-8 text-center text-green-400">
        ADMIN
      </h2>

      <ul className="space-y-2">
        {menu.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`block px-4 py-2 rounded-lg text-sm transition ${
                pathname === item.href
                  ? "bg-[#EF3D32] text-white"
                  : "hover:bg-gray-700"
              }`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}