import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    
    // Fetch materials sorted by newest first
    const materials = await db
      .collection("materials")
      .find({})
      .sort({ uploadedAt: -1 })
      .toArray();

    return NextResponse.json(
      {
        success: true,
        data: materials,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Materials Fetch API Error:", error);
    return NextResponse.json(
      { 
        success: false, 
        message: "Failed to fetch materials", 
        error: error instanceof Error ? error.message : "Unknown error" 
      },
      { status: 500 }
    );
  }
}
