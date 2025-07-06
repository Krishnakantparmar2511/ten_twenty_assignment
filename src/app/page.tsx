import { DragCarousel } from "@/components/organism/carousel/DragCarousel";
import { MainCarousel } from "@/components/organism/carousel/MainCarousel";
import React from "react";

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav bar and Carousel animated */}
      <MainCarousel />

      {/* Drag carousel */}
      <DragCarousel />
    </div>
  );
}
