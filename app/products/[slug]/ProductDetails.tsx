"use client";

import { useState } from "react";
import { Heart, ShoppingCart, Star, Edit2, Trash2 } from "lucide-react";

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  inventory: number;
  image?: string;
  createdAt?: string;
  seller?: string;
}

export default function ProductDetails({ product }: { product: Product }) {
  const [selectedColor, setSelectedColor] = useState("card");
  const [selectedSize, setSelectedSize] = useState("md");
  const [currentImage, setCurrentImage] = useState(0);

  const colors = [
    { id: "card", name: "Green", bg: "bg-green-400" },
    { id: "paypal", name: "Indigo", bg: "bg-indigo-400" },
    { id: "apple", name: "Purple", bg: "bg-purple-400" },
  ];
  const sizes = ["sm", "md", "lg", "xl", "xxl"];

  const reviews = [
    {
      name: "Mark P.",
      rating: 3.2,
      title: "Decent but could be better",
      text: "The product is okay, but I expected more for the price. A few minor flaws, but overall, it’s acceptable.",
      days: "5 days ago",
    },
    {
      name: "Jessica K.",
      rating: 4.5,
      title: "Beautiful design",
      text: "I love the sleek design and the ease of use. Haven’t come across such a stylish product in a long time. Highly satisfied!",
      days: "2 weeks ago",
    },
  ];

  const images = [
    product.image || "https://placehold.co/600x400?text=Product",
    product.image || "https://placehold.co/600x400?text=Product+2",
    product.image || "https://placehold.co/600x400?text=Product+3",
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>
                <span className="font-semibold text-foreground">Seller:</span>{" "}
                {product.seller || "Admin Store"}
              </p>
              <p>
                <span className="font-semibold text-foreground">Published:</span>{" "}
                {product.createdAt
                  ? new Date(product.createdAt).toDateString()
                  : "Unknown"}
              </p>
              <p>
                <span className="font-semibold text-foreground">SKU:</span>{" "}
                {product.id}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-gray-200 rounded-md">
              <Edit2 size={20} />
            </button>
            <button className="p-2 hover:bg-red-200 rounded-md">
              <Trash2 size={20} className="text-red-600" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Images */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-4">
              <div className="w-full bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={images[currentImage]}
                  alt={product.name}
                  className="w-full h-96 object-cover"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImage(idx)}
                    className={`w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 ${
                      currentImage === idx
                        ? "border-primary"
                        : "border-gray-200"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumb ${idx}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">Price</p>
                <p className="text-lg font-semibold">₹{product.price}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">No. of Orders</p>
                <p className="text-lg font-semibold">250</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Available Stocks
                </p>
                <p className="text-lg font-semibold">{product.inventory}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">Category</p>
                <p className="text-lg font-semibold">{product.category}</p>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white border rounded-lg p-6 space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground">{product.description}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Key Features</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Quality assured materials</li>
                  <li>Excellent durability</li>
                  <li>Affordable pricing</li>
                  <li>Customer-favorite choice</li>
                </ul>
              </div>

              {/* Product Details Table */}
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <tbody>
                    <tr className="border-b">
                      <td className="p-3 font-semibold">Category</td>
                      <td className="p-3 text-right">{product.category}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-semibold">Brand</td>
                      <td className="p-3 text-right">
                        {product.seller || "Generic"}
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold">ID</td>
                      <td className="p-3 text-right">{product.id}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Colors */}
              <div>
                <h3 className="font-semibold mb-3">Colors</h3>
                <div className="flex gap-3">
                  {colors.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => setSelectedColor(color.id)}
                      className={`w-8 h-8 rounded-full ${color.bg} border-2 ${
                        selectedColor === color.id
                          ? "border-primary ring-2 ring-primary"
                          : "border-gray-300"
                      }`}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div>
                <h3 className="font-semibold mb-3">Sizes</h3>
                <div className="flex gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-10 h-10 rounded-md border-2 font-semibold text-xs uppercase ${
                        selectedSize === size
                          ? "border-primary bg-primary/10"
                          : "border-gray-300"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button className="flex-1 bg-primary text-white py-2 rounded-md font-medium hover:bg-primary/90 flex items-center justify-center gap-2">
                  <ShoppingCart size={20} /> Add to Cart
                </button>
                <button className="flex-1 border border-gray-300 py-2 rounded-md font-medium hover:bg-gray-50 flex items-center justify-center gap-2">
                  <Heart size={20} /> Wishlist
                </button>
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white border rounded-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Reviews</h3>
                <button className="px-4 py-2 border rounded-md hover:bg-gray-50">
                  + Submit Review
                </button>
              </div>

              <div className="space-y-4">
                {reviews.map((review, idx) => (
                  <div key={idx} className="border rounded-lg p-4 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold">{review.name}</p>
                        <div className="flex gap-1 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={
                                i < Math.floor(review.rating)
                                  ? "fill-orange-400 text-orange-400"
                                  : "text-gray-300"
                              }
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {review.days}
                      </p>
                    </div>
                    <p className="font-semibold">{review.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {review.text}
                    </p>
                  </div>
                ))}
              </div>

              <button className="w-full mt-4 py-2 border rounded-md hover:bg-gray-50">
                Load more
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
