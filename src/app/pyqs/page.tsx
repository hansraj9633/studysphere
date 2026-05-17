"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MaterialCard from "@/components/MaterialCard";
import { Filter, Search } from "lucide-react";

export default function PYQsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-black selection:bg-zinc-800 selection:text-white">
      <Navbar />
      
      <main className="flex-1 w-full relative pb-24">
        {/* Subtle grid background pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-40 z-0" />
        
        <section className="relative z-10 px-6 pt-20">
          <div className="max-w-7xl mx-auto">
            
            <div className="mb-12">
              <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-2">
                Past Year Questions
              </h1>
              <p className="text-zinc-400">
                Browse our extensive archive of previous university examination papers.
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              
              {/* Filters Sidebar */}
              <aside className="w-full lg:w-64 shrink-0 space-y-6">
                <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-6">
                    <Filter size={18} className="text-zinc-400" />
                    <h2 className="text-sm font-bold text-white uppercase tracking-wider">Filters</h2>
                  </div>

                  {/* Search filter */}
                  <div className="relative mb-6">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                      <Search size={14} className="text-zinc-500" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search PYQs..."
                      className="w-full bg-zinc-950/50 text-sm text-white placeholder-zinc-500 rounded-lg py-2.5 pl-9 pr-3 outline-none border border-zinc-800 focus:border-zinc-700 transition-all duration-200"
                    />
                  </div>

                  <div className="space-y-5">
                    {/* Semester Filter */}
                    <div>
                      <h3 className="text-xs font-semibold text-zinc-400 mb-3 uppercase">Semester</h3>
                      <div className="space-y-2">
                        {["Semester 1", "Semester 2", "Semester 3", "Semester 4", "Semester 5"].map((sem) => (
                          <label key={sem} className="flex items-center gap-3 cursor-pointer group">
                            <div className="relative flex items-center justify-center">
                              <input type="checkbox" className="peer appearance-none w-4 h-4 border border-zinc-700 rounded bg-zinc-950 checked:bg-zinc-800 checked:border-zinc-600 transition-colors" />
                              <svg className="absolute w-2.5 h-2.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" viewBox="0 0 14 10" fill="none">
                                <path d="M1 5L4.5 8.5L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                            <span className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">{sem}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Year Filter */}
                    <div>
                      <h3 className="text-xs font-semibold text-zinc-400 mb-3 uppercase">Year</h3>
                      <select className="w-full bg-zinc-950/50 text-sm text-white rounded-lg py-2.5 px-3 outline-none border border-zinc-800 focus:border-zinc-700 transition-all duration-200 appearance-none cursor-pointer">
                        <option value="">All Years</option>
                        <option value="2025">2025</option>
                        <option value="2024">2024</option>
                        <option value="2023">2023</option>
                        <option value="2022">2022</option>
                      </select>
                    </div>
                  </div>
                </div>
              </aside>

              {/* Results Grid */}
              <div className="flex-1">
                <div className="flex justify-between items-center mb-6">
                  <p className="text-sm font-medium text-zinc-400">Showing 24 results</p>
                  <select className="bg-transparent text-sm font-medium text-white outline-none cursor-pointer">
                    <option className="bg-zinc-900">Newest First</option>
                    <option className="bg-zinc-900">Most Downloaded</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  <MaterialCard id="pyq-1" title="Theory of Structures - Dec 2025" type="PDF" downloads="2.1k" />
                  <MaterialCard id="pyq-2" title="Highway Engineering - Dec 2025" type="ZIP" downloads="1.8k" />
                  <MaterialCard id="pyq-3" title="Fluid Mechanics - May 2025" type="PDF" downloads="1.2k" />
                  <MaterialCard id="pyq-4" title="Engineering Math IV - Dec 2024" type="PDF" downloads="3.4k" />
                  <MaterialCard id="pyq-5" title="Surveying - May 2024" type="ZIP" downloads="920" />
                  <MaterialCard id="pyq-6" title="Concrete Tech - Dec 2023" type="PDF" downloads="850" />
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
