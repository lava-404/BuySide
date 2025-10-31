import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("🧹 Clearing existing products...");
  await prisma.product.deleteMany(); // Clears old data before reseeding

  console.log("🌱 Seeding products...");
  const products = [
    {
      name: "Classic Cotton T-Shirt",
      slug: "classic-cotton-tshirt",
      description: "Soft and breathable cotton t-shirt available in multiple colors.",
      price: 19.99,
      category: "Clothing",
      inventory: 120,
      image: "https://placehold.co/600x400?text=T-Shirt",
    },
    {
      name: "Denim Jacket",
      slug: "denim-jacket",
      description: "Vintage-style denim jacket that pairs with anything.",
      price: 49.99,
      category: "Clothing",
      inventory: 60,
      image: "https://placehold.co/600x400?text=Denim+Jacket",
    },
    {
      name: "Hooded Sweatshirt",
      slug: "hooded-sweatshirt",
      description: "Warm hoodie made with premium fleece fabric.",
      price: 39.99,
      category: "Clothing",
      inventory: 80,
      image: "https://placehold.co/600x400?text=Hoodie",
    },
    {
      name: "Wireless Earbuds",
      slug: "wireless-earbuds",
      description: "Crisp audio, noise cancellation, and 24-hour battery life.",
      price: 89.99,
      category: "Electronics",
      inventory: 100,
      image: "https://placehold.co/600x400?text=Wireless+Earbuds",
    },
    {
      name: "Bluetooth Speaker",
      slug: "bluetooth-speaker",
      description: "Portable speaker with deep bass and waterproof design.",
      price: 59.99,
      category: "Electronics",
      inventory: 45,
      image: "https://placehold.co/600x400?text=Bluetooth+Speaker",
    },
    {
      name: "Smartwatch Pro",
      slug: "smartwatch-pro",
      description: "Track fitness, receive notifications, and monitor your heart rate.",
      price: 129.99,
      category: "Electronics",
      inventory: 75,
      image: "https://placehold.co/600x400?text=Smartwatch",
    },
    {
      name: "Gaming Mouse",
      slug: "gaming-mouse",
      description: "RGB-lit ergonomic mouse with high-precision DPI sensor.",
      price: 49.99,
      category: "Electronics",
      inventory: 90,
      image: "https://placehold.co/600x400?text=Gaming+Mouse",
    },
    {
      name: "Mechanical Keyboard",
      slug: "mechanical-keyboard",
      description: "Tactile switches, customizable RGB, and full-sized layout.",
      price: 79.99,
      category: "Electronics",
      inventory: 70,
      image: "https://placehold.co/600x400?text=Mechanical+Keyboard",
    },
    {
      name: "Leather Wallet",
      slug: "leather-wallet",
      description: "Handcrafted wallet made from 100% genuine leather.",
      price: 34.99,
      category: "Accessories",
      inventory: 150,
      image: "https://placehold.co/600x400?text=Leather+Wallet",
    },
    {
      name: "Sunglasses Classic",
      slug: "sunglasses-classic",
      description: "UV-protected stylish sunglasses for everyday wear.",
      price: 24.99,
      category: "Accessories",
      inventory: 200,
      image: "https://placehold.co/600x400?text=Sunglasses",
    },
    {
      name: "Canvas Backpack",
      slug: "canvas-backpack",
      description: "Spacious backpack with laptop compartment and multiple pockets.",
      price: 54.99,
      category: "Accessories",
      inventory: 85,
      image: "https://placehold.co/600x400?text=Backpack",
    },
    {
      name: "Stainless Steel Bottle",
      slug: "stainless-steel-bottle",
      description: "Keeps drinks cold for 24 hours and hot for 12 hours.",
      price: 22.99,
      category: "Accessories",
      inventory: 110,
      image: "https://placehold.co/600x400?text=Steel+Bottle",
    },
    {
      name: "Running Shoes",
      slug: "running-shoes",
      description: "Lightweight, breathable running shoes for all terrains.",
      price: 69.99,
      category: "Footwear",
      inventory: 95,
      image: "https://placehold.co/600x400?text=Running+Shoes",
    },
    {
      name: "High-Top Sneakers",
      slug: "high-top-sneakers",
      description: "Trendy sneakers with cushioned soles for all-day comfort.",
      price: 79.99,
      category: "Footwear",
      inventory: 70,
      image: "https://placehold.co/600x400?text=Sneakers",
    },
    {
      name: "Formal Leather Shoes",
      slug: "formal-leather-shoes",
      description: "Elegant leather shoes perfect for formal occasions.",
      price: 99.99,
      category: "Footwear",
      inventory: 55,
      image: "https://placehold.co/600x400?text=Leather+Shoes",
    },
    {
      name: "Sports Watch",
      slug: "sports-watch",
      description: "Durable waterproof digital watch for active lifestyles.",
      price: 44.99,
      category: "Accessories",
      inventory: 130,
      image: "https://placehold.co/600x400?text=Sports+Watch",
    },
    {
      name: "Laptop Sleeve",
      slug: "laptop-sleeve",
      description: "Sleek, shock-proof sleeve compatible with 13-inch laptops.",
      price: 29.99,
      category: "Accessories",
      inventory: 160,
      image: "https://placehold.co/600x400?text=Laptop+Sleeve",
    },
    {
      name: "Wireless Charger",
      slug: "wireless-charger",
      description: "Fast-charging pad compatible with all Qi devices.",
      price: 39.99,
      category: "Electronics",
      inventory: 100,
      image: "https://placehold.co/600x400?text=Wireless+Charger",
    },
    {
      name: "Smart Lamp",
      slug: "smart-lamp",
      description: "Voice-controlled lamp with adjustable brightness and colors.",
      price: 64.99,
      category: "Electronics",
      inventory: 50,
      image: "https://placehold.co/600x400?text=Smart+Lamp",
    },
    {
      name: "Beanie Hat",
      slug: "beanie-hat",
      description: "Warm knitted beanie for winter outings.",
      price: 14.99,
      category: "Clothing",
      inventory: 180,
      image: "https://placehold.co/600x400?text=Beanie+Hat",
    },
    {
      name: "Yoga Mat",
      slug: "yoga-mat",
      description: "Non-slip eco-friendly yoga mat for workouts and meditation.",
      price: 34.99,
      category: "Fitness",
      inventory: 140,
      image: "https://placehold.co/600x400?text=Yoga+Mat",
    },
    {
      name: "Gym Duffle Bag",
      slug: "gym-duffle-bag",
      description: "Spacious duffle bag with wet/dry compartments.",
      price: 44.99,
      category: "Fitness",
      inventory: 90,
      image: "https://placehold.co/600x400?text=Gym+Bag",
    },
    {
      name: "Wireless Keyboard",
      slug: "wireless-keyboard",
      description: "Slim wireless keyboard with long-lasting battery life.",
      price: 49.99,
      category: "Electronics",
      inventory: 75,
      image: "https://placehold.co/600x400?text=Wireless+Keyboard",
    },
    {
      name: "LED Desk Lamp",
      slug: "led-desk-lamp",
      description: "Adjustable LED desk lamp with touch-sensitive controls.",
      price: 32.99,
      category: "Home",
      inventory: 65,
      image: "https://placehold.co/600x400?text=LED+Desk+Lamp",
    },
    {
      name: "Ceramic Coffee Mug",
      slug: "ceramic-coffee-mug",
      description: "Microwave-safe mug with a minimalist matte finish.",
      price: 12.99,
      category: "Home",
      inventory: 200,
      image: "https://placehold.co/600x400?text=Coffee+Mug",
    },
  ];

  await prisma.product.createMany({
    data: products.map((p, i) => ({
      ...p,
      slug: `${p.slug}-${i}`, // ensures slugs are unique
    })),
  });

  console.log("✅ Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
