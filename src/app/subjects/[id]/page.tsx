import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MaterialCard from "@/components/MaterialCard";
import { Building2, ChevronRight, Download, FileText, BookOpen } from "lucide-react";
import Link from "next/link";

export default async function SubjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // Simulated dynamic data fetching based on ID
  const subjectName = id === "theory-of-structures" ? "Theory of Structures" : "Engineering Subject";
  
  return (
    <div className="min-h-screen flex flex-col bg-black selection:bg-zinc-800 selection:text-white">
      <Navbar />
      
      <main className="flex-1 w-full relative pb-24">
        {/* Subtle grid background pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-40 z-0" />
        
        {/* Subject Hero Section */}
        <section className="relative pt-20 pb-16 px-6 z-10 border-b border-zinc-800/50 bg-gradient-to-b from-zinc-900/40 to-transparent">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 text-sm font-medium text-zinc-500 mb-8">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight size={14} />
              <Link href="/subjects" className="hover:text-white transition-colors">Subjects</Link>
              <ChevronRight size={14} />
              <span className="text-zinc-300">{subjectName}</span>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
              <div className="w-20 h-20 rounded-3xl bg-zinc-800 flex items-center justify-center shrink-0 border border-zinc-700 shadow-2xl">
                <Building2 size={40} className="text-white" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
                  {subjectName}
                </h1>
                <p className="text-lg text-zinc-400 max-w-2xl leading-relaxed mb-6">
                  Analysis of solid structures, beams, columns, and structural stability. Access comprehensive notes, formula sheets, and past year questions.
                </p>
                <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300">
                    <BookOpen size={16} className="text-zinc-500" />
                    <span>Semester 5</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300">
                    <FileText size={16} className="text-zinc-500" />
                    <span>24 Materials</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300">
                    <Download size={16} className="text-zinc-500" />
                    <span>8.5k Downloads</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Sections */}
        <section className="relative z-10 px-6 pt-16">
          <div className="max-w-7xl mx-auto space-y-20">
            
            {/* Notes Section (Unit-wise) */}
            <div>
              <div className="flex items-end justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-white tracking-tight mb-1">Unit-wise Notes</h2>
                  <p className="text-sm text-zinc-400">Detailed handwritten and typed notes.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <MaterialCard 
                  id="tos-unit-1" title="Unit 1: Slope & Deflection" type="PDF" downloads="1.2k" 
                />
                <MaterialCard 
                  id="tos-unit-2" title="Unit 2: Fixed Beams" type="PDF" downloads="980" initialBookmarked={true}
                />
                <MaterialCard 
                  id="tos-unit-3" title="Unit 3: Continuous Beams" type="PDF" downloads="1.5k" 
                />
                <MaterialCard 
                  id="tos-unit-4" title="Unit 4: Moment Distribution Method" type="PDF" downloads="2.1k" 
                />
              </div>
            </div>

            {/* Formula Sheets Section */}
            <div>
              <div className="flex items-end justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-white tracking-tight mb-1">Formula Sheets</h2>
                  <p className="text-sm text-zinc-400">Quick revision sheets for exams.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <MaterialCard 
                  id="tos-formulas-complete" title="Complete Subject Formula Sheet" type="PDF" downloads="3.4k" 
                />
                <MaterialCard 
                  id="tos-mdm-cheat" title="MDM Cheat Sheet" type="PDF" downloads="850" 
                />
              </div>
            </div>

            {/* PYQs Section */}
            <div>
              <div className="flex items-end justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-white tracking-tight mb-1">Past Year Questions</h2>
                  <p className="text-sm text-zinc-400">Previous university exam papers.</p>
                </div>
                <Link href="/pyqs" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">
                  View all PYQs
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <MaterialCard 
                  id="tos-pyq-2025" title="Dec 2025 Regular Paper" type="ZIP" downloads="2.2k" 
                />
                <MaterialCard 
                  id="tos-pyq-2024" title="Dec 2024 Regular Paper" type="ZIP" downloads="1.8k" 
                />
                <MaterialCard 
                  id="tos-pyq-2023" title="Dec 2023 Regular Paper" type="ZIP" downloads="1.1k" 
                />
              </div>
            </div>

          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
