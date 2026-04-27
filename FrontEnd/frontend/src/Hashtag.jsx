import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const Hashtag = ({ topic }) => {
  const [hashtags, setHashtags] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateHashtags = async () => {
    setLoading(true);
    setHashtags([]);

    const res = await axios.post(
      "http://localhost:5000/api/content/hashtags",
      { topic }
    );

    setHashtags(res.data.hashtags);
    setLoading(false);
  };

  return (
    <div>

      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        onClick={generateHashtags}
        className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-2 rounded-xl shadow-lg"
      >
        Generate ✨
      </motion.button>

      
      {loading && (
        <motion.div
          className="mt-6 h-20 bg-purple-500/20 rounded-xl blur-xl"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        />
      )}

  
      <div className="mt-6 flex flex-wrap gap-3">
        {hashtags.map((tag, i) => (
  <motion.span
    key={i}
    onClick={() => navigator.clipboard.writeText(tag)}
    className="cursor-pointer bg-white/10 px-3 py-1 rounded-full hover:scale-110 transition"
  >
    {tag}
  </motion.span>
))}


       
      </div>

    </div>
  );
};

export default Hashtag;