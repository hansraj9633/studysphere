"use client";

import { FileText, Download, BookOpen, Clock } from "lucide-react";

const stats = [
  {
    name: "Total Materials",
    value: "1,248",
    change: "+12% from last month",
    icon: FileText,
    color: "text-blue-400",
  },
  {
    name: "Total Downloads",
    value: "45.2K",
    change: "+18% from last month",
    icon: Download,
    color: "text-emerald-400",
  },
  {
    name: "Total Subjects",
    value: "42",
    change: "+3 new this semester",
    icon: BookOpen,
    color: "text-amber-400",
  },
  {
    name: "Recent Uploads",
    value: "24",
    change: "In the last 7 days",
    icon: Clock,
    color: "text-purple-400",
  },
];

export default function StatCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className="bg-zinc-900/40 border border-zinc-800/60 rounded-xl p-5 hover:bg-zinc-900/60 hover:border-zinc-700/80 transition-all duration-300"
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-medium text-zinc-400">{stat.name}</h3>
            <div className={`p-2 bg-zinc-800/50 rounded-lg ${stat.color}`}>
              <stat.icon size={16} />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-white mb-1 tracking-tight">{stat.value}</p>
            <p className="text-xs font-medium text-zinc-500">{stat.change}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
