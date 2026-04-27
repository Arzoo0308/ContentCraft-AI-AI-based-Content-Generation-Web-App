const axios = require("axios");

const generateScript = async (req, res) => {
  try {
    const { topic } = req.body;

    const prompt = `
Write a short social media video script about "${topic}".

Structure:
Hook:
Content:
Call To Action:
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
      return res.status(400).json({ error: "No script generated" });
    }

    res.json({ script: text });

  } catch (error) {
  if (error.response?.status === 429) {
    return res.json({
      captions: ["⚠️ API limit reached. Try again later."]
    });
  }

  res.status(500).json({ error: "Server error" });
}
  await Content.create({
  topic,
  type: "script",
  data: [text]
});
};

module.exports = { generateScript };