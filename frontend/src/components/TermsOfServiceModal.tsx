import { motion } from "framer-motion";

const TermsOfServiceModal = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="w-[90%] lg:w-[30%] bg-white dark:bg-gray-600 p-6 rounded-xl shadow-lg text-center"
    >
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        Terms of Service
      </h2>

      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
        By using this service, you agree to the following terms and conditions.
        Please read carefully before proceeding.
      </p>

      <h3 className="mt-4 text-lg text-gray-900 dark:text-white font-semibold">
        User Responsibilities
      </h3>
      <p className="text-gray-600 dark:text-gray-300 text-sm">
        - Users must comply with all applicable laws.
        <br />- Unauthorized use or access may result in termination of service.
      </p>

      <h3 className="mt-4 text-lg text-gray-900 dark:text-white font-semibold">
        Service Limitations
      </h3>
      <p className="text-gray-600 dark:text-gray-300 text-sm">
        - We do not guarantee uninterrupted service availability.
        <br />- We reserve the right to modify or discontinue any feature at our
        discretion.
      </p>

      <p className="mt-4 text-gray-600 dark:text-gray-400 text-xs italic">
        Continued use of this service constitutes acceptance of these terms.
      </p>
    </motion.div>
  );
};

export default TermsOfServiceModal;
