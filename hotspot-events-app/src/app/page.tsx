"use client";
import { useRouter } from "next/navigation";
import Search from './searchBar';
import EventCatalog from './eventCatalog/page';
import NavBar from "@/app/NavBar"; 

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />

      <main className="flex-grow flex items-center justify-center">
        <div className="flex flex-col space-y-4 mb-12 mr-auto">
          <h1 className="text-6xl font-bold ml-5">Welcome to HOTSPOT</h1>
          <Search />
        </div>
        <EventCatalog />
      </main>
    </div>
  );
}
