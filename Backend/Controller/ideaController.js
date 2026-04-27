const axios = require("axios");

const generateIdeas = async (req, res) => {
  try {
    const { topic } = req.body;

    const prompt = `
Generate 5 content ideas for "${topic}".

For each idea give:
Title:
Description:
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
      return res.status(400).json({ error: "No ideas generated" });
    }

    res.json({ ideas: text });

  } catch (error) {
    console.log(error.response?.data || error.message);
    res.status(500).json({ error: "Error generating ideas" });
  }
};

module.exports = { generateIdeas };