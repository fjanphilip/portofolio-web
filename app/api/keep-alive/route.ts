import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  // Optional security: verify the request is authorized using a secret key
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token") || request.headers.get("Authorization")?.split(" ")[1];
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && token !== cronSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Perform a lightweight query to the Supabase database to keep it active
    // SELECT 1 is the lightest query possible to test the connection and trigger DB activity
    await prisma.$queryRaw`SELECT 1`;

    return NextResponse.json({
      success: true,
      message: "Database successfully pinged to keep it active.",
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    console.error("Database keep-alive ping failed:", error);
    return NextResponse.json({
      success: false,
      error: error.message || "Failed to query database"
    }, { status: 500 });
  }
}
