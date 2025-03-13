const Contact = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800">
      <div className="bg-white dark:bg-gray-600 p-8 rounded-2xl shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white text-center">
          Contact Us
        </h2>
        <p className="text-gray-500 dark:text-gray-300 text-center mt-2">
          We'd love to hear from you!
        </p>

        <form className="mt-6">
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-100 font-medium">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full mt-1 p-2 bg-gray-100 rounded-xl placeholder:text-gray-500 focus:outline-none focus:ring-0 focus:border-transparent"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-100 font-medium">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full mt-1 p-2 bg-gray-100 rounded-xl placeholder:text-gray-500 focus:outline-none focus:ring-0 focus:border-transparent"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-100 font-medium">
              Message
            </label>
            <textarea
              placeholder="Enter your message"
              className="w-full mt-1 p-2 bg-gray-100 rounded-xl placeholder:text-gray-500 focus:outline-none focus:ring-0 focus:border-transparent"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white font-semibold py-3 rounded-lg hover:bg-green-600 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
