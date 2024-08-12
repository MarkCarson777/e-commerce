import { Carousel } from "../components/Carousel";
import { Navbar } from "../components/Navbar";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen items-center">
      <Navbar />
      <Carousel />
    </main>
  );
}
