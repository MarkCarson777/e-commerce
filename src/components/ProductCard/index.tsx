import clsx from "clsx";

import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

import { Button } from "@/components/Button";

import { useProductContext } from "@/context/ProductContext";

import { Product } from "@/types";

type ProductCardProps = {
  product: Product;
  className?: string;
};

export function ProductCard(props: ProductCardProps) {
  const { product, className } = props;
  const { deleteProduct } = useProductContext();
  const router = useRouter();
  const path = usePathname();

  return (
    <Link href={`/products/${product.id}`}>
      <article
        className={clsx(
          "flex flex-col border-2 border-black rounded-2xl overflow-clip",
          className
        )}
      >
        <figure className="relative h-64 w-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="20vw"
            priority
          />
        </figure>
        <div className="p-2">
          <h2>{product.name}</h2>
          <p>£{product.price}</p>
          <p>{product.description}</p>
          {path === "/dashboard" && (
            <div className="flex gap-2 justify-end">
              <Button
                type="button"
                color="primary"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  router.push(`/dashboard/edit/${product.id}`);
                }}
              >
                <span>Edit</span>
              </Button>
              <Button
                type="button"
                color="danger"
                onClick={async (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  try {
                    const { error } = await deleteProduct(product.id);
                    if (error) {
                      console.error(error);
                    }
                  } catch (error) {
                    console.error(error);
                  }
                  console.log("Deleted product", product.id);
                }}
              >
                <span>Remove</span>
              </Button>
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
