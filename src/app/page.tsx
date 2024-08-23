"use client";

import { useState, useEffect, useRef } from "react";
import { SlideCarousel } from "@/components/SlideCarousel";
import { Navbar } from "@/components/Navbar";
import { ProductCard } from "@/components/ProductCard";
import { useProductContext } from "@/context/ProductContext";

export default function Home() {
  const [navbarHeight, setNavbarHeight] = useState<number>();
  const heightRef = useRef<HTMLDivElement>(null);
  const { products } = useProductContext();

  useEffect(() => {
    if (heightRef.current) {
      setNavbarHeight(heightRef.current.clientHeight);
    }
  }, [heightRef.current]);

  return (
    <main className="flex flex-col min-h-screen items-center">
      <div className="w-full shadow-xl z-10" ref={heightRef}>
        <Navbar />
      </div>
      <SlideCarousel style={{ height: `calc(100vh - ${navbarHeight}px)` }} />
      <h1 className="pt-16 pb-32">New Arrivals</h1>
      <section className="relative grid grid-cols-4 gap-8 w-full px-48">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </section>
    </main>
  );
}
