import { motion } from "framer-motion";

const Dashboard = () => {
  return (
    <motion.div
      className="mt-4 p-6 shadow-2xl bg-white dark:bg-gray-700 min-h-screen max-w-6xl mx-auto rounded-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-tinos font-bold">Missing Person Reports</h1>
        <div className="flex space-x-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-green-500 text-white px-3 py-1 rounded-xl"
          >
            Export Data
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-black text-white px-3 py-1 rounded-xl"
          >
            Add New Case
          </motion.button>
        </div>
      </div>

      {/* Search & Filters */}
      <motion.div
        className="bg-white p-4 rounded shadow mb-6 flex flex-wrap items-center gap-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <input
          type="text"
          placeholder="Search by name or location"
          className="border p-2 rounded flex-1 transition-shadow focus:ring-2 focus:ring-blue-300"
        />
        <select className="border p-2 rounded cursor-pointer transition-all hover:bg-gray-100">
          <option>Any location</option>
        </select>
        <input
          type="date"
          className="border p-2 rounded cursor-pointer transition-all hover:bg-gray-100"
        />
        <select className="border p-2 rounded cursor-pointer transition-all hover:bg-gray-100">
          <option>All statuses</option>
        </select>
      </motion.div>

      {/* Table */}
      <motion.table
        className="w-full bg-white rounded shadow overflow-hidden"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Last Seen Location</th>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {[
            "John Doe",
            "Sarah Johnson",
            "Michael Brown",
            "Emily Wilson",
            "David Martinez",
          ].map((name, index) => (
            <motion.tr
              key={index}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="border-t cursor-pointer hover:bg-gray-100"
            >
              <td className="p-3">{name}</td>
              <td className="p-3">City, State</td>
              <td className="p-3">05/15/2023</td>
              <td className="p-3">
                {index % 2 === 0 ? "Pending" : "In Progress"}
              </td>
              <td className="p-3 flex space-x-2">
                <button className="text-blue-500">View</button>
                <button className="text-red-500">Delete</button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </motion.table>

      {/* Recent Activity */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {["New Reports", "Found Cases", "Pending Verification"].map(
          (title, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white p-4 rounded shadow flex flex-col items-center justify-center"
            >
              <h2 className="text-lg font-semibold">{title}</h2>
              <p className="text-gray-600">{index * 4 + 2} cases</p>
              <button className="mt-2 text-blue-500">View</button>
            </motion.div>
          )
        )}
      </div>
    </motion.div>
  );
};

export default Dashboard;
