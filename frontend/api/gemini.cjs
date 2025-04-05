module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  // Correctly fetch environment variable
  const GEMINI_API_KEY = process.env.SECRET_GEMINI_API_KEY;
  if (!GEMINI_API_KEY) {
    console.error("Missing GEMINI_API_KEY in environment variables");
    return res.status(500).json({ error: "Server misconfiguration" });
  }

  const { userMessage } = req.body;
  if (!userMessage) {
    return res.status(400).json({ error: "Missing user message" });
  }

  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: userMessage }] }] }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini API Error:", data);
      return res.status(500).json({ error: "Gemini API Error", details: data });
    }

    res.json({
      response:
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I couldn't process that.",
    });
  } catch (error) {
    console.error("Error fetching Gemini response:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
