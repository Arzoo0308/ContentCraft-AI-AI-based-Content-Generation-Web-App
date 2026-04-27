import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const Caption = ({ topic }) => {
  const [captions, setCaptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateCaptions = async () => {
    setLoading(true);
    setCaptions([]);

    const res = await axios.post(
      "http://localhost:5000/api/content/caption",
      { topic }
    );

    setCaptions(res.data.captions);
    setLoading(false);
  };

  return (
    <div>

      <motion.button
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
        onClick={generateCaptions}
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

      {captions.map((c, i) => (
  <motion.div
    key={i}
    className="bg-white/10 backdrop-blur-md p-4 rounded-xl flex justify-between items-center"
  >
    <p>{c}</p>
 
    <button
      onClick={() => navigator.clipboard.writeText(c)}
      className="bg-green-500 text-white px-3 py-1  rounded-md hover:bg-green-600"
    >
      Copy
    </button>
  </motion.div>
))}

    </div>

    
  );

};

export default Caption;