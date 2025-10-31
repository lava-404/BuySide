'use client';

import { useEffect, useState } from "react";
import RevenueChart from "../../components/RevenueChart";
import ReturningRateChart from "../../components/ReturningRateChart";

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  inventory: number;
  image?: string;
}

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("❌ Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);

  // 📊 Derived stats from DB
  const totalProducts = products.length;
  const totalInventory = products.reduce((sum, p) => sum + p.inventory, 0);
  const totalValue = products.reduce((sum, p) => sum + p.price * p.inventory, 0);
  const avgPrice =
    products.length > 0
      ? (products.reduce((sum, p) => sum + p.price, 0) / products.length).toFixed(2)
      : 0;

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="p-6 xl:container xl:mx-auto space-y-8">
      {/* 🧠 Header */}
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">
          Dashboard
        </h1>
        <div className="flex items-center space-x-2">
          <input
            placeholder="Search product..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-400 rounded-md px-3 py-2 text-sm w-64 focus:outline-none"
          />
        </div>
      </div>

      {/* 🎉 Top Section - Congrats + Metrics */}
      <div className="grid gap-4 lg:grid-cols-12">
        {/* 🎊 Congratulations Card */}
        <div className="rounded-xl border bg-gray-50 py-6 md:col-span-12 lg:col-span-4 shadow-sm">
          <div className="px-6">
            <div className="text-2xl font-semibold">Congratulations Lavie! 🎉</div>
            <div className="text-sm text-gray-500">
              You’re the top seller of the month!
            </div>
          </div>
          <div className="px-6 mt-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold">
                  ₹{totalValue.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500">
                  <span className="text-green-600">+18%</span> from last month
                </div>
              </div>
              <button className="rounded-md border bg-white px-4 py-2 text-sm hover:bg-gray-100">
                View Sales
              </button>
            </div>
          </div>
        </div>

        {/* 📦 Stats */}
        <div className="md:col-span-12 lg:col-span-8">
          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
            {/* Monthly Revenue */}
            <div className="rounded-xl border bg-white shadow-sm">
              <div className="space-y-4 p-6">
                <div className="flex items-start justify-between">
                  <span className="text-sm text-gray-500">
                    Total Products
                  </span>
                  <span className="text-sm font-medium text-green-600">+5.4%</span>
                </div>
                <div className="text-3xl font-semibold">{totalProducts}</div>
              </div>
            </div>

            {/* Users */}
            <div className="rounded-xl border bg-white shadow-sm">
              <div className="space-y-4 p-6">
                <div className="flex items-start justify-between">
                  <span className="text-sm text-gray-500">Average Price</span>
                  <span className="text-sm font-medium text-emerald-700">+3.1%</span>
                </div>
                <div className="text-3xl font-semibold">₹{avgPrice}</div>
              </div>
            </div>

            {/* User Growth */}
            <div className="rounded-xl border bg-white shadow-sm">
              <div className="space-y-4 p-6">
                <div className="flex items-start justify-between">
                  <span className="text-sm text-gray-500">Inventory</span>
                  <span className="text-sm font-medium text-emerald-700">+7.2%</span>
                </div>
                <div className="text-3xl font-semibold">{totalInventory}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 💰 Revenue Charts */}
      <div className="space-y-4 xl:grid xl:grid-cols-2 xl:gap-4 xl:space-y-0">
        {/* Total Revenue */}
        <div className="rounded-xl border bg-white py-6 shadow-sm">
          <div className="px-6">
            <div className="font-semibold">Total Revenue</div>
            <div className="text-sm text-gray-500">Income this month</div>
            <div className="mt-3 flex gap-8 rounded-lg border p-4">
              <div className="flex flex-1 flex-col gap-1">
                <span className="text-xs uppercase text-gray-500">Online</span>
                <span className="text-lg font-medium">
                  ₹{(totalValue * 0.7).toLocaleString()}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <span className="text-xs uppercase text-gray-500">Offline</span>
                <span className="text-lg font-medium">
                  ₹{(totalValue * 0.3).toLocaleString()}
                </span>
              </div>
            </div>
            <div className="mt-10 aspect-video w-full bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-sm">
              <RevenueChart />
            </div>
          </div>
        </div>

        {/* Returning Rate */}
        <div className="rounded-xl border bg-white py-6 shadow-sm">
          <div className="px-6">
            <div className="text-sm text-gray-500">Returning Customers</div>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold">42%</div>
              <span className="rounded-md border px-2 py-0.5 text-xs text-green-600">
                +2.5%
              </span>
            </div>
            <div className="mt-6 aspect-video w-full bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-sm">
              <ReturningRateChart />
            </div>
          </div>
        </div>
      </div>

      {/* 🌍 Sales by Location */}
      <div className="grid gap-4 lg:grid-cols-12">
        <div className="rounded-xl border bg-white py-6 lg:col-span-6 xl:col-span-4 shadow-sm">
          <div className="px-6">
            <div className="font-semibold">Sales by Category</div>
            <div className="text-sm text-gray-500">Top-selling product categories</div>
          </div>

          <div className="px-6 mt-4 space-y-4">
            {Object.entries(
              products.reduce((acc: Record<string, number>, p) => {
                acc[p.category] = (acc[p.category] || 0) + p.price * p.inventory;
                return acc;
              }, {})
            ).map(([category, value]) => (
              <div key={category} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{category}</span>
                    <span className="rounded-md border px-2 py-0.5 text-xs text-green-500">
                      +5%
                    </span>
                  </div>
                  <div className="text-sm font-medium">₹{Math.round(value).toLocaleString()}</div>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="h-full bg-indigo-600"
                    style={{ width: `${Math.min((value / totalValue) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 📦 Product Table */}
      <div className="rounded-xl border bg-white shadow-sm mt-10">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">Recent Products</h2>
          <span className="text-sm text-gray-500">
            Showing {filtered.length} items
          </span>
        </div>

        <table className="w-full text-sm text-left">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2 text-right">Price</th>
              <th className="px-4 py-2 text-right">Inventory</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-12 h-12 object-cover rounded-md"
                  />
                </td>
                <td className="px-4 py-2 font-medium">{p.name}</td>
                <td className="px-4 py-2">{p.category}</td>
                <td className="px-4 py-2 text-right">₹{p.price}</td>
                <td className="px-4 py-2 text-right">{p.inventory}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
