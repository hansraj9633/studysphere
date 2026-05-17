"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Building2, 
  Map, 
  Droplets, 
  Calculator, 
  Compass, 
  Cuboid,
  ArrowRight
} from "lucide-react";

const subjects = [
  {
    title: "Theory of Structures",
    description: "Analysis of solid structures, beams, columns, and structural stability.",
    icon: Building2,
  },
  {
    title: "Highway Engineering",
    description: "Design, construction, and maintenance of roads and highways.",
    icon: Map,
  },
  {
    title: "Fluid Mechanics",
    description: "Behavior of fluids at rest and in motion, and their interactions.",
    icon: Droplets,
  },
  {
    title: "Engineering Mathematics",
    description: "Advanced mathematical methods and techniques used in engineering.",
    icon: Calculator,
  },
  {
    title: "Surveying",
    description: "Principles of mapping, leveling, and determining terrestrial positions.",
    icon: Compass,
  },
  {
    title: "Concrete Technology",
    description: "Properties, production, and applications of concrete materials.",
    icon: Cuboid,
  },
];

export default function PopularSubjects() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white tracking-tight mb-2">Popular Subjects</h2>
            <p className="text-zinc-400">Explore our most accessed engineering modules.</p>
          </div>
          <button className="text-sm font-medium text-zinc-300 hover:text-white flex items-center gap-2 group transition-colors">
            View All Subjects
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject, index) => (
            <motion.div
              key={subject.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-zinc-900/40 rounded-3xl p-8 border border-zinc-800/50 hover:border-zinc-700/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)] overflow-hidden"
            >
              {/* Subtle hover gradient glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="bg-zinc-800/80 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-zinc-800 transition-all duration-300">
                  <subject.icon className="text-zinc-300 group-hover:text-white transition-colors" size={24} />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                  {subject.title}
                </h3>
                
                <p className="text-zinc-400 text-sm leading-relaxed mb-8 flex-grow">
                  {subject.description}
                </p>
                
                <Link href="/subjects/theory-of-structures" className="inline-flex items-center justify-between w-full bg-zinc-800/50 hover:bg-zinc-200 text-zinc-300 hover:text-black py-3 px-5 rounded-2xl text-sm font-semibold transition-all duration-300 mt-auto">
                  Open Subject
                  <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
