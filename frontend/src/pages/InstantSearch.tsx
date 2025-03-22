import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { matchFace } from "../services/api";
import { useToast } from "../contexts/ToastContext";

interface MatchResult {
  id?: number;
  name?: string;
  age?: number;
  last_seen_location?: string;
  issuer_name?: string;
  issuer_mobile_number?: string;
  issuer_email_address?: string;
  similarity_score?: number;
  image?: string;
  message?: string;
}

const InstantSearch = () => {
  const { showToast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [matchResult, setMatchResult] = useState<MatchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isHovered, setIsHovered] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
      setMatchResult(null);
      setError(null);
    }
  };

  const handleSearch = async () => {
    if (!selectedFile) {
      showToast("Please select an image to search.", "warning");
      return;
    }

    setLoading(true);
    setError(null);
    setMatchResult(null);

    try {
      const response = await matchFace(selectedFile);
      console.log(response);

      if (response?.message === "Potential match found for missing person!") {
        setMatchResult(response);
      } else {
        setMatchResult({ message: "No match found." });
      }
    } catch (err) {
      console.error("Error searching for face:", err);
      setError("An error occurred while searching. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  console.log(matchResult);

  return (
    <motion.div
      className="mt-4 shadow-2xl bg-white dark:bg-gray-700 min-h-screen max-w-6xl mx-auto lg:rounded-xl flex flex-col lg:mb-4 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="w-full h-18 flex items-center justify-center shadow-2xl dark:bg-gray-600 bg-gray-100">
        <p className="text-2xl text-gray-600 dark:text-white font-bold">
          Missing Person Search
        </p>
      </div>

      <div className="p-6 flex flex-col items-center">
        <div
          className="flex relative mt-32 mb-24 items-center justify-center cursor-pointer rounded-full"
          onClick={() => fileInputRef.current?.click()}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <span className="absolute w-36 aspect-square rounded-full flex items-center justify-center animate-ping dark:bg-gray-900 bg-gray-200"></span>
          <span className="absolute w-36 aspect-square rounded-full flex items-center justify-center animate-ping dark:bg-gray-900 bg-gray-200"></span>
          <span className="absolute w-40 aspect-square rounded-full flex items-center justify-center bg-transparent border-dashed border-2 dark:border-gray-200 border-gray-600"></span>
          <span className="w-36 aspect-square rounded-full flex items-center justify-center bg-gray-300 dark:bg-gray-900 z-50">
            {selectedFile ? (
              <picture className="w-full h-full relative">
                <source
                  srcSet={URL.createObjectURL(selectedFile)}
                  type="image/jpeg"
                />
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Uploaded"
                  className="relative w-full h-full object-cover rounded-full"
                />
                {isHovered && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFile(null);
                      setMatchResult(null);
                    }}
                    className="absolute inset-0 flex items-center justify-center bg-[#00000077] text-white rounded-full cursor-pointer"
                  >
                    <img src="./icons/bin.svg" alt="Delete" className="w-12" />
                  </button>
                )}
              </picture>
            ) : (
              <img
                src="./icons/upload-image.svg"
                alt="upload"
                className="w-12 aspect-square invert dark:invert-0"
              />
            )}
          </span>
        </div>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden mb-4 p-2 border border-gray-400 rounded-lg dark:text-white"
        />

        {!matchResult && (
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white font-bold cursor-pointer px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            disabled={loading}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        )}

        {loading && (
          <div className="mt-4 text-gray-600 dark:text-white text-sm">
            Processing image and searching for matches...
          </div>
        )}

        {matchResult && (
          <motion.div
            className="mt-6 p-6 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl shadow-lg w-full max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {matchResult.id ? (
              <>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-4">
                  Match Found
                </h3>

                <div className="flex items-center gap-4">
                  {/* Person Image */}
                  {matchResult.image && (
                    <img
                      src={`data:image/jpeg;base64,${matchResult.image}`}
                      alt="Matched person"
                      className="w-28 h-28 object-cover rounded-full border-2 border-gray-400"
                    />
                  )}

                  {/* Person Details */}
                  <div className="flex flex-col gap-2 text-left text-gray-800 dark:text-gray-300">
                    <p>
                      <strong>Name:</strong> {matchResult.name}
                    </p>
                    <p>
                      <strong>Age:</strong> {matchResult.age}
                    </p>
                    <p>
                      <strong>Last Seen:</strong>{" "}
                      {matchResult.last_seen_location}
                    </p>
                    <p>
                      <strong>Reported By: </strong> {matchResult.issuer_name}
                    </p>
                    <p>
                      <strong>Contact:</strong>{" "}
                      {matchResult.issuer_mobile_number}
                    </p>
                    <p>
                      <strong>Email:</strong> {matchResult.issuer_email_address}
                    </p>
                    <p className="text-green-600 dark:text-green-400 font-semibold">
                      Similarity:{" "}
                      {(matchResult.similarity_score! * 100).toFixed(2)}%
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <p className="text-gray-700 dark:text-gray-300 text-center">
                ❌ No match found.
              </p>
            )}
          </motion.div>
        )}

        {error && <p className="mt-4 text-red-500 font-semibold">{error}</p>}
      </div>
    </motion.div>
  );
};

export default InstantSearch;
