import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  console.log("💡 DATABASE_URL:", process.env.DATABASE_URL ? "Exists ✅" : "❌ Missing");
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json(products);
  } catch (error) {
    console.error("❌ Prisma exploded:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}


export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, slug, description, price, category, inventory, image } = body;

    const newProduct = await prisma.product.create({
      data: {
        name,
        slug,
        description,
        price,
        category,
        inventory,
        image: image || "https://placehold.co/400x400?text=No+Image",
      },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("❌ Error creating product:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
