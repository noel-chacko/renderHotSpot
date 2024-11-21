"use client";

import NavBar from "@/app/NavBar";

export default function BlankPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      
      <div className="flex justify-center items-center flex-1">
        <h1 className="text-4xl font-bold text-red-500">HOTSPOTS</h1>
      </div>
    </div>
  );
}
