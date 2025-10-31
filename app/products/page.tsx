'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CiSearch } from "react-icons/ci";

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

export default function ProductCards() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const router = useRouter();

  // 🧠 Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProducts();
  }, []);

  // 🔍 Filter products when searchTerm changes
  useEffect(() => {
    const results = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(results);
  }, [searchTerm, products]);

  return (
    <div className="m-8 flex flex-col">
      {/* 🔍 Search Bar */}
      <div className="flex items-center justify-center mb-10">
        <div className="flex gap-2 items-center border border-neutral-400 w-full max-w-md rounded-full pl-3 pr-4 py-2 bg-white shadow-sm">
          <CiSearch size={20} className="text-gray-600" />
          <input
            className="text-sm p-2 w-full focus:outline-none"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* 🛍️ Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 p-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => router.push(`/products/${product.slug}?id=${product.id}`)}
              className="border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-all p-4 flex flex-col bg-white cursor-pointer hover:-translate-y-1"
            >
              <img
                src={product.image || "https://placehold.co/400x300?text=Product"}
                alt={product.name}
                className="rounded-md mb-4 h-48 w-full object-cover"
              />
              <h3 className="font-semibold text-lg">{product.name}</h3>
              <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                {product.description}
              </p>
              <div className="flex justify-between items-center mt-auto">
                <span className="font-bold text-blue-600">₹{product.price}</span>
                <span className="text-xs text-gray-500">{product.category}</span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            No matching products found 🥲
          </p>
        )}
      </div>
    </div>
  );
}
