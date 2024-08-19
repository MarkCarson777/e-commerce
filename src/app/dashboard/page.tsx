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
      <main>
        <h1 className="text-2xl">All Products</h1>
        <div className="bg-gray-200 w-full flex justify-end p-2">
          <div className="relative flex font-semibold h-12 justify-center items-center rounded-md text-white bg-blue-500 w-fit px-4">
            <Link href="/dashboard/create">Add product</Link>
          </div>
        </div>
        <section className="relative grid grid-cols-4 gap-3 p-2">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </section>
      </main>
    </div>
  );
}

export default AuthRoute(Page);
