"use client";

import { 
  ArrowLeft, 
  Download, 
  Bookmark, 
  Maximize, 
  ZoomIn, 
  ZoomOut, 
  MoreVertical,
  FileText
} from "lucide-react";
import Link from "next/link";
import MaterialCard from "@/components/MaterialCard";
import { use } from "react";

export default function PDFViewerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  // Simulated data
  const materialTitle = "Theory of Structures Unit 3 Notes.pdf";

  return (
    <div className="h-screen flex flex-col bg-[#0a0a0a] overflow-hidden selection:bg-zinc-800">
      {/* Top Action Bar */}
      <header className="h-16 shrink-0 bg-zinc-900/80 border-b border-zinc-800/60 flex items-center justify-between px-4 z-20">
        <div className="flex items-center gap-4">
          <Link href="/subjects/theory-of-structures" className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-white transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-blue-500/10 rounded-md">
              <FileText size={16} className="text-blue-400" />
            </div>
            <h1 className="text-sm font-semibold text-white tracking-tight truncate max-w-[200px] md:max-w-md">
              {materialTitle}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-1 border-r border-zinc-800 pr-2 mr-2">
            <button className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors">
              <ZoomOut size={18} />
            </button>
            <span className="text-xs font-medium text-zinc-400 w-12 text-center">100%</span>
            <button className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors">
              <ZoomIn size={18} />
            </button>
          </div>

          <button className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors" title="Fullscreen">
            <Maximize size={18} />
          </button>
          <button className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors" title="Bookmark">
            <Bookmark size={18} />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white text-black hover:bg-zinc-200 rounded-lg text-sm font-semibold transition-colors ml-2">
            <Download size={16} />
            <span className="hidden sm:inline">Download</span>
          </button>
          <button className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors sm:hidden">
            <MoreVertical size={18} />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* PDF Viewer Area */}
        <div className="flex-1 bg-[#121212] overflow-y-auto custom-scrollbar flex justify-center py-8 px-4 relative">
          {/* Subtle background texture */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/10 via-[#121212] to-[#121212] pointer-events-none" />
          
          {/* Simulated PDF Page */}
          <div className="w-full max-w-[800px] bg-zinc-900 border border-zinc-800 shadow-2xl rounded-sm min-h-[1130px] flex flex-col items-center justify-center relative z-10 p-16">
            
            <div className="text-center opacity-30 select-none">
              <FileText size={64} className="mx-auto mb-4 text-zinc-600" />
              <p className="text-lg font-medium text-zinc-500">Document Rendering Simulated</p>
              <p className="text-sm text-zinc-600 mt-2">Page 1 of 42</p>
            </div>
            
            {/* Placeholder academic text structure */}
            <div className="absolute top-16 left-16 right-16 bottom-16 opacity-10 pointer-events-none">
              <div className="h-8 bg-white/20 w-3/4 mb-10 rounded"></div>
              <div className="h-4 bg-white/20 w-full mb-3 rounded"></div>
              <div className="h-4 bg-white/20 w-full mb-3 rounded"></div>
              <div className="h-4 bg-white/20 w-5/6 mb-10 rounded"></div>
              <div className="h-48 bg-white/10 w-full mb-10 rounded border border-white/20"></div>
              <div className="h-4 bg-white/20 w-full mb-3 rounded"></div>
              <div className="h-4 bg-white/20 w-full mb-3 rounded"></div>
              <div className="h-4 bg-white/20 w-4/5 rounded"></div>
            </div>

          </div>
        </div>

        {/* Right Sidebar - Related Materials */}
        <aside className="w-80 shrink-0 bg-black border-l border-zinc-800/60 overflow-y-auto hidden xl:block">
          <div className="p-6">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">
              Related Materials
            </h3>
            
            <div className="flex flex-col gap-4">
              <MaterialCard 
                id="tos-unit-4" title="Unit 4: Moment Distribution Method" type="PDF" downloads="2.1k" 
              />
              <MaterialCard 
                id="tos-pyq-2025" title="Dec 2025 Regular Paper" type="ZIP" downloads="2.2k" 
              />
              <MaterialCard 
                id="tos-formulas" title="Complete Formula Sheet" type="PDF" downloads="3.4k" 
              />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
