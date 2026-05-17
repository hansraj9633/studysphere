"use client";

import { Search, Bell, User } from "lucide-react";

export default function Topbar() {
  return (
    <header className="h-16 border-b border-zinc-800/50 bg-black/50 backdrop-blur-md sticky top-0 z-40 px-6 flex items-center justify-between">
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search size={16} className="text-zinc-500 group-focus-within:text-zinc-300 transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Search materials, subjects, analytics..."
            className="w-full bg-zinc-900/50 hover:bg-zinc-900 focus:bg-zinc-900 text-sm text-white placeholder-zinc-500 rounded-lg py-2 pl-10 pr-4 outline-none border border-zinc-800 focus:border-zinc-700 transition-all duration-200"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 ml-4">
        <button className="relative p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-900/50 transition-colors">
          <Bell size={18} />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-blue-500 rounded-full border border-black"></span>
        </button>
        
        <div className="h-6 w-px bg-zinc-800"></div>
        
        <button className="flex items-center gap-2 pl-2 group">
          <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700 group-hover:border-zinc-500 transition-colors overflow-hidden">
            <User size={16} className="text-zinc-400 group-hover:text-white transition-colors" />
          </div>
          <span className="text-sm font-medium text-zinc-300 group-hover:text-white hidden sm:block transition-colors">
            Admin
          </span>
        </button>
      </div>
    </header>
  );
}
