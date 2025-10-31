'use client';

import { useEffect, useState } from 'react';
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Star,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FaEdit, FaTrash } from 'react-icons/fa';

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

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const router = useRouter();

  // 🧠 Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error('Unexpected API response:', data);
          setProducts([]);
        }
      } catch (err) {
        console.error('Fetch failed:', err);
      }
    };    
    fetchProducts();
  }, []);

  // 🔍 Filtered results
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete product');
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (product: Product) => {
    router.push(`/admin/edit/${product.id}`);
  };

  const handleAdd = () => {
    router.push('/admin/add');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'border-green-400 bg-green-50 text-green-800';
      case 'out of stock': return 'border-orange-400 bg-orange-50 text-orange-800';
      case 'closed for sale': return 'border-red-400 bg-red-50 text-red-800';
      default: return 'border-gray-400 bg-gray-50 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold">Products</h1>
          <button
            onClick={handleAdd}
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 flex items-center gap-2"
          >
            <Plus size={20} /> Add Product
          </button>
        </div>

        {/* Search & Filters */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
            <div className="relative w-full md:w-1/2">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <button className="md:hidden border p-2 rounded-md hover:bg-gray-50">
              <Filter size={20} />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">#</th>
                  <th className="px-4 py-3 text-left font-semibold">Product Name</th>
                  <th className="px-4 py-3 text-left font-semibold">Price</th>
                  <th className="px-4 py-3 text-left font-semibold hidden md:table-cell">Category</th>
                  <th className="px-4 py-3 text-left font-semibold hidden lg:table-cell">Stock</th>
                  <th className="px-4 py-3 text-left font-semibold hidden lg:table-cell">Slug</th>
                  <th className="px-4 py-3 text-left font-semibold">Status</th>
                  <th className="px-4 py-3 text-center font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product, index) => (
                    <tr
                      key={product.id}
                      className="border-b hover:bg-gray-50 transition cursor-pointer"
                      onClick={() => router.push(`/admin/${product.id}`)}
                    >
                      <td className="px-4 py-3">{index + 1}</td>
                      <td className="px-4 py-3 font-medium truncate">{product.name}</td>
                      <td className="px-4 py-3">₹{product.price}</td>
                      <td className="px-4 py-3 hidden md:table-cell text-muted-foreground">
                        {product.category}
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell text-muted-foreground">
                        {product.inventory}
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell text-muted-foreground">
                        {product.slug}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-block px-2 py-1 rounded text-xs font-semibold border capitalize ${getStatusColor(
                            product.inventory > 0
                              ? 'active'
                              : product.inventory === 0
                              ? 'out of stock'
                              : 'closed for sale'
                          )}`}
                        >
                          {product.inventory > 0
                            ? 'active'
                            : product.inventory === 0
                            ? 'out of stock'
                            : 'closed for sale'}
                        </span>
                      </td>
                      <td
                        className="px-4 py-3 text-center flex justify-center gap-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={() => handleEdit(product)}
                          className="p-1 hover:bg-gray-200 rounded text-blue-500"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-1 hover:bg-gray-200 rounded text-red-500"
                        >
                          <FaTrash />
                        </button>
                        <button className="p-1 hover:bg-gray-200 rounded">
                          <MoreVertical size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={8}
                      className="text-center py-6 text-gray-500 italic"
                    >
                      No products found 🥲
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-4 py-3 border-t flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              Showing {filteredProducts.length} product(s)
            </p>
            <div className="flex gap-2">
              <button className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50" disabled>
                Previous
              </button>
              <button className="px-3 py-1 border rounded hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
