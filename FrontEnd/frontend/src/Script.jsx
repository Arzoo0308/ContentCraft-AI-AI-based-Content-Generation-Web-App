import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const Script = ({ topic }) => {
  const [script, setScript] = useState("");
  const [loading, setLoading] = useState(false);

  const generateScript = async () => {
    setLoading(true);
    setScript("");

    const res = await axios.post(
      "http://localhost:5000/api/content/script",
      { topic }
    );

    setScript(res.data.script);
    setLoading(false);
  };

  return (
    <div>

      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        onClick={generateScript}
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

    
      {script && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/10 shadow-lg whitespace-pre-line"
        >
          {script}

          
          <button
            onClick={() => navigator.clipboard.writeText(script)}
            className="mt-4 bg-green-500 px-3 py-1 rounded-md text-white hover:bg-green-600"
          >
            Copy
          </button>
        </motion.div>
      )}

    </div>
  );
};

export default Script;