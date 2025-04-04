import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Tooltip } from "react-tooltip";

const ChatbotBtn = () => {
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkDarkMode = () => {
      if (typeof window !== "undefined") {
        // Check if the <html> tag has the 'dark' class (Tailwind's dark mode)
        setIsDarkMode(document.documentElement.classList.contains("dark"));
      }
    };

    checkDarkMode(); // Check on load

    // Observe class changes on <html> (for frameworks like Next.js where theme changes dynamically)
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // Hide button on chatbot page
  if (location.pathname === "/chatbot") return null;

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-center">
      <Tooltip
        anchorSelect=".chatbot-tip"
        place="left"
        variant="info"
        delayHide={0}
        style={{
          backgroundColor: isDarkMode ? "#101828" : "#d1d5dc", // Dark or light mode background
          color: isDarkMode ? "#ffffff" : "#000000", // Text color
          fontSize: "14px",
          padding: "8px 12px",
          borderRadius: "6px",
        }}
      >
        Need help? Chat with me!
      </Tooltip>

      {/* Chatbot Button */}
      <motion.span
        className="chatbot-tip cursor-pointer flex items-center justify-center dark:bg-gray-900 bg-gray-300 dark:shadow-gray-950 shadow-gray-300 shadow-2xl w-16 h-16 rounded-full"
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
