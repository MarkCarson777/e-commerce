"use client";

import Image from "next/image";
import Link from "next/link";
import { AuthRoute } from "@/containers/AuthRoute";
import { useProductContext } from "@/context/ProductContext";

function Page() {
  const { products } = useProductContext();

  return (
    <>
      <Link href="/dashboard/create">Add product</Link>
      <h1>All products</h1>
      {products.map((product, index) => (
        <div key={index}>
          <span>{product.name}</span>
          <Image
            src={product.image}
            alt={product.name}
            height={200}
            width={200}
          />
        </div>
      ))}
    </>
  );
}

export default AuthRoute(Page);
