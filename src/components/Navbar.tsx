"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, UserCircle } from "lucide-react";

export default function Navbar() {
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Subjects", href: "/subjects/theory-of-structures" },
    { name: "PYQs", href: "/pyqs" },
    { name: "Bookmarks", href: "/bookmarks" },
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full border-b border-zinc-800/50 bg-black/60 backdrop-blur-xl"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo & Subtitle */}
        <div className="flex flex-col justify-center">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-zinc-800 text-white p-1.5 rounded-lg group-hover:bg-zinc-700 transition-colors">
              <BookOpen size={20} />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">StudySphere</span>
          </Link>
          <span className="text-[10px] text-zinc-500 uppercase tracking-widest mt-0.5 ml-9 font-medium">
            Your Personal Study Vault
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Admin Login */}
        <div className="flex items-center">
          <Link href="/admin" className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-zinc-300 bg-zinc-900/50 border border-zinc-800 rounded-full hover:bg-zinc-800 hover:text-white transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]">
            <UserCircle size={16} />
            <span>Admin</span>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
