import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SearchArea from "@/components/SearchArea";
import PopularSubjects from "@/components/PopularSubjects";
import RecentUploads from "@/components/RecentUploads";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-black selection:bg-zinc-800 selection:text-white">
      <Navbar />
      <main className="flex-1 w-full relative">
        {/* Subtle grid background pattern for the futuristic feel */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-40 z-0" />
        
        <Hero />
        <SearchArea />
        <PopularSubjects />
        <RecentUploads />
      </main>
      <Footer />
    </div>
  );
}
