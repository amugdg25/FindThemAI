import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import "../index.css";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Chatbot = () => {
  const [messages, setMessages] = useState<
    { text?: string; sender: string; image?: string }[]
  >([]);
  const [input, setInput] = useState("");
  const [distanceFromBottom, setDistanceFromBottom] = useState(0);

  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        chatContainerRef.current;
      const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);
      setDistanceFromBottom(distanceFromBottom);
    }
  };

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      chatContainer.addEventListener("scroll", handleScroll, { passive: true });

      return () => {
        chatContainer.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages([...messages, { text: input, sender: "user" }]);

    setTimeout(scrollToBottom, 100);
    setInput("");

    // Simulate bot response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: "I'm just a sample bot! 😊", sender: "bot" },
      ]);
      setTimeout(scrollToBottom, 100);
    }, 1000);
  };

  const scrollToBottom = () => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setMessages((prev) => [
          ...prev,
          { sender: "user", image: reader.result as string },
        ]);
        setTimeout(scrollToBottom, 100);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="max-w-screen lg:max-w-4xl w-screen max-h-[85vh] mx-0 lg:mx-auto p-0 lg:p-2 mt-6 lg:mt-0 bg-gray-100 shadow-2xl shadow-gray-300 dark:shadow-gray-900 dark:bg-gray-700 rounded-none lg:rounded-2xl scrollbar-hidden"
    >
      <div className="relative lg:min-w-md w-full h-[85vh] rounded-lg flex flex-col items-center justify-between">
        {messages.length === 0 && (
          <>
            <span className="mt-6 hidden lg:flex items-center justify-center w-12 aspect-square rounded-2xl text-xl font-semibold text-gray-800 dark:text-white bg-white dark:bg-gray-800 text-center mb-2">
              <img
                src="./logo.svg"
                alt="logo"
                className="w-10 dark:invert-0 invert aspect-square"
              />
            </span>
            <span className="lg:mt-0 mt-6 text-center w-[80%] text-gray-800 dark:text-white flex flex-col items-center justify-center">
              <p className="text-lg font-semibold text-gray-600 dark:text-gray-400">
                Hello! 👋
              </p>
              <p className="text-lg font-semibold">
                I’m the FindThem assistant. How can I assist you today?
              </p>
              <p className="lg:w-98 text-sm mt-2 text-gray-700 opacity-70 dark:text-gray-300">
                You can ask me about missing persons or{" "}
                <strong className="text-red-500">report a case</strong> directly
                through chat.
              </p>
            </span>
          </>
        )}

        <div
          className="flex-1 w-[95%] lg:w-md overflow-y-auto h-80 p-2 mt-6 rounded-md flex flex-col scrollbar-hidden"
          ref={chatContainerRef}
        >
          {messages.map((msg, index) => (
            <span
              key={index}
              className={`my-1 rounded-3xl inline-block max-w-[80%] ${
                msg.sender === "user"
                  ? "bg-gray-300 dark:bg-gray-800 text-gray-800 dark:text-white ml-auto"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
              }`}
            >
              {msg.image ? (
                <img
                  src={msg.image}
                  alt="Uploaded"
                  className="max-w-[200px] rounded-3xl"
                />
              ) : (
                <p className="break-words whitespace-pre-line my-2 mx-3">
                  {msg.text}
                </p>
              )}
            </span>
          ))}

          <div ref={chatEndRef} />
        </div>

        {/* Scroll to Bottom Button (Hidden when at the bottom) */}
        {distanceFromBottom > 50 && (
          <button
            onClick={scrollToBottom}
            className="fixed flex items-center justify-center bottom-24 bg-gray-400 dark:bg-gray-600 w-8 h-8 dark:text-white text-gray-100 p-2 rounded-full shadow-md font-bold cursor-pointer"
          >
            ↓
          </button>
        )}

        <div className="lg:mb-4 mb-2 flex lg:min-w-md h-12 bg-gray-300 dark:bg-gray-600 p-2 rounded-4xl sticky bottom-0">
          <span
            className="w-8 h-8 bg-gray-100 dark:bg-gray-500 flex items-center justify-center rounded-full cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <img
              src="./icons/upload-image.svg"
              alt="upload"
              className="w-4 aspect-square invert dark:invert-0"
            />
          </span>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
          <input
            type="text"
            className="flex-1 p-2 outline-none dark:text-white"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            className="bg-[#634aff] text-white px-4 rounded-4xl font-bold hover:bg-[#5d549a] transition"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Chatbot;
