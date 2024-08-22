"use client";

import { ImageCarousel } from "@/components/ImageCarousel";
import { Navbar } from "@/components/Navbar";
import { ProductCard } from "@/components/ProductCard";
import { useProductContext } from "@/context/ProductContext";

import carouselOne from "/public/images/carouselOne.jpg";
import carouselTwo from "/public/images/carouselTwo.jpg";
import carouselThree from "/public/images/carouselThree.jpg";
import carouselFour from "/public/images/carouselFour.jpg";
import carouselFive from "/public/images/carouselFive.jpg";

export default function Home() {
  const { products } = useProductContext();

  const carouselImages = [
    carouselOne,
    carouselTwo,
    carouselThree,
    carouselFour,
    carouselFive,
  ];

  return (
    <main className="flex flex-col min-h-screen items-center">
      <div className="w-full shadow-xl z-10">
        <Navbar />
      </div>
      <ImageCarousel images={carouselImages} />
      <h1>New Arrivals</h1>
      <section className="relative grid grid-cols-5 gap-3 p-2 w-full">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </section>
    </main>
  );
}
