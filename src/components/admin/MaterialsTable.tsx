"use client";

import { Edit2, Trash2, FileText, FileArchive } from "lucide-react";

const materials = [
  {
    id: 1,
    name: "Theory of Structures Unit 3 Notes",
    subject: "Theory of Structures",
    semester: "Semester 5",
    downloads: "1.2k",
    date: "Oct 24, 2026",
    type: "pdf",
  },
  {
    id: 2,
    name: "Highway Engineering PYQs 2020-2025",
    subject: "Highway Engineering",
    semester: "Semester 5",
    downloads: "850",
    date: "Oct 22, 2026",
    type: "zip",
  },
  {
    id: 3,
    name: "Fluid Mechanics Formula Sheet",
    subject: "Fluid Mechanics",
    semester: "Semester 3",
    downloads: "2.3k",
    date: "Oct 20, 2026",
    type: "pdf",
  },
  {
    id: 4,
    name: "Engineering Math IV Assignment",
    subject: "Engineering Mathematics",
    semester: "Semester 4",
    downloads: "420",
    date: "Oct 18, 2026",
    type: "pdf",
  },
];

export default function MaterialsTable() {
  return (
    <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-xl overflow-hidden">
      <div className="p-6 border-b border-zinc-800/60 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white">Recent Materials</h3>
        <button className="text-sm text-zinc-400 hover:text-white transition-colors">
          View All
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-zinc-400">
          <thead className="bg-zinc-900/50 text-xs uppercase font-medium text-zinc-500 border-b border-zinc-800/60">
            <tr>
              <th className="px-6 py-4">File Name</th>
              <th className="px-6 py-4 hidden md:table-cell">Subject</th>
              <th className="px-6 py-4 hidden lg:table-cell">Semester</th>
              <th className="px-6 py-4">Downloads</th>
              <th className="px-6 py-4 hidden sm:table-cell">Date</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60">
            {materials.map((mat) => (
              <tr key={mat.id} className="hover:bg-zinc-800/20 transition-colors group">
                <td className="px-6 py-4 font-medium text-zinc-200 flex items-center gap-3">
                  {mat.type === "pdf" ? (
                    <FileText size={16} className="text-blue-400" />
                  ) : (
                    <FileArchive size={16} className="text-amber-400" />
                  )}
                  <span className="truncate max-w-[200px] sm:max-w-xs">{mat.name}</span>
                </td>
                <td className="px-6 py-4 hidden md:table-cell">{mat.subject}</td>
                <td className="px-6 py-4 hidden lg:table-cell">
                  <span className="px-2.5 py-1 rounded-md bg-zinc-800/50 border border-zinc-700/50 text-xs">
                    {mat.semester}
                  </span>
                </td>
                <td className="px-6 py-4">{mat.downloads}</td>
                <td className="px-6 py-4 hidden sm:table-cell text-zinc-500">{mat.date}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 text-zinc-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-md transition-colors">
                      <Edit2 size={16} />
                    </button>
                    <button className="p-1.5 text-zinc-400 hover:text-red-400 hover:bg-red-400/10 rounded-md transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
