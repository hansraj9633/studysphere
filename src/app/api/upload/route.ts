import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import clientPromise from "@/lib/mongodb";

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  try {
    console.log("----------------------------------------");
    console.log("[Upload API] 1. Request received");

    const formData = await req.formData();
    const file = formData.get("file") as File;
    const title = formData.get("title") as string;
    const subject = formData.get("subject") as string;
    const semester = formData.get("semester") as string;
    const fileType = formData.get("fileType") as string || "PDF";

    if (!file || !title || !subject || !semester) {
      console.error("[Upload API] Validation Failed: Missing fields");
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
    }

    console.log(`[Upload API] 2. Parsed FormData -> Title: ${title}, File size: ${file.size}`);

    // Buffer conversion
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 1. Cloudinary Upload (Strict mode, no fallbacks)
    console.log("[Upload API] 3. Uploading to Cloudinary...");
    let uploadResult: any;
    
    try {
      uploadResult = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "studysphere/materials", resource_type: "raw" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        uploadStream.end(buffer);
      });
    } catch (cloudError: any) {
      console.error("[Upload API] Cloudinary Error:", cloudError);
      throw new Error(`Cloudinary Upload Failed: ${cloudError.message || JSON.stringify(cloudError)}`);
    }

    const fileUrl = uploadResult.secure_url;
    const publicId = uploadResult.public_id;
    console.log(`[Upload API] 4. Cloudinary SUCCESS: ${fileUrl}`);

    // 2. Metadata Preparation
    const newMaterial = {
      title,
      subject,
      semester,
      fileType,
      fileUrl,
      publicId,
      downloads: 0,
      uploadedAt: new Date().toISOString(),
    };

    // 3. MongoDB Upload (Strict mode, no fallbacks)
    console.log("[Upload API] 5. Connecting to MongoDB Atlas...");
    const client = await clientPromise;
    const db = client.db("studysphere"); // Explicitly target 'studysphere' database
    
    // Ensure collection exists (not strictly necessary as insertOne creates it, but good practice)
    const result = await db.collection("materials").insertOne(newMaterial);
    
    console.log(`[Upload API] 6. MongoDB SUCCESS. ID: ${result.insertedId}`);
    console.log("[Upload API] 7. Upload process fully completed!");
    console.log("----------------------------------------");

    return NextResponse.json({
      success: true,
      message: "Material uploaded successfully",
      data: { 
        id: result.insertedId, 
        fileUrl, 
        title, 
        subject, 
        semester, 
        fileType, 
        uploadedAt: newMaterial.uploadedAt 
      }
    }, { status: 201 });

  } catch (error: any) {
    console.error("----------------------------------------");
    console.error("[Upload API] CRITICAL ERROR:", error.message || error);
    console.error("----------------------------------------");
    return NextResponse.json(
      { success: false, message: "Internal Server Error", error: error.message || "Unknown error" },
      { status: 500 }
    );
  }
}
