"use client";

import Link from "next/link";
import { AuthRoute } from "@/containers/AuthRoute";

import { useProductContext } from "@/context/ProductContext";

import { Navbar } from "@/components/Navbar";
import { ProductCard } from "@/components/ProductCard";

function Page() {
  const { products } = useProductContext();

  return (
    <div>
      <Navbar />
      <Link href="/dashboard/create">Add product</Link>
      <h1>All products</h1>
      <div className="relative grid grid-cols-4 gap-3">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
}

export default AuthRoute(Page);
