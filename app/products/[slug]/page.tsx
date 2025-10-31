import { PrismaClient } from "@prisma/client";
import ProductDetails from "./ProductDetails";

const prisma = new PrismaClient();

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({ where: { slug } });

  if (!product) {
    return (
      <h1 className="text-center mt-10 text-2xl text-red-600">
        Product not found 😭
      </h1>
    );
  }

  // ✅ Pass product directly to the client component
  return <ProductDetails product={product} />;
}
