import { motion } from "framer-motion";

const missingPeopleList = [
  {
    name: "John Doe",
    location: "New York, NY",
    date: "05/15/2023",
    status: "Pending",
  },
  {
    name: "Sarah Johnson",
    location: "Los Angeles, CA",
    date: "06/20/2023",
    status: "In Progress",
  },
  {
    name: "Michael Brown",
    location: "Chicago, IL",
    date: "07/10/2023",
    status: "Pending",
  },
  {
    name: "Emily Wilson",
    location: "Houston, TX",
    date: "08/05/2023",
    status: "In Progress",
  },
  {
    name: "David Martinez",
    location: "Miami, FL",
    date: "09/12/2023",
    status: "Pending",
  },
];

const Dashboard = () => {
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
          >
            Export Data
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-black text-white px-3 py-1 rounded-xl font-bold cursor-pointer"
          >
            Add New Case
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
          placeholder="Search by name or location"
          className="border-0 bg-gray-100 dark:bg-gray-400 dark:placeholder:text-white rounded-lg p-2 flex-1 transition-shadow focus:ring-2 focus:ring-blue-300 placeholder:text-gray-700"
        />
        <div className="relative">
          <select className="border-0 bg-gray-100 dark:bg-gray-400 dark:text-white text-gray-700 rounded-lg p-2 pr-10 cursor-pointer text-md transition-all hover:bg-gray-100 dark:hover:bg-gray-500 appearance-none w-full">
            <option>Any location</option>
          </select>
          <img
            src="./icons/location.svg"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 dark:invert"
            alt="Location Icon"
          />
        </div>
        <input
          type="date"
          placeholder="Select Date"
          className="border-0 bg-gray-100 dark:bg-[#635C50] dark:text-black text-gray-700 rounded-lg p-2 dark:invert text-md cursor-pointer transition-all hover:bg-gray-100 dark:hover:bg-[#949D95] uppercase"
        />
        <div className="relative">
          <select className="border-0 bg-gray-100 dark:bg-gray-400 dark:text-white text-gray-700 rounded-lg p-2 pr-10 cursor-pointer text-md transition-all hover:bg-gray-100 dark:hover:bg-gray-500 appearance-none w-full">
            <option>Status</option>
          </select>
          <img
            src="./icons/status.svg"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 dark:invert"
            alt="Status Icon"
          />
        </div>
      </motion.div>

      {/* Table */}
      <motion.table
        className="w-full bg-white rounded-lg overflow-hidden"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <thead>
          <tr className="font-tinos font-extrabold">
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Last Seen Location</th>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {missingPeopleList.map((user, index) => (
            <motion.tr
              key={index}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="border-t-1 font-tinos border-gray-300 dark:border-gray-600 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <td className="p-3">{user.name}</td>
              <td className="p-3">{user.location}</td>
              <td className="p-3">{user.date}</td>
              <td className="p-3">{user.status}</td>
              <td className="p-3 flex space-x-2">
                <span className="flex flex-col gap-1 w-full h-full justify-center">
                  <span className="w-1 aspect-square rounded-full bg-black"></span>
                  <span className="w-1 aspect-square rounded-full bg-black"></span>
                  <span className="w-1 aspect-square rounded-full bg-black"></span>
                </span>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </motion.table>

      <span className="w-full flex flex-row items-center justify-between mt-4 text-sm px-3">
        <p className="text-gray-700">Showing 5 of 24 cases</p>
        <p className="text-[#29d8a1] font-bold cursor-pointer">Load More</p>
      </span>

      {/* Recent Activity */}
      <div className="px-3 mt-8">
        <p className="font-extrabold font-tinos text-2xl">Recent Activity</p>
      </div>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 mb-9">
        {["New Reports", "Found Cases", "Pending Verification"].map(
          (title, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#cbc6eec8] rounded-2xl shadow flex flex-col items-start p-8 justify-center"
            >
              <span className="w-8 aspect-square bg-gray-200 rounded-full flex items-center justify-center mb-4 p-2">
                <img
                  src={`../icons/checked.svg`}
                  alt="works"
                  className="w-6 aspect-square"
                />
              </span>
              <h2 className="text-xl font-extrabold mt-3">{title}</h2>
              <p className="text-gray-600 mt-1">
                12 new reports in the last 24 hours
              </p>
              <button className="mt-3 text-white bg-[#634aff] rounded-lg px-3 py-1 cursor-pointer">
                View All
              </button>
            </motion.div>
          )
        )}
      </div>
    </motion.div>
  );
};

export default Dashboard;
