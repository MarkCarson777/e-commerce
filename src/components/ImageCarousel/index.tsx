"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import clsx from "clsx";

import Image, { StaticImageData } from "next/image";
import { Icon } from "@/components/Icon";

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

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        return prevIndex >= images.length - 1 ? 0 : prevIndex + 1;
      });
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      className={clsx("relative w-full", className)}
      style={{ height: `calc(100vh - 64px)` }}
    >
      <div
        className="flex transition-transform duration-1000 h-full"
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
        className="absolute top-1/2 left-4 transform -translate-y-1/2"
      >
        <Icon
          icon="Arrow"
          height={48}
          width={152}
          className="hover:scale-110 transition-scale duration-200"
        />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 rotate-180"
      >
        <Icon
          icon="Arrow"
          height={48}
          width={152}
          className="hover:scale-110 transition-scale duration-200"
        />
      </button>
      <Link href="/products">
        <div className="absolute flex flex-col top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 gap-4 items-center">
          <span className="text-8xl font-tangerine font-semibold">
            Last Chance
          </span>
          <button className="uppercase text-montserrat text-xl border-2 border-black px-8 py-3 hover:bg-white w-fit">
            Shop now
          </button>
        </div>
      </Link>
    </div>
  );
}
