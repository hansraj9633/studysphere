import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("studysphere"); // Explicitly target 'studysphere' database
    
    // Fetch materials sorted by newest first
    const materials = await db
      .collection("materials")
      .find({})
      .sort({ uploadedAt: -1 })
      .toArray();

    return NextResponse.json(
      { success: true, materials: materials, data: materials },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("[Materials API] CRITICAL ERROR:", error.message || error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch materials", error: error.message || "Unknown error" },
      { status: 500 }
    );
  }
}
