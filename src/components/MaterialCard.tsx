"use client";

import { motion } from "framer-motion";
import { FileText, FileArchive, Download, Eye, Bookmark, BookmarkCheck } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface MaterialCardProps {
  id: string;
  title: string;
  type: "PDF" | "ZIP" | "DOCX";
  downloads: string;
  initialBookmarked?: boolean;
}

export default function MaterialCard({ id, title, type, downloads, initialBookmarked = false }: MaterialCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);

  const isPdf = type === "PDF";
  const iconColor = isPdf ? "text-blue-400" : "text-amber-400";
  const iconBg = isPdf ? "bg-blue-400/10" : "bg-amber-400/10";
  const Icon = isPdf ? FileText : FileArchive;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative flex flex-col p-5 rounded-3xl bg-zinc-900/40 border border-zinc-800/50 hover:bg-zinc-900/80 hover:border-zinc-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="absolute top-4 right-4 z-10">
        <button 
          onClick={() => setIsBookmarked(!isBookmarked)}
          className="p-2 rounded-full bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-400 hover:text-white transition-colors"
        >
          {isBookmarked ? (
            <BookmarkCheck size={18} className="text-white fill-white/20" />
          ) : (
            <Bookmark size={18} />
          )}
        </button>
      </div>

      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${iconBg}`}>
        <Icon className={`${iconColor}`} size={28} />
      </div>

      <div className="flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-white tracking-tight mb-2 line-clamp-2 leading-tight group-hover:text-zinc-200 transition-colors">
          {title}
        </h3>
        
        <div className="flex items-center gap-3 text-xs font-medium text-zinc-500 mb-6">
          <span className="px-2 py-0.5 rounded-md bg-zinc-800/80 border border-zinc-700/50 text-zinc-300">
            {type}
          </span>
          <span className="flex items-center gap-1">
            <Download size={12} />
            {downloads} downloads
          </span>
        </div>

        <div className="flex items-center gap-2 mt-auto pt-4 border-t border-zinc-800/50">
          <Link href={`/view/${id}`} className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-zinc-800/50 hover:bg-zinc-700 text-sm font-medium text-white transition-colors duration-200">
            <Eye size={16} />
            Preview
          </Link>
          <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-white text-black text-sm font-semibold hover:bg-zinc-200 transition-colors duration-200">
            <Download size={16} />
            Save
          </button>
        </div>
      </div>
    </motion.div>
  );
}
