export default function Footer() {
  return (
    <footer className="border-t border-zinc-800/50 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between text-sm text-zinc-500">
        <p>© 2026 StudySphere • Built for students.</p>
        <div className="mt-4 md:mt-0 flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
}
