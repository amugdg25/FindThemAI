import { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  if (!GEMINI_API_KEY) {
    return res.status(500).json({ error: "Server misconfiguration" });
  }

  const { userMessage } = req.body;

  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: userMessage }] }] }),
    });

    const data = await response.json();
    res.json({ response: data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't process that." });
  } catch (error) {
    console.error("Error fetching Gemini response:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
