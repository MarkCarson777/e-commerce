"use client";

// Next
import { useParams } from "next/navigation";
// Routing
import Link from "next/link";
import { AuthRoute } from "@/containers/AuthRoute";
// Components
import { Icon } from "@/components/Icon";
// Containers
import { ProductForm } from "@/containers/ProductForm";

function Page() {
  const { id } = useParams();

  console.log("edit", id);

  return (
    <main className="h-screen w-full flex flex-col">
      <div className="bg-gray-200 w-full flex items-center gap-3 pl-3 py-2 min-h-16">
        <Link href="/dashboard">
          <Icon icon="CircleLeft" size={24} />
        </Link>
        <h1 className="text-2xl">Edit product</h1>
      </div>
      <ProductForm />
    </main>
  );
}

export default AuthRoute(Page);
