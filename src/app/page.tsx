import { ImageCarousel } from "../components/ImageCarousel";
import { Navbar } from "../components/Navbar";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen items-center">
      <Navbar />
      <ImageCarousel />
    </main>
  );
}
