const axios = require("axios");

const generateCaption = async (req, res) => {
  try {
    const { topic, platform = "Instagram" } = req.body;

    const prompt = `
Generate 5 ${platform} captions about "${topic}".

Return ONLY like:
1. ...
2. ...
3. ...
4. ...
5. ...
`;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }]
      }
    );

    const text =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      return res.status(400).json({ error: "No captions generated" });
    }

    const captions = text
      .split("\n")
      .filter(line => line.trim() !== "")
      .map(line => line.replace(/^\d+\.\s*/, ""));

    res.json({ captions });

  } catch (error) {
  if (error.response?.status === 429) {
    return res.json({
      captions: ["⚠️ API limit reached. Try again later."]
    });
  }

  res.status(500).json({ error: "Server error" });
}

  const Content = require("../Models/caption");

await Content.create({
  topic,
  type: "caption",
  data: captions
});



};


module.exports = { generateCaption };