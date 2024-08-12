import { ImageCarousel } from "../components/ImageCarousel";
import { Navbar } from "../components/Navbar";

import carouselOne from "/public/images/carouselOne.jpg";
import carouselTwo from "/public/images/carouselTwo.jpg";
import carouselThree from "/public/images/carouselThree.jpg";
import carouselFour from "/public/images/carouselFour.jpg";
import carouselFive from "/public/images/carouselFive.jpg";

export default function Home() {
  const carouselImages = [
    carouselOne,
    carouselTwo,
    carouselThree,
    carouselFour,
    carouselFive,
  ];

  return (
    <main className="flex flex-col min-h-screen items-center">
      <Navbar />
      <ImageCarousel images={carouselImages} />
      <h1>New Arrivals</h1>
    </main>
  );
}
