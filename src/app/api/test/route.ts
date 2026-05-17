import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    // Await the client promise to establish or retrieve the cached connection
    const client = await clientPromise;
    
    // Ping the database to confirm successful connection
    const db = client.db();
    await db.command({ ping: 1 });

    return NextResponse.json(
      {
        success: true,
        message: "MongoDB Connected Successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    
    return NextResponse.json(
      {
        success: false,
        message: "Failed to connect to MongoDB",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
