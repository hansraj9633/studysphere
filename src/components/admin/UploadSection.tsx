"use client";

import { UploadCloud, X } from "lucide-react";
import { useState } from "react";

export default function UploadSection() {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    // In a real app, handle e.dataTransfer.files
  };

  return (
    <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-xl p-6 flex flex-col h-full">
      <h3 className="text-lg font-semibold text-white mb-4">Quick Upload</h3>
      
      <form className="flex flex-col gap-4 flex-1">
        {/* Drag & Drop Area */}
        <div 
          className={`relative flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-xl transition-all duration-200 ${
            dragActive ? "border-blue-500 bg-blue-500/5" : "border-zinc-700 bg-zinc-900/50 hover:bg-zinc-800/50 hover:border-zinc-600"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="p-3 bg-zinc-800 rounded-full mb-3">
            <UploadCloud size={24} className={dragActive ? "text-blue-400" : "text-zinc-400"} />
          </div>
          <p className="text-sm font-medium text-white mb-1">
            Drag & drop files here
          </p>
          <p className="text-xs text-zinc-500 mb-4 text-center">
            Supported formats: PDF, DOCX, ZIP, PPTX (Max 50MB)
          </p>
          <label className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold rounded-lg cursor-pointer transition-colors">
            Browse Files
            <input type="file" className="hidden" multiple />
          </label>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-zinc-400">Subject</label>
            <select className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-zinc-600 transition-colors appearance-none cursor-pointer">
              <option value="">Select Subject...</option>
              <option value="theory_structures">Theory of Structures</option>
              <option value="highway_eng">Highway Engineering</option>
              <option value="fluid_mech">Fluid Mechanics</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-zinc-400">Semester</label>
            <select className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-zinc-600 transition-colors appearance-none cursor-pointer">
              <option value="">Select Sem...</option>
              <option value="1">Semester 1</option>
              <option value="2">Semester 2</option>
              <option value="3">Semester 3</option>
              <option value="4">Semester 4</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-zinc-400">Tags (comma separated)</label>
          <input 
            type="text" 
            placeholder="e.g. Unit 3, Important, PYQ" 
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-600 transition-colors"
          />
        </div>

        <button type="button" className="mt-auto w-full py-2.5 bg-white text-black hover:bg-zinc-200 rounded-lg text-sm font-semibold transition-all duration-200 active:scale-[0.98]">
          Upload Material
        </button>
      </form>
    </div>
  );
}
