import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Caption from "./Caption";
import Hashtag from "./Hashtag";
import Script from "./Script";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("caption");
  const [topic, setTopic] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-black text-white">

      {/* Floating Navbar */}
      <div className="flex justify-center pt-6">
        <div className="backdrop-blur-md bg-white/10 px-6 py-3 rounded-full shadow-lg flex gap-6">
          {["caption", "hashtag", "script"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1 rounded-full transition ${
                activeTab === tab
                  ? "bg-white text-black"
                  : "hover:bg-white/20"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Floating Input */}
      <div className="flex justify-center mt-10">
        <motion.input
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-[400px] p-4 rounded-xl bg-white/10 backdrop-blur-md outline-none text-white placeholder-gray-300 shadow-lg"
          placeholder="Enter your idea..."
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
      </div>

      {/* Animated Content */}
      <div className="mt-10 flex justify-center px-6">
        <div className="w-full max-w-2xl">

          <AnimatePresence mode="wait">
            {activeTab === "caption" && (
              <motion.div
                key="caption"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
              >
                <Caption topic={topic} />
              </motion.div>
            )}

            {activeTab === "hashtag" && (
              <motion.div
                key="hashtag"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
              >
                <Hashtag topic={topic} />
              </motion.div>
            )}

            {activeTab === "script" && (
              <motion.div
                key="script"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
              >
                <Script topic={topic} />
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;