"use client";

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
        <div key={index}>{JSON.stringify(product)}</div>
      ))}
    </>
  );
}

export default AuthRoute(Page);
