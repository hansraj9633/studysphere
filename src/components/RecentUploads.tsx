"use client";

import { motion } from "framer-motion";
import { FileText, FileArchive, Download, Eye, ArrowRight, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Material {
  _id: string;
  title: string;
  subject: string;
  semester: string;
  downloads: number;
  uploadedAt: string;
  fileType: string;
  fileUrl: string;
}

export default function RecentUploads() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await fetch("/api/materials");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Received non-JSON response from server");
        }
        const result = await response.json();
        if (result.success && Array.isArray(result.data)) {
          setMaterials(result.data.slice(0, 3)); // Only show top 3 on homepage
        } else {
          throw new Error(result.message || "Failed to fetch materials data");
        }
      } catch (error: any) {
        console.error("Failed to fetch materials:", error.message || error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMaterials();
  }, []);

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
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 text-zinc-500 gap-3">
              <Loader2 size={32} className="animate-spin" />
              <span className="text-sm">Loading recent uploads...</span>
            </div>
          ) : materials.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-zinc-500 gap-2 border border-dashed border-zinc-800 rounded-2xl">
              <FileText size={48} className="opacity-20 mb-2" />
              <span className="text-base font-medium text-zinc-400">No materials available yet</span>
              <span className="text-sm">Check back later for new study resources.</span>
            </div>
          ) : (
            materials.map((upload, index) => {
              const isPdf = upload.fileType.toLowerCase() === "pdf";
              const color = isPdf ? "text-blue-400" : "text-amber-400";
              const bg = isPdf ? "bg-blue-400/10" : "bg-amber-400/10";
              const Icon = isPdf ? FileText : FileArchive;
              
              return (
                <motion.div
                  key={upload._id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group flex flex-col md:flex-row items-start md:items-center justify-between p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800/50 hover:bg-zinc-800/40 hover:border-zinc-700 transition-all duration-300 gap-6"
                >
                  <div className="flex items-center gap-5">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${bg}`}>
                      <Icon className={`${color}`} size={24} />
                    </div>
                    
                    <div className="flex flex-col gap-1">
                      <h3 className="text-base font-semibold text-white tracking-tight group-hover:text-zinc-200 transition-colors">
                        {upload.title}
                      </h3>
                      <div className="flex items-center gap-3 text-xs font-medium text-zinc-500">
                        <span className="px-2 py-0.5 rounded-md bg-zinc-800/80 border border-zinc-700/50 text-zinc-300">
                          {upload.fileType}
                        </span>
                        <span className="flex items-center gap-1">
                          <Download size={12} />
                          {upload.downloads}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full md:w-auto mt-2 md:mt-0">
                    <Link href={`/view/${upload._id}`} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors duration-200">
                      <Eye size={16} />
                      Preview
                    </Link>
                    <a href={upload.fileUrl} target="_blank" rel="noopener noreferrer" className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white text-black text-sm font-semibold hover:bg-zinc-200 transition-colors duration-200">
                      <Download size={16} />
                      Download
                    </a>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
