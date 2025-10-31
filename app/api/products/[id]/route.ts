import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { ObjectId } from "bson";
const prisma = new PrismaClient();

// ✏️ UPDATE product by ID
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // ✅ Unwrap the promise properly
    const { id } = await context.params;

    // ✅ Validate ID
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
    }

    const body = await req.json();
    const { name, slug, description, price, category, inventory, image } = body;

    // ✅ Convert to ObjectId string
    const updatedProduct = await prisma.product.update({
      where: { id: new ObjectId(id).toString() },
      data: {
        name,
        slug,
        description,
        price,
        category,
        inventory,
        image,
        lastUpdated: new Date(),
      },
    });

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    console.error("❌ Error updating product:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

// 📦 GET single product by ID (✅ Fixed)
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // ✅ Properly await params
    const { id } = await context.params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
    }

    const product = await prisma.product.findUnique({
      where: { id: new ObjectId(id).toString() },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

// 🗑️ DELETE product by ID
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // ✅ Unwrap the promise properly
    const { id } = await context.params;

    // ✅ Validate the ID
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
    }

    // ✅ Convert to ObjectId string for Mongo
    await prisma.product.delete({
      where: { id: new ObjectId(id).toString() },
    });

    return NextResponse.json(
      { message: "✅ Product deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("❌ Error deleting product:", error);

    if (error.code === "P2025") {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
