import { motion } from "framer-motion";

const PrivacyPolicyModal = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="w-[90%] lg:w-[30%] bg-white dark:bg-gray-600 p-6 rounded-xl shadow-lg text-center"
    >
      {/* Header */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Privacy Policy
      </h2>

      {/* Policy Content */}
      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
        Your privacy is important to us. This Privacy Policy outlines the types
        of personal information we collect, how we use it, and the steps we take
        to protect it.
      </p>

      <h3 className="mt-4 text-lg text-gray-900 dark:text-white font-semibold">
        Information We Collect
      </h3>
      <p className="text-gray-600 dark:text-gray-300 text-sm">
        - Personal details (e.g., name, email) provided by users.
        <br />- Usage data and analytics to improve our services.
      </p>

      <h3 className="mt-4 text-lg text-gray-900 dark:text-white font-semibold">
        How We Use Your Information
      </h3>
      <p className="text-gray-600 dark:text-gray-300 text-sm">
        - To provide and improve our services.
        <br />- To communicate important updates and respond to inquiries.
      </p>

      <p className="mt-4 text-gray-600 dark:text-gray-400 text-xs italic">
        By using this service, you agree to the terms outlined in this Privacy
        Policy.
      </p>
    </motion.div>
  );
};

export default PrivacyPolicyModal;
