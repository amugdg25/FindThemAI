import { useState } from "react";
import { motion } from "framer-motion";
import { login } from "../services/api";
import { useToast } from "../contexts/ToastContext";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Login = () => {
  const { showToast } = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }

    const response = await login({ username, password });

    if (response?.access_token) {
      showToast("Login successful!", "success");
      window.location.href = "/reportedcases";
    } else {
      setError("❌ Invalid username or password.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="w-full max-w-md p-8 bg-white dark:bg-gray-600 m-3 rounded-2xl shadow-md"
      >
        <h2 className="text-2xl font-bold text-center text-gray-950 dark:text-white">
          Admin Portal
        </h2>
        <div className="p-4 mt-3 text-center bg-gray-50 dark:bg-gray-500 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Login
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Enter your credentials to access the administrative panel
          </p>
        </div>
        <form className="mt-6" onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block mb-1 text-gray-700 dark:text-gray-100">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
              className="w-full mt-1 p-2 bg-gray-100 rounded-xl placeholder:text-gray-500 focus:outline-none focus:ring-0 focus:border-transparent"
            />
          </div>
          <div className="mb-4 relative">
            <label className="block mb-1 text-gray-700 dark:text-gray-100">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full mt-1 p-2 bg-gray-100 rounded-xl placeholder:text-gray-500 focus:outline-none focus:ring-0 focus:border-transparent"
            />
            <span
              className="absolute right-3 top-10 cursor-pointer text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁"}
            </span>
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <div className="text-right mb-4">
            <a href="#" className="text-green-500 text-sm hover:underline">
              Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full p-3 text-white font-bold bg-green-500 rounded-lg hover:bg-green-600 transition cursor-pointer"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-xs text-center text-gray-500 dark:text-gray-300">
          Secure login protected by encryption
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
