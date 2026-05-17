"use client";

import { motion } from "framer-motion";
import { Search, ChevronDown } from "lucide-react";

export default function SearchArea() {
  return (
    <section className="px-6 pb-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        className="max-w-4xl mx-auto"
      >
        <div className="glass p-2 rounded-[24px] shadow-2xl flex flex-col md:flex-row gap-2 relative z-20">
          
          {/* Search Input */}
          <div className="flex-1 relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search size={18} className="text-zinc-500 group-focus-within:text-white transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search for notes, PYQs, topics..."
              className="w-full bg-zinc-900/50 hover:bg-zinc-800/80 focus:bg-zinc-800/80 text-white placeholder-zinc-500 rounded-[18px] py-4 pl-12 pr-4 outline-none border border-transparent focus:border-zinc-700 transition-all duration-300"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-2 flex-1 md:flex-none">
            {/* Semester Dropdown */}
            <div className="relative group md:w-40">
              <select className="w-full appearance-none bg-zinc-900/50 hover:bg-zinc-800/80 focus:bg-zinc-800/80 text-zinc-300 rounded-[18px] py-4 px-4 pr-10 outline-none border border-transparent focus:border-zinc-700 transition-all duration-300 cursor-pointer">
                <option value="">Semester</option>
                <option value="1">Semester 1</option>
                <option value="2">Semester 2</option>
                <option value="3">Semester 3</option>
                <option value="4">Semester 4</option>
                <option value="5">Semester 5</option>
                <option value="6">Semester 6</option>
                <option value="7">Semester 7</option>
                <option value="8">Semester 8</option>
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                <ChevronDown size={16} className="text-zinc-500 group-hover:text-zinc-300 transition-colors" />
              </div>
            </div>

            {/* Subject Dropdown */}
            <div className="relative group md:w-48">
              <select className="w-full appearance-none bg-zinc-900/50 hover:bg-zinc-800/80 focus:bg-zinc-800/80 text-zinc-300 rounded-[18px] py-4 px-4 pr-10 outline-none border border-transparent focus:border-zinc-700 transition-all duration-300 cursor-pointer">
                <option value="">Subject</option>
                <option value="math">Mathematics</option>
                <option value="physics">Physics</option>
                <option value="cs">Computer Science</option>
                <option value="ee">Electrical</option>
                <option value="mech">Mechanical</option>
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                <ChevronDown size={16} className="text-zinc-500 group-hover:text-zinc-300 transition-colors" />
              </div>
            </div>

            {/* Search Button */}
            <button className="bg-white text-black hover:bg-zinc-200 font-medium rounded-[18px] py-4 px-8 outline-none transition-all duration-300 transform active:scale-95 whitespace-nowrap md:w-auto w-full">
              Search
            </button>
          </div>
          
        </div>
      </motion.div>
    </section>
  );
}
