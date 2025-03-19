import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchMissingPersons } from "../services/api";
import { DetailsModal } from "../components";
import { Link } from "react-router-dom";

interface MissingPerson {
  id: number;
  name: string;
  date_of_disappearance: string;
  age: number;
  last_seen_location: string;
  home_address?: string;
  places_frequently_visited?: string;
  physical_description?: string;
  clothing_when_last_seen?: string;
  additional_notes?: string;
  issuer_mobile_number?: string;
  issuer_email_address?: string;
  issuer_name?: string;
  status: string;
  image?: string;
}

const ReportedCases = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [missingPersons, setMissingPersons] = useState<MissingPerson[]>([]);
  const [filteredPersons, setFilteredPersons] = useState<MissingPerson[]>([]);
  const [visibleCount, setVisibleCount] = useState(20); // Limit displayed cases
  const [loading, setLoading] = useState(true); // Loading state

  const [searchQuery, setSearchQuery] = useState("");

  const [selectedPerson, setSelectedPerson] = useState<MissingPerson | null>(
    null
  );

  const handleCardClick = (person: MissingPerson) => {
    setSelectedPerson(person);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const data = await fetchMissingPersons();
      setMissingPersons(data);
      setFilteredPersons(data);
      setLoading(false);
    };

    getData();
  }, []);

  useEffect(() => {
    const filtered = missingPersons.filter((person) =>
      person.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredPersons(filtered);
  }, [searchQuery, missingPersons]);

  return (
    <motion.div
      className="mt-4 p-6 shadow-2xl bg-white dark:bg-gray-700 min-h-screen max-w-6xl mx-auto rounded-xl flex flex-col mb-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-xl font-tinos dark:text-white text-gray-900 font-bold">
          Missing Person Reports
        </h1>
        <span className="flex gap-2">
          <motion.span
            className="bg-[#29d8a1] px-2 py-1 rounded-xl text-white font-bold cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            <Link to="/instantsearch">Instant Search</Link>
          </motion.span>
          <motion.span
            className="bg-[#29d8a1] px-2 py-1 rounded-xl text-white font-bold cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            <Link to="/reportpage">Report Case</Link>
          </motion.span>
        </span>
      </div>
      <span className="w-full rounded-xl py-1 px-2 bg-gray-100 dark:bg-gray-400 mb-4">
        <p className="text-gray-700 dark:text-gray-300 text-sm mt-2">
          <strong>Instant Search:</strong> Quickly scan CCTV footage, databases,
          and online sources using a name and image to find real-time matches.
          <br />
          <strong>Report Case:</strong> Submit a missing person’s details for
          continuous searches at regular intervals across CCTV networks,
          databases, and the internet until they are found.
        </p>
      </span>

      <motion.div
        className="bg-white dark:bg-transparent p-0 rounded mb-6 flex flex-wrap items-center gap-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border-0 bg-gray-100 dark:bg-gray-400 dark:placeholder:text-white rounded-lg p-2 flex-1 transition-shadow focus:ring-2 focus:ring-blue-300 placeholder:text-gray-700"
        />
      </motion.div>

      {loading ? (
        <div className="w-full flex justify-center items-center flex-1">
          <span className="w-12 aspect-square rounded-full border-t-2 dark:border-gray-200 border-gray-800 animate-spin"></span>
        </div>
      ) : (
        <>
          <motion.div
            className="w-full rounded-lg overflow-hidden grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {filteredPersons.length > 0 ? (
              filteredPersons.slice(0, visibleCount).map((person) => (
                <motion.div
                  key={person.id}
                  className="bg-gray-200 dark:bg-gray-600 rounded-lg p-2 shadow-lg flex flex-col items-center"
                  whileHover={{ scale: 1.05 }}
                  onClick={() => {
                    handleCardClick(person);
                  }}
                >
                  <img
                    src={
                      person.image
                        ? `data:image/jpeg;base64,${person.image}`
                        : "./icons/placeholder.webp"
                    }
                    alt={person.name}
                    className="w-full h-64 object-cover rounded-md mb-3"
                  />
                  <div className="flex flex-col items-start justify-center">
                    <h3 className="text-lg font-bold dark:text-white">
                      {person.name}
                    </h3>
                    <span className="flex flex-col items-center justify-between">
                      <p className="text-gray-600 dark:text-gray-400 overflow-hidden">
                        Last seen in{" "}
                        <strong>{person.last_seen_location}</strong> on{" "}
                        <strong>{person.date_of_disappearance}</strong>.
                      </p>
                      <span className="flex flex-row items-center justify-between w-full mt-2 border-t-2 dark:border-gray-300 border-gray-700 pt-2">
                        <p className="dark:text-white text-gray-800">
                          {person.status === "" || person.status === "unknown"
                            ? "Not Found"
                            : ""}
                        </p>
                      </span>
                    </span>
                  </div>
                </motion.div>
              ))
            ) : (
              <span className="flex font-bold text-3xl text-center dark:text-gray-100 text-gray-900">
                No reports yet!
              </span>
            )}
          </motion.div>
          {filteredPersons.length > 0 ? (
            <span className="w-full flex flex-row items-center justify-between mt-4 text-sm px-3">
              <p className="text-gray-700 dark:text-gray-300">
                Showing {Math.min(visibleCount, filteredPersons.length)} of{" "}
                {filteredPersons.length} cases
              </p>
              {visibleCount < filteredPersons.length && (
                <p
                  className="text-[#29d8a1] font-bold cursor-pointer"
                  onClick={() => setVisibleCount((prev) => prev + 20)}
                >
                  Load More
                </p>
              )}
            </span>
          ) : (
            <></>
          )}
        </>
      )}
      {isModalOpen && selectedPerson && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-[#00000045]"
          onClick={() => setIsModalOpen(false)}
        >
          <DetailsModal missingPerson={selectedPerson} />
        </div>
      )}
    </motion.div>
  );
};

export default ReportedCases;
