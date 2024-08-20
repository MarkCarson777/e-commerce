import clsx from "clsx";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/Button";

import { useProductContext } from "@/context/ProductContext";

import placeholder from "/public/images/carouselOne.jpg";

import { Product } from "@/types";

type ProductCardProps = {
  product: Product;
  className?: string;
};

export function ProductCard(props: ProductCardProps) {
  const { product, className } = props;
  const { deleteProduct } = useProductContext();
  const router = useRouter();

  return (
    <Link href={`/products/${product.id}`}>
      <article className={clsx("flex flex-col border-2", className)}>
        <figure className="relative h-64 w-full">
          <Image
            src={product.image || placeholder}
            alt={product.name}
            fill
            sizes="20vw"
            priority
          />
        </figure>
        <h2>{product.name}</h2>
        <p>£{product.price}</p>
        <p>{product.description}</p>
        <div className="flex justify-end">
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
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              deleteProduct(product.id);
              console.log("Product deleted");
            }}
          >
            <span>Remove</span>
          </Button>
        </div>
      </article>
    </Link>
  );
}
