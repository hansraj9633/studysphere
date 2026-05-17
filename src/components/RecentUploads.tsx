"use client";

import { motion } from "framer-motion";
import { FileText, FileArchive, Download, Eye, ArrowRight } from "lucide-react";

const uploads = [
  {
    title: "Theory of Structures Unit 3 Notes",
    type: "PDF",
    downloads: "1.2k",
    icon: FileText,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
  },
  {
    title: "Highway Engineering PYQs",
    type: "ZIP",
    downloads: "850",
    icon: FileArchive,
    color: "text-amber-400",
    bg: "bg-amber-400/10",
  },
  {
    title: "Fluid Mechanics Formula Sheet",
    type: "PDF",
    downloads: "2.3k",
    icon: FileText,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
  },
];

export default function RecentUploads() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white tracking-tight mb-2">Recent Uploads</h2>
            <p className="text-zinc-400">Latest study materials shared by the community.</p>
          </div>
          <button className="text-sm font-medium text-zinc-300 hover:text-white flex items-center gap-2 group transition-colors">
            View All Uploads
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {uploads.map((upload, index) => (
            <motion.div
              key={upload.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group flex flex-col md:flex-row items-start md:items-center justify-between p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800/50 hover:bg-zinc-800/40 hover:border-zinc-700 transition-all duration-300 gap-6"
            >
              <div className="flex items-center gap-5">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${upload.bg}`}>
                  <upload.icon className={`${upload.color}`} size={24} />
                </div>
                
                <div className="flex flex-col gap-1">
                  <h3 className="text-base font-semibold text-white tracking-tight group-hover:text-zinc-200 transition-colors">
                    {upload.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs font-medium text-zinc-500">
                    <span className="px-2 py-0.5 rounded-md bg-zinc-800/80 border border-zinc-700/50 text-zinc-300">
                      {upload.type}
                    </span>
                    <span className="flex items-center gap-1">
                      <Download size={12} />
                      {upload.downloads}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto mt-2 md:mt-0">
                <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors duration-200">
                  <Eye size={16} />
                  Preview
                </button>
                <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white text-black text-sm font-semibold hover:bg-zinc-200 transition-colors duration-200">
                  <Download size={16} />
                  Download
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
