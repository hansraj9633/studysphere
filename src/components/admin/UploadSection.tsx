"use client";

import { UploadCloud, X, Loader2 } from "lucide-react";
import { useState, useRef } from "react";
import toast from "react-hot-toast";

export default function UploadSection() {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [semester, setSemester] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === "application/pdf") {
        setFile(droppedFile);
      } else {
        toast.error("Only PDF files are allowed");
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === "application/pdf") {
        setFile(selectedFile);
      } else {
        toast.error("Only PDF files are allowed");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) return toast.error("Please select a PDF file to upload");
    if (!title.trim()) return toast.error("Please enter a title");
    if (!subject) return toast.error("Please select a subject");
    if (!semester) return toast.error("Please select a semester");

    setIsUploading(true);
    const toastId = toast.loading("Uploading material...");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", title);
      formData.append("subject", subject);
      formData.append("semester", semester);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Material uploaded successfully!", { id: toastId });
        // Reset form
        setFile(null);
        setTitle("");
        setSubject("");
        setSemester("");
        if (fileInputRef.current) fileInputRef.current.value = "";
        
        // Dispatch event to refresh MaterialsTable
        window.dispatchEvent(new Event("materialUploaded"));
      } else {
        throw new Error(data.message || "Failed to upload");
      }
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "An error occurred during upload", { id: toastId });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-xl p-6 flex flex-col h-full">
      <h3 className="text-lg font-semibold text-white mb-4">Quick Upload</h3>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-1">
        {/* Title Input */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-zinc-400">Material Title</label>
          <input 
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Unit 3 Complete Notes" 
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-600 transition-colors"
            required
            disabled={isUploading}
          />
        </div>

        {/* Drag & Drop Area */}
        <div 
          className={`relative flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-xl transition-all duration-200 ${
            dragActive ? "border-blue-500 bg-blue-500/5" : "border-zinc-700 bg-zinc-900/50 hover:bg-zinc-800/50 hover:border-zinc-600"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {file ? (
            <div className="flex flex-col items-center">
              <div className="p-3 bg-blue-500/10 rounded-full mb-3">
                <UploadCloud size={24} className="text-blue-400" />
              </div>
              <p className="text-sm font-medium text-white mb-1 truncate max-w-[200px]">
                {file.name}
              </p>
              <p className="text-xs text-zinc-400 mb-4">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
              <button 
                type="button"
                onClick={() => setFile(null)}
                className="text-xs text-red-400 hover:text-red-300 font-medium"
                disabled={isUploading}
              >
                Remove File
              </button>
            </div>
          ) : (
            <>
              <div className="p-3 bg-zinc-800 rounded-full mb-3">
                <UploadCloud size={24} className={dragActive ? "text-blue-400" : "text-zinc-400"} />
              </div>
              <p className="text-sm font-medium text-white mb-1">
                Drag & drop PDF here
              </p>
              <p className="text-xs text-zinc-500 mb-4 text-center">
                Supported formats: PDF (Max 50MB)
              </p>
              <label className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold rounded-lg cursor-pointer transition-colors">
                Browse Files
                <input 
                  type="file" 
                  accept="application/pdf"
                  className="hidden" 
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  disabled={isUploading}
                />
              </label>
            </>
          )}
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-zinc-400">Subject</label>
            <select 
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-zinc-600 transition-colors appearance-none cursor-pointer"
              required
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
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-zinc-600 transition-colors appearance-none cursor-pointer"
              required
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

        <button 
          type="submit" 
          disabled={isUploading || !file || !title || !subject || !semester}
          className="mt-auto w-full flex items-center justify-center gap-2 py-2.5 bg-white text-black hover:bg-zinc-200 disabled:opacity-50 disabled:hover:bg-white rounded-lg text-sm font-semibold transition-all duration-200 active:scale-[0.98]"
        >
          {isUploading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Uploading...
            </>
          ) : (
            "Upload Material"
          )}
        </button>
      </form>
    </div>
  );
}
