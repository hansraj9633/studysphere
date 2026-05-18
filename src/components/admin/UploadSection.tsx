"use client";

import { UploadCloud, Loader2 } from "lucide-react";
import { useState, useRef } from "react";
import toast from "react-hot-toast";

export default function UploadSection() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [semester, setSemester] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === "application/pdf") {
        setFile(selectedFile);
        console.log("File selected:", selectedFile.name);
      } else {
        toast.error("Only PDF files are allowed!");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submit triggered!");

    if (!file) return toast.error("Please select a PDF file.");
    if (!title.trim()) return toast.error("Please enter a title.");
    if (!subject) return toast.error("Please select a subject.");
    if (!semester) return toast.error("Please select a semester.");

    setIsUploading(true);
    const toastId = toast.loading("Uploading material to server...");

    try {
      console.log("Preparing FormData...");
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", title);
      formData.append("subject", subject);
      formData.append("semester", semester);
      formData.append("fileType", "PDF");

      console.log("Calling POST /api/upload...");
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("API Response received:", data);

      if (response.ok && data.success) {
        toast.success("Material uploaded successfully!", { id: toastId });
        
        // Reset form completely
        setFile(null);
        setTitle("");
        setSubject("");
        setSemester("");
        if (fileInputRef.current) fileInputRef.current.value = "";
        
        // Trigger UI refresh
        console.log("Dispatching materialUploaded event...");
        window.dispatchEvent(new Event("materialUploaded"));
      } else {
        throw new Error(data.message || "Failed to upload");
      }
    } catch (error: any) {
      console.error("Upload Error:", error);
      toast.error(error.message || "An unexpected error occurred", { id: toastId });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-xl p-6 flex flex-col h-full w-full">
      <h3 className="text-lg font-semibold text-white mb-4">Upload New Material</h3>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-1">
        
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-zinc-400">Material Title</label>
          <input 
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Complete Unit Notes" 
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-zinc-600"
            disabled={isUploading}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-zinc-400">Subject</label>
            <select 
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-zinc-600"
              disabled={isUploading}
            >
              <option value="">Select Subject...</option>
              <option value="theory_structures">Theory of Structures</option>
              <option value="highway_eng">Highway Engineering</option>
              <option value="fluid_mech">Fluid Mechanics</option>
              <option value="eng_math">Engineering Mathematics</option>
            </select>
          </div>
          
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-zinc-400">Semester</label>
            <select 
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-zinc-600"
              disabled={isUploading}
            >
              <option value="">Select Sem...</option>
              <option value="1">Semester 1</option>
              <option value="2">Semester 2</option>
              <option value="3">Semester 3</option>
              <option value="4">Semester 4</option>
              <option value="5">Semester 5</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-zinc-400">PDF File</label>
          <label className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-zinc-700 bg-zinc-900/50 hover:bg-zinc-800 rounded-xl cursor-pointer transition-colors">
            <UploadCloud size={20} className={file ? "text-blue-400" : "text-zinc-400"} />
            <span className="text-sm font-medium text-zinc-300">
              {file ? file.name : "Browse for PDF"}
            </span>
            <input 
              type="file" 
              accept="application/pdf"
              className="hidden" 
              onChange={handleFileChange}
              ref={fileInputRef}
              disabled={isUploading}
            />
          </label>
          {file && (
            <button 
              type="button" 
              onClick={() => { setFile(null); if (fileInputRef.current) fileInputRef.current.value = ""; }} 
              className="text-xs text-red-400 text-right hover:underline mt-1"
            >
              Remove selected file
            </button>
          )}
        </div>

        <button 
          type="submit" 
          disabled={isUploading}
          className="mt-auto w-full flex items-center justify-center gap-2 py-3 bg-white text-black hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-sm font-semibold transition-all duration-200"
        >
          {isUploading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Processing Upload...
            </>
          ) : (
            "Upload Material"
          )}
        </button>
      </form>
    </div>
  );
}
