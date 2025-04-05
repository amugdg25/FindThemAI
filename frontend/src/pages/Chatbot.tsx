import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import "../index.css";
import { addMissingPerson, fetchGeminiResponse } from "../services/api";
import ReactMarkdown from "react-markdown";

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
  const [isTyping, setIsTyping] = useState(false);

  const [uploadedImage, setUploadedImage] = useState<File | undefined>();
  const [previewImage, setPreviewImage] = useState<string | undefined>();

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

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);

    setInput("");
    setIsTyping(true);
    setTimeout(() => {
      scrollToBottom();
    }, 100);

    // Store conversation history
    const conversationHistory = messages
      .map((msg) => `${msg.sender}: ${msg.text}`)
      .join("\n");

    // **Optimized Prompt**
    const reportWrapperPrompt = `
      You are an AI assistant for reporting missing persons. Your task is to gather these details in the user's language:
      - Name, Age, Date of Disappearance
      - Image of the missing person
      - Last Seen Location, Home Address, Frequent Places
      - Physical Description, Clothing Last Seen, Notes
      - Issuer’s Name, Mobile, Email  
    
      **Instructions:**
      - Convert the date format to YYYY-MM-DD
      - Give a properly formatted response.
      - Only ask for missing details. Do not repeat previously provided information.
      - If the user asks about our service (e.g., how missing persons are found, response time, or how we will contact them), provide clear and helpful answers.
      - If the user asks unrelated questions that are not about the service, politely bring them back on topic.
      - Once all details are collected, display the full report only once for confirmation:
        "Please confirm the following details:\n\n[full report here]\n\nIs everything correct?"
      - If the user confirms, respond with:
        "#find#~name~age~dateOfDisappearance~lastSeenLocation~homeAddress~frequentPlaces~physicalDescription~clothingLastSeen~notes~issuerName~mobile~email~".

      **Service Information:**  
      - We use advanced facial recognition and web crawling to search for missing persons.
    
      **Conversation History:**
      ${conversationHistory}
      
      User: "${input}"
    `;

    // Fetch Gemini API response with wrapped prompt
    const botResponseText = await fetchGeminiResponse(reportWrapperPrompt);

    if (botResponseText.startsWith("#find#")) {
      // Extract details by removing "#find#" and storing the rest
      const reportData = botResponseText
        .replace("#find#", "")
        .trim()
        .split("~")
        .slice(1);

      const [
        fullName,
        age,
        dateOfDisappearance,
        lastSeenLocation,
        homeAddress,
        frequentPlaces,
        physicalDescription,
        clothingLastSeen,
        additionalNotes,
        issuerName,
        issuerMobileNumber,
        issuerEmailAddress,
      ] = reportData;

      const data = new FormData();

      data.append("name", fullName);
      data.append("date_of_disappearance", dateOfDisappearance);
      data.append("age", age);
      data.append("last_seen_location", lastSeenLocation);
      data.append("home_address", homeAddress);
      data.append("places_frequently_visited", frequentPlaces);
      data.append("physical_description", physicalDescription);
      data.append("clothing_when_last_seen", clothingLastSeen);
      data.append("additional_notes", additionalNotes);
      data.append("issuer_mobile_number", issuerMobileNumber);
      data.append("issuer_email_address", issuerEmailAddress);
      data.append("issuer_name", issuerName);
      data.append("status", "missing");

      if (uploadedImage) {
        data.append("image", uploadedImage);
      } else {
        data.append("image", "");
      }

      try {
        console.log(data);

        const response = await addMissingPerson(data);
        console.log("Missing person report submitted successfully:", response);
      } catch (error) {
        console.error("Error submitting missing person report:", error);
      }

      // Display a confirmation message instead
      setMessages((prev) => [
        ...prev,
        {
          text: "We've got all the details! The search has begun, and we'll notify you as soon as we find any updates. Stay strong—we're doing everything we can to help.",
          sender: "bot",
        },
      ]);
    } else {
      // Normal bot response
      setMessages((prev) => [
        ...prev,
        { text: botResponseText, sender: "bot" },
      ]);
    }

    setIsTyping(false); // Remove typing animation
    setTimeout(() => {
      scrollToBottom();
    }, 100);
  };

  const scrollToBottom = () => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedImage(file);

      const reader = new FileReader();
      reader.onload = () => {
        const imageData = reader.result as string;

        setPreviewImage(imageData); // base64 string
        setMessages((prev) => [
          ...prev,
          {
            text: "Here is the image",
            sender: "user",
            image: "Image Received",
          },
        ]);
        setTimeout(scrollToBottom, 100);

        setIsTyping(true);

        const botResponseText =
          "Image Received. Now Provide the rest of the details";
        setMessages((prev) => [
          ...prev,
          { text: botResponseText, sender: "bot" },
        ]);

        setIsTyping(false);
        setTimeout(scrollToBottom, 100);
      };
      reader.readAsDataURL(file);
    }

    if (!event.target.files) return;
  };

  const clearChat = () => {
    setMessages([]);
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="max-w-screen lg:max-w-4xl w-screen max-h-[85vh] mx-0 lg:mx-auto p-0 lg:p-2 mt-6 lg:mt-0 bg-gray-100 shadow-2xl shadow-gray-300 dark:shadow-gray-900 dark:bg-gray-700 rounded-none lg:rounded-2xl scrollbar-hidden"
    >
      <div className="relative lg:min-w-md w-full h-[85vh] rounded-lg flex flex-col items-center justify-between">
        {messages.length !== 0 ? (
          <div className="w-[90%] lg:max-w-md rounded-2xl h-12 px-2 flex items-center justify-between bg-gray-600">
            <span className="cursor-pointer hover:opacity-70" onClick={goBack}>
              <img
                src="./icons/back.svg"
                alt="Go Back"
                className="w-6 dark:invert invert-0"
              />
            </span>
            <span
              className="cursor-pointer hover:opacity-70"
              onClick={clearChat}
            >
              <img src="./icons/bin.svg" alt="Clear Chat" className="w-8" />
            </span>
          </div>
        ) : (
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
              className={`my-1 px-3 py-2 rounded-3xl inline-block max-w-[80%] ${
                msg.sender === "user"
                  ? "bg-gray-300 dark:bg-gray-800 text-gray-800 dark:text-white ml-auto"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
              }`}
            >
              {msg.text && <ReactMarkdown>{msg.text}</ReactMarkdown>}

              {msg.image === "Image Received" && (
                <img
                  src={previewImage || ""}
                  alt="Uploaded"
                  className="mt-2 rounded-xl max-w-full max-h-64"
                />
              )}
            </span>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <span className="flex gap-1 mb-3 ml-4">
              <span className="w-2 h-2 bg-gray-500 dark:bg-gray-300 rounded-full animate-bounce [animation-delay:0s]"></span>
              <span className="w-2 h-2 bg-gray-500 dark:bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-2 h-2 bg-gray-500 dark:bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]"></span>
            </span>
          )}

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

        <div className="w-[90%] lg:mb-4 mb-2 flex lg:max-w-md min-h-12 bg-gray-300 dark:bg-gray-600 p-2 rounded-4xl sticky bottom-0">
          <span
            className="w-8 h-8 bg-gray-100 dark:bg-gray-500 hover:bg-gray-200 hover:dark:bg-gray-700 flex items-center justify-center rounded-full cursor-pointer"
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
          <textarea
            className="flex-1 p-2 pt-1 outline-none dark:text-white scrollbar-hidden resize-none overflow-y-auto"
            placeholder="Type a message..."
            value={input}
            rows={1}
            style={{ minHeight: "40px", maxHeight: "150px" }} // Adjust heights as needed
            onChange={(e) => {
              setInput(e.target.value);
              e.target.style.height = "40px"; // Reset height
              e.target.style.height = `${e.target.scrollHeight}px`; // Expand height dynamically
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault(); // Prevent new line
                sendMessage(); // Send message
                setInput(""); // Clear input
                const target = e.target as HTMLTextAreaElement;
                target.style.height = "40px";
              }
            }}
          />
          <button
            className="h-8 bg-[#634aff] mt-1 text-white px-4 rounded-4xl font-bold hover:bg-[#5d549a] transition cursor-pointer"
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
