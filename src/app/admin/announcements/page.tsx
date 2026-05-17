import { Megaphone } from "lucide-react";

export default function AnnouncementsPage() {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center">
      <div className="w-20 h-20 bg-zinc-900 border border-zinc-800 rounded-3xl flex items-center justify-center mb-6 shadow-2xl">
        <Megaphone size={32} className="text-zinc-500" />
      </div>
      <h1 className="text-3xl font-bold text-white tracking-tight mb-3">Announcements Coming Soon</h1>
      <p className="text-zinc-400 max-w-md">
        We are building a system to broadcast updates and announcements to all StudySphere students.
      </p>
    </div>
  );
}
