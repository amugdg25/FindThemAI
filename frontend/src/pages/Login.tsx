import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }
    if (email === "admin@example.com" && password === "admin123") {
      alert("Login successful!");
      navigate("/");
    } else {
      alert("Invalid credentials. Try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-600 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-950 dark:text-white">
          Admin Portal
        </h2>
        <div className="p-4 mt-3 text-center bg-gray-50 dark:bg-gray-500 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Sign In
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Enter your credentials to access the administrative panel
          </p>
        </div>
        <form className="mt-6" onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block mb-1 text-gray-700 dark:text-gray-100">
              Email or Username
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email or username"
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
              className="w-full mt-1 p-2 bg-gray-100 rounded-xl placeholder:text-gray-500 focus:outline-none focus:ring-0 focus:border-transparent"
            />
            <span
              className="absolute right-3 top-10 cursor-pointer text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁"}
            </span>
          </div>
          <div className="text-right mb-4">
            <a href="#" className="text-green-500 text-sm hover:underline">
              Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full p-3 text-white font-bold bg-green-500 rounded-lg hover:bg-green-600 transition"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-xs text-center text-gray-500 dark:text-gray-300">
          Secure login protected by encryption
        </p>
      </div>
    </div>
  );
};

export default Login;
