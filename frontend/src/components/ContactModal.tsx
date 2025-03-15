import { motion } from "framer-motion";

const ContactModal = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="w-[90%] lg:w-[30%] bg-white dark:bg-gray-600 p-6 rounded-xl shadow-lg text-center relative"
    >
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        Contact Us
      </h2>

      <p className="mb-2 text-gray-900 dark:text-gray-100">
        📧 Email:
        <a
          href="mailto:contact@example.com"
          className="text-blue-500 dark:text-blue-200 hover:underline ml-1"
        >
          contact@example.com
        </a>
      </p>

      <p className="mb-2 text-gray-900 dark:text-gray-100">
        📞 Phone:
        <a
          href="tel:+1234567890"
          className="text-blue-500 dark:text-blue-200 hover:underline ml-1"
        >
          +1 (234) 567-890
        </a>
      </p>

      {/* Social Media */}
      <div className="mt-4 flex justify-center space-x-4">
        <a
          href="#"
          className="text-blue-600 hover:text-blue-800 dark:text-blue-200 dark:hover:text-blue-400"
        >
          🌐 Website
        </a>
        <a
          href="#"
          className="text-blue-600 hover:text-blue-800 dark:text-blue-200 dark:hover:text-blue-400"
        >
          🐦 Twitter
        </a>
        <a
          href="#"
          className="text-blue-600 hover:text-blue-800 dark:text-blue-200 dark:hover:text-blue-400"
        >
          📘 Facebook
        </a>
      </div>
    </motion.div>
  );
};

export default ContactModal;
