import { useState } from "react";
import { motion } from "framer-motion";
import { matchFace } from "../services/api";

const InstantSearch = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [matchResult, setMatchResult] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSearch = async () => {
    if (!selectedFile) {
      alert("Please select an image to search.");
      return;
    }

    try {
      const response = await matchFace(selectedFile);
      setMatchResult(
        response.match ? `Match found: ${response.match}` : "No match found."
      );
    } catch (error) {
      console.error("Error searching for face:", error);
      setMatchResult("An error occurred while searching.");
    }
  };

  return (
    <motion.div
      className="mt-4 shadow-2xl bg-white dark:bg-gray-700 min-h-screen max-w-6xl mx-auto rounded-xl flex flex-col mb-4 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="w-full h-18 flex items-center justify-center shadow-2xl dark:bg-gray-600 bg-gray-200">
        <p className="text-2xl text-gray-600 dark:text-white font-bold">
          Missing Person Search
        </p>
      </div>

      <div className="p-6 flex flex-col items-center">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mb-4 p-2 border border-gray-400 rounded-lg dark:text-white"
        />

        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Search
        </button>

        {matchResult && (
          <p className="mt-4 text-lg font-semibold text-gray-800 dark:text-white">
            {matchResult}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default InstantSearch;
