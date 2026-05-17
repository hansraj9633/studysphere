"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Upload, 
  BookOpen, 
  FileText, 
  BarChart3, 
  Megaphone, 
  Settings, 
  LogOut 
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Upload Materials", href: "/admin/upload", icon: Upload },
  { name: "Subjects", href: "/admin/subjects", icon: BookOpen },
  { name: "PYQs", href: "/admin/pyqs", icon: FileText },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { name: "Announcements", href: "/admin/announcements", icon: Megaphone },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-zinc-800/50 bg-black h-screen sticky top-0 flex flex-col hidden md:flex">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-zinc-800 text-white p-1.5 rounded-lg">
            <BookOpen size={20} />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">StudySphere</span>
        </Link>
        <div className="mt-1 ml-9">
          <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-medium bg-zinc-900 px-2 py-0.5 rounded-full border border-zinc-800">
            Admin Panel
          </span>
        </div>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive 
                  ? "bg-zinc-800/50 text-white border border-zinc-700/50 shadow-[0_0_15px_rgba(255,255,255,0.03)]" 
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50 border border-transparent"
              }`}
            >
              <item.icon size={18} className={isActive ? "text-white" : "text-zinc-500"} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-zinc-800/50 space-y-1">
        <Link
          href="/admin/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50 border border-transparent transition-all duration-200"
        >
          <Settings size={18} className="text-zinc-500" />
          Settings
        </Link>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400/80 hover:text-red-400 hover:bg-red-950/30 border border-transparent transition-all duration-200">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}
