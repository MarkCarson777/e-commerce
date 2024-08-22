"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";

import { Icon } from "@/components/Icon";
import { Slide } from "@/components/SlideCarousel/Slide";

import carouselOne from "/public/images/carouselOne.jpg";
import carouselTwo from "/public/images/carouselTwo.jpg";
import carouselThree from "/public/images/carouselThree.jpg";
import carouselFour from "/public/images/carouselFour.jpg";
import carouselFive from "/public/images/carouselFive.jpg";

import { Slide as SlideType } from "@/types";

type SlideCarouselProps = {
  className?: string;
  style?: React.CSSProperties;
};

export function SlideCarousel(props: SlideCarouselProps) {
  const { className, style } = props;
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides: SlideType[] = [
    {
      title: "Last Chance",
      btn: { label: "Shop now", path: "/products" },
      images: [{ img: carouselOne, alt: "Clothes" }],
      lightMode: true,
    },
    {
      title: "New Collection",
      btn: { label: "Shop now", path: "/products" },
      images: [{ img: carouselTwo, alt: "Clothes" }],
      lightMode: false,
    },
    {
      title: "Summer Sale",
      btn: { label: "Shop now", path: "/products" },
      images: [{ img: carouselThree, alt: "Clothes" }],
      lightMode: true,
    },
    {
      title: "Winter Sale",
      btn: { label: "Shop now", path: "/products" },
      images: [{ img: carouselFour, alt: "Clothes" }],
      lightMode: true,
    },
    {
      title: "Spring Sale",
      btn: { label: "Shop now", path: "/products" },
      images: [
        { img: carouselFour, alt: "Clothes" },
        { img: carouselFive, alt: "Clothes" },
      ],
      lightMode: true,
    },
  ];

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        return prevIndex >= slides.length - 1 ? 0 : prevIndex + 1;
      });
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={clsx("relative w-full", className)} style={style}>
      <div
        className="flex transition-transform duration-1000 h-full"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <Slide key={index} slide={slide} />
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
          className="hover:-translate-x-2 hover:scale-105 transition-transform duration-200"
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
          className="hover:-translate-x-2 hover:scale-105 duration-200"
        />
      </button>
    </div>
  );
}
