import type { Config } from "@netlify/functions";

export default async (req: Request) => {
  const siteUrl = process.env.URL || "http://localhost:3000";
  const cronSecret = process.env.CRON_SECRET;

  console.log(`[Keep-Alive] Triggering keep-alive API at: ${siteUrl}/api/keep-alive`);

  try {
    const headers: Record<string, string> = {};
    if (cronSecret) {
      headers["Authorization"] = `Bearer ${cronSecret}`;
    }

    const response = await fetch(`${siteUrl}/api/keep-alive`, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API returned status ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log("[Keep-Alive] API response:", data);
  } catch (error) {
    console.error("[Keep-Alive] Error calling keep-alive API:", error);
  }
};

export const config: Config = {
  // Cron expression: runs at 00:00 every 3 days
  schedule: "0 0 */3 * *",
};
