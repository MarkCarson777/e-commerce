import clsx from "clsx";

import Image from "next/image";
import Link from "next/link";

import placeholder from "/public/images/carouselOne.jpg";

import { Product } from "@/types";

type ProductCardProps = {
  product: Product;
  className?: string;
};

export function ProductCard(props: ProductCardProps) {
  const { product, className } = props;

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
      </article>
    </Link>
  );
}
