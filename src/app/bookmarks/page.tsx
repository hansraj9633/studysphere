"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MaterialCard from "@/components/MaterialCard";
import { LayoutGrid, List } from "lucide-react";
import { useState } from "react";

export default function BookmarksPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="min-h-screen flex flex-col bg-black selection:bg-zinc-800 selection:text-white">
      <Navbar />
      
      <main className="flex-1 w-full relative pb-24">
        {/* Subtle grid background pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-40 z-0" />
        
        <section className="relative z-10 px-6 pt-20">
          <div className="max-w-7xl mx-auto">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-2">
                  Saved Materials
                </h1>
                <p className="text-zinc-400">
                  Access all your bookmarked notes, PYQs, and formula sheets quickly.
                </p>
              </div>

              {/* View Toggle */}
              <div className="flex items-center p-1 bg-zinc-900 border border-zinc-800 rounded-xl shrink-0">
                <button 
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg flex items-center justify-center transition-all duration-200 ${
                    viewMode === "grid" 
                      ? "bg-zinc-800 text-white shadow-sm" 
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                  aria-label="Grid view"
                >
                  <LayoutGrid size={18} />
                </button>
                <button 
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg flex items-center justify-center transition-all duration-200 ${
                    viewMode === "list" 
                      ? "bg-zinc-800 text-white shadow-sm" 
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                  aria-label="List view"
                >
                  <List size={18} />
                </button>
              </div>
            </div>

            {/* Bookmarks Grid/List */}
            <div className={
              viewMode === "grid" 
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" 
                : "flex flex-col gap-4 max-w-4xl"
            }>
              <MaterialCard 
                id="tos-unit-2" title="Unit 2: Fixed Beams Notes" type="PDF" downloads="980" initialBookmarked={true}
              />
              <MaterialCard 
                id="tos-pyq-2025" title="Dec 2025 Regular Paper" type="ZIP" downloads="2.2k" initialBookmarked={true}
              />
              <MaterialCard 
                id="fm-formula" title="Fluid Mechanics Formula Sheet" type="PDF" downloads="3.4k" initialBookmarked={true}
              />
              <MaterialCard 
                id="math-assignment" title="Engineering Math IV Assignment" type="PDF" downloads="420" initialBookmarked={true}
              />
            </div>

          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
