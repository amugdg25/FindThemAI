import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const ChatbotBtn = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const location = useLocation();

  // Hide button on chatbot page
  if (location.pathname === "/chatbot") return null;

  return (
    <div
      className="fixed bottom-6 right-6 flex flex-col items-center"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Tooltip Popup */}
      {showTooltip && (
        <motion.div
          className="mb-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
        >
          Ask our chatbot!
        </motion.div>
      )}

      {/* Chatbot Button */}
      <motion.span
        className="cursor-pointer flex items-center justify-center dark:bg-gray-900 bg-gray-300 dark:shadow-gray-950 shadow-gray-300 shadow-2xl w-16 h-16 rounded-full"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
      >
        <Link to="/chatbot">
          <img
            src="./icons/chatbot.svg"
            alt="chatbot"
            className="w-10 aspect-square dark:invert invert-0"
          />
        </Link>
      </motion.span>
    </div>
  );
};

export default ChatbotBtn;
