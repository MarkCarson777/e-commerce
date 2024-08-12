"use client";

import { useState } from "react";
import clsx from "clsx";

import Image, { StaticImageData } from "next/image";

type ImageCarouselProps = {
  images: StaticImageData[];
  className?: string;
};

export function ImageCarousel(props: ImageCarouselProps) {
  const { images, className } = props;
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div
      className={clsx("relative w-full", className)}
      style={{ height: `calc(100vh - 56px)` }}
    >
      <div
        className="flex transition-transform duration-500 h-full"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {images.map((image, index) => (
          <div key={index} className="relative w-full shrink-0">
            <Image
              key={index}
              src={image}
              alt="Clothes"
              fill
              style={{
                objectFit: "cover",
              }}
              priority
            />
          </div>
        ))}
      </div>
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 h-24 w-24 bg-white rounded-full"
      >
        Prev
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 h-24 w-24 bg-white rounded-full"
      >
        Next
      </button>
    </div>
  );
}
