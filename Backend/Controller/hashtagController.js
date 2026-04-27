const axios = require("axios");

const generateHashtags = async (req, res) => {
  try {
    const { topic } = req.body;

    const prompt = `
Generate 10 trending hashtags for "${topic}".

Return one hashtag per line.
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
      return res.status(400).json({ error: "No hashtags generated" });
    }

    const hashtags = text
      .split("\n")
      .map(tag => tag.trim())
      .filter(tag => tag.startsWith("#"));

    res.json({ hashtags });

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
  type: "hashtag",
  data: hashtags
});
};

module.exports = { generateHashtags };