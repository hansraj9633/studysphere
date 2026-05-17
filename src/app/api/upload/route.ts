import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import clientPromise from "@/lib/mongodb";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    const file = formData.get("file") as File;
    const title = formData.get("title") as string;
    const subject = formData.get("subject") as string;
    const semester = formData.get("semester") as string;
    const fileType = formData.get("fileType") as string || "PDF";

    console.log("----------------------------------------");
    console.log(`[Upload API] Received upload request: ${title}`);
    console.log(`[Upload API] Subject: ${subject}, Semester: ${semester}`);

    // Validate inputs
    if (!file || !title || !subject || !semester) {
      return NextResponse.json(
        { success: false, message: "Missing required fields." },
        { status: 400 }
      );
    }

    // Validate file type (only allow PDFs)
    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { success: false, message: "Only PDF files are allowed." },
        { status: 400 }
      );
    }

    // Convert the File object to a Buffer to send to Cloudinary
    console.log(`[Upload API] Converting file to buffer (${file.size} bytes)...`);
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    console.log("[Upload API] Starting Cloudinary upload stream...");
    // Upload to Cloudinary using a Promise wrapper around upload_stream
    const uploadResult: any = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { 
          folder: "studysphere/materials",
          resource_type: "raw" // Required for PDFs and non-image files
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      
      // End the stream with the buffer
      uploadStream.end(buffer);
    });

    if (!uploadResult || !uploadResult.secure_url) {
      console.error("[Upload API] Cloudinary upload failed: No secure_url returned");
      throw new Error("Failed to upload to Cloudinary");
    }

    const fileUrl = uploadResult.secure_url;
    console.log(`[Upload API] Cloudinary upload SUCCESS! URL: ${fileUrl}`);

    // Save metadata to MongoDB
    console.log("[Upload API] Connecting to MongoDB...");
    const client = await clientPromise;
    const db = client.db();
    
    const newMaterial = {
      title,
      subject,
      semester,
      fileUrl,
      fileType,
      downloads: 0,
      uploadedAt: new Date(),
    };

    const result = await db.collection("materials").insertOne(newMaterial);
    console.log(`[Upload API] MongoDB insert SUCCESS! Document ID: ${result.insertedId}`);
    console.log("----------------------------------------");

    return NextResponse.json(
      {
        success: true,
        message: "Material uploaded successfully",
        data: {
          id: result.insertedId,
          fileUrl,
        }
      },
      { status: 201 }
    );
    
  } catch (error) {
    console.error("----------------------------------------");
    console.error("[Upload API] CRITICAL ERROR:");
    console.error(error);
    console.error("----------------------------------------");
    return NextResponse.json(
      { 
        success: false, 
        message: "Failed to process upload", 
        error: error instanceof Error ? error.message : "Unknown error" 
      },
      { status: 500 }
    );
  }
}
