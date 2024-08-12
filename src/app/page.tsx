import { Navbar } from "../components/Navbar";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen items-center justify-between">
      <Navbar />
      <h1>Home</h1>
    </main>
  );
}
