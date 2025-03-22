import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteMissingPerson, fetchMissingPersons } from "../services/api";
import { ActionMenu, DetailsModal } from "../components";
import { useToast } from "../contexts/ToastContext";

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

const Dashboard = () => {
  const { showToast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [missingPeople, setMissingPeople] = useState<MissingPerson[]>([]);
  const [selectedPerson, setSelectedPerson] = useState<MissingPerson | null>(
    null
  );
  const [filteredPeople, setFilteredPeople] = useState<MissingPerson[]>([]);
  const [loading, setLoading] = useState(true);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [personToDelete, setPersonToDelete] = useState<number | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("Any location");
  const [selectedDate, setSelectedDate] = useState("");

  const handleCardClick = (person: MissingPerson) => {
    setSelectedPerson(person);
    setIsModalOpen(true);
  };

  const [activeMenuId, setActiveMenuId] = useState<number | null>(null);

  const handleOpenMenu = (personId: number) => {
    setActiveMenuId(personId);
  };

  const handleCloseMenu = () => {
    setActiveMenuId(null);
  };

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const data = await fetchMissingPersons();
        setMissingPeople(data);
        setFilteredPeople(data);
      } catch (error) {
        console.error("Error fetching missing persons:", error);
      }
      setLoading(false);
    };

    getData();
  }, []);

  useEffect(() => {
    let filtered = missingPeople;

    if (searchQuery) {
      filtered = filtered.filter((person) =>
        person.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedLocation !== "Any location") {
      filtered = filtered.filter(
        (person) => person.last_seen_location === selectedLocation
      );
    }

    if (selectedDate) {
      filtered = filtered.filter(
        (person) => person.date_of_disappearance === selectedDate
      );
    }

    setFilteredPeople(filtered);
  }, [searchQuery, selectedLocation, selectedDate, missingPeople]);

  const uniqueLocations = [
    "Any location",
    ...new Set(missingPeople.map((person) => person.last_seen_location)),
  ];

  const exportToCSV = () => {
    if (filteredPeople.length === 0) {
      showToast("No data available to export", "warning");
      return;
    }

    const headers = [
      "ID",
      "Name",
      "Date of Disappearance",
      "Age",
      "Last Seen Location",
      "Home Address",
      "Places Frequently Visited",
      "Physical Description",
      "Clothing When Last Seen",
      "Additional Notes",
      "Issuer Mobile Number",
      "Issuer Email Address",
      "Issuer Name",
      "Status",
    ];

    const rows = filteredPeople.map((person) => [
      person.id,
      person.name,
      person.date_of_disappearance,
      person.age ?? "N/A",
      person.last_seen_location,
      person.home_address ?? "N/A",
      person.places_frequently_visited ?? "N/A",
      person.physical_description ?? "N/A",
      person.clothing_when_last_seen ?? "N/A",
      person.additional_notes ?? "N/A",
      person.issuer_mobile_number ?? "N/A",
      person.issuer_email_address ?? "N/A",
      person.issuer_name ?? "N/A",
      person.status || "Unknown",
    ]);

    // Convert to CSV format
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((row) => row.join(",")).join("\n");

    // Create a hidden download link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "missing_persons_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleEdit = () => {
    showToast("Editing is currently not available.", "warning");
  };

  const handleDelete = (personId: number) => {
    setPersonToDelete(personId);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (personToDelete !== null) {
      const result = await deleteMissingPerson(personToDelete);
      if (result.success) {
        showToast("Person deleted successfully!", "success");
        setMissingPeople((prev) =>
          prev.filter((person) => person.id !== personToDelete)
        );
      } else {
        showToast("Failed to delete person.", "error");
      }
      setIsDeleteModalOpen(false);
      setPersonToDelete(null);
    }
  };

  return (
    <motion.div
      className="mt-4 p-6 shadow-2xl bg-white dark:bg-gray-700 min-h-screen max-w-6xl mx-auto rounded-xl flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-tinos dark:text-white text-gray-900 font-bold">
          Missing Person Reports
        </h1>
        <div className="flex space-x-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#29d8a1] text-white px-3 py-1 rounded-xl font-bold cursor-pointer"
            onClick={exportToCSV}
          >
            Export Data
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-black text-white px-3 py-1 rounded-xl font-bold cursor-pointer"
          >
            <Link to="/reportpage">Add New Case</Link>
          </motion.button>
        </div>
      </div>

      {/* Search & Filters */}
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

        <div className="relative">
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="border-0 bg-gray-100 dark:bg-gray-400 dark:text-white text-gray-700 rounded-lg p-2 pr-10 cursor-pointer text-md transition-all hover:bg-gray-100 dark:hover:bg-gray-500 appearance-none w-full"
          >
            {uniqueLocations.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </select>
          <img
            src="./icons/location.svg"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 dark:invert"
            alt="Location Icon"
          />
        </div>

        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border-0 flex-1 lg:flex-none bg-gray-100 dark:bg-[#635C50] dark:text-black text-gray-700 rounded-lg p-2 dark:invert text-md cursor-pointer transition-all hover:bg-gray-100 dark:hover:bg-[#949D95] uppercase"
        />
      </motion.div>

      {loading ? (
        <div className="w-full flex justify-center items-center flex-1">
          <span className="w-12 aspect-square rounded-full border-t-2 dark:border-gray-200 border-gray-800 animate-spin"></span>
        </div>
      ) : (
        <motion.table
          className="w-full bg-white dark:bg-gray-600 rounded-lg"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <thead>
            <tr className="font-tinos font-extrabold text-gray-900 dark:text-white">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left hidden lg:table-cell">
                Last Seen Location
              </th>
              <th className="p-3 text-left hidden lg:table-cell">Date</th>
              <th className="p-3 text-left hidden lg:table-cell">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPeople.length > 0 ? (
              filteredPeople.map((person) => (
                <motion.tr
                  onClick={() => {
                    handleCardClick(person);
                  }}
                  key={person.id}
                  transition={{ duration: 0.15 }}
                  className="relative border-t-1 font-tinos text-gray-900 dark:text-white 
                             border-gray-300 dark:border-gray-600 cursor-pointer 
                             hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <td className="p-3 flex items-center justify-start gap-2">
                    <img
                      src={
                        person.image
                          ? `data:image/jpeg;base64,${person.image}`
                          : "./icons/placeholder.webp"
                      }
                      alt={person.name}
                      className="w-10 aspect-square object-cover rounded-full"
                    />
                    {person.name}
                  </td>
                  <td className="p-3 hidden lg:table-cell">
                    {person.last_seen_location}
                  </td>
                  <td className="p-3 hidden lg:table-cell">
                    {person.date_of_disappearance}
                  </td>
                  <td className="p-3 hidden lg:table-cell uppercase">
                    {person.status || "Missing"}
                  </td>
                  <td className="p-3">
                    <ActionMenu
                      isOpen={activeMenuId === person.id}
                      onOpen={() => handleOpenMenu(person.id)}
                      onClose={handleCloseMenu}
                      onEdit={() => handleEdit()}
                      onDelete={() => handleDelete(person.id)}
                    />
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="text-center text-gray-600 dark:text-gray-300 py-4"
                >
                  No matching records found.
                </td>
              </tr>
            )}
          </tbody>
        </motion.table>
      )}

      {/* Recent Activity */}
      <div className="px-3 mt-8">
        <p className="font-extrabold font-tinos text-2xl dark:text-white text-gray-900">
          Recent Activity
        </p>
      </div>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 mb-9">
        {["New Reports", "Found Cases", "Pending Verification"].map(
          (title, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#cbc6eec8] rounded-2xl shadow flex flex-col items-start p-8 justify-center text-gray-900 dark:text-gray-200"
            >
              <span className="w-8 aspect-square bg-gray-200 rounded-full flex items-center justify-center mb-4 p-2">
                <img
                  src={`../icons/checked.svg`}
                  alt="works"
                  className="w-6 aspect-square"
                />
              </span>
              <h2 className="text-xl font-extrabold mt-3">{title}</h2>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                {missingPeople.length} new reports in the last 24 hours
              </p>
            </motion.div>
          )
        )}
      </div>

      {isModalOpen && selectedPerson && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-[#00000045]"
          onClick={() => setIsModalOpen(false)}
        >
          <DetailsModal missingPerson={selectedPerson} />
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <motion.div
          className="fixed inset-0 bg-[#00000041] bg-opacity-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg w-96 text-center"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
          >
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Are you sure?
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mt-2">
              This action cannot be undone.
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Dashboard;
