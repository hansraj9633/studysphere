import { BarChart3 } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center">
      <div className="w-20 h-20 bg-zinc-900 border border-zinc-800 rounded-3xl flex items-center justify-center mb-6 shadow-2xl">
        <BarChart3 size={32} className="text-zinc-500" />
      </div>
      <h1 className="text-3xl font-bold text-white tracking-tight mb-3">Analytics Coming Soon</h1>
      <p className="text-zinc-400 max-w-md">
        We are building a comprehensive analytics suite to track downloads and student engagement.
      </p>
    </div>
  );
}
