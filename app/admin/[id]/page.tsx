'use client'

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { RiEdit2Line, RiDeleteBin6Line } from "react-icons/ri"

export default function ProductDetailsPage() {
  const { id } = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // 🔹 Fetch product by ID from API
  useEffect(() => {
    if (!id) return

    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`)
        const data = await res.json()

        if (!res.ok) {
          console.error("API Error:", data.error)
          setProduct(null)
          return
        }

        // ✅ Merge dummy attributes (for display only)
        setProduct({
          ...data,
          sizes: ["S", "M", "L", "XL"],
          colors: ["#1e3a8a", "#dc2626", "#16a34a", "#f59e0b"],
          brand: data.brand || "Urban Threads",
          sku: data.sku || `SKU-${(Array.isArray(id) ? id[0] : id).slice(0, 6).toUpperCase()}`,
          rating: 4.5,
          reviews: Math.floor(Math.random() * 200 + 20),
        })
      } catch (err) {
        console.error("Error fetching product:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  // 🔹 Handle Delete
  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this product?")) return
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" })
      if (res.ok) {
        alert("✅ Product deleted successfully")
        router.push("/admin")
      } else {
        alert("❌ Failed to delete product")
      }
    } catch (err) {
      console.error(err)
      alert("⚠️ Something went wrong")
    }
  }

  // 🔹 Loading / Empty States
  if (loading) return <div className="text-center mt-20">Loading product details...</div>
  if (!product) return <div className="text-center mt-20 text-gray-500">Product not found 😢</div>

  return (
    <div className="p-6 xl:container xl:mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-row items-start justify-between">
        <div className="space-y-2">
          <h1 className="text-xl font-semibold tracking-tight lg:text-2xl">{product.name}</h1>
          <div className="inline-flex flex-col gap-2 text-sm text-muted-foreground lg:flex-row lg:gap-4">
            <div><span className="font-semibold text-foreground">Category:</span> {product.category}</div>
            <div><span className="font-semibold text-foreground">Slug:</span> {product.slug}</div>
            <div><span className="font-semibold text-foreground">Inventory:</span> {product.inventory}</div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => router.push(`/admin/products/edit/${id}`)}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
          >
            <RiEdit2Line className="size-4" />
            <span className="hidden lg:inline">Edit</span>
          </button>
          <button
            onClick={handleDelete}
            className="inline-flex size-9 items-center justify-center rounded-md bg-red-500 text-white hover:bg-red-600"
          >
            <RiDeleteBin6Line className="size-4" />
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid gap-4 xl:grid-cols-3">
        {/* Product Image */}
        <div className="min-w-0 xl:col-span-1">
          <img
            className="aspect-square w-full rounded-lg border object-cover"
            src={product.image || "https://placehold.co/600x600?text=No+Image"}
            alt={product.name}
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6 xl:col-span-2">
          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <Stat label="Price" value={`₹${product.price}`} />
            <Stat label="Inventory" value={product.inventory} />
            <Stat label="Brand" value={product.brand} />
            <Stat label="Rating" value={`${product.rating} ⭐ (${product.reviews} reviews)`} />
          </div>

          {/* Sizes */}
          <div className="rounded-xl border bg-card p-6">
            <h3 className="mb-2 font-semibold">Available Sizes:</h3>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size: string) => (
                <div
                  key={size}
                  className="px-4 py-2 rounded-md border bg-white shadow-sm hover:bg-gray-100 cursor-pointer"
                >
                  {size}
                </div>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div className="rounded-xl border bg-card p-6">
            <h3 className="mb-2 font-semibold">Available Colors:</h3>
            <div className="flex flex-wrap gap-3">
              {product.colors.map((color: string, i: number) => (
                <div
                  key={i}
                  className="h-8 w-8 rounded-full border shadow-sm cursor-pointer"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="rounded-xl border bg-card p-6">
            <h3 className="mb-2 font-semibold">Description:</h3>
            <p className="text-muted-foreground">
              {product.description || "No description available."}
            </p>
          </div>

          {/* Meta Info */}
          <div className="rounded-xl border bg-muted p-4 text-sm text-gray-500">
            <div><strong>SKU:</strong> {product.sku}</div>
            <div><strong>Last Updated:</strong> {new Date(product.lastUpdated || Date.now()).toLocaleString()}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg border bg-muted p-4">
      <span className="text-sm text-gray-500">{label}</span>
      <div className="text-lg font-semibold mt-1">{value}</div>
    </div>
  )
}
