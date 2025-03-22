import { Link, Route, Routes, useNavigate } from "react-router-dom";
import {
  Dashboard,
  InstantSearch,
  Landing,
  Login,
  ReportedCases,
  ReportPage,
  Signup,
} from "./pages";
import { ModeToggleBtn } from "./components";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./hooks/useAuth";

function App() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/adminlogin");
  };

  return (
    <section className="w-full min-h-screen flex flex-col overflow-x-hidden bg-gray-50 dark:bg-gray-800">
      <nav className="w-full max-w-screen h-16 shadow-gray-100 dark:shadow-gray-800 shadow-sm flex items-center justify-between px-4">
        <span>
          <Link to="/">
            <p className="text-xl font-merriweather text-gray-800 dark:text-white hidden lg:block">
              FindThem
            </p>
            <img
              src="./logo.svg"
              alt="logo"
              className="w-12 aspect-square block lg:hidden invert dark:invert-0"
            />
          </Link>
        </span>

        <div className="flex gap-2 items-center justify-center">
          <span className="px-2 py-1 border-2 border-transparent">
            <ModeToggleBtn />
          </span>
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 font-tinos border-2 border-red-500 hover:bg-white hover:text-red-500 px-2 py-1 rounded-xl transition-all duration-150 text-white"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/adminlogin"
              className="bg-[#634aff] font-tinos border-2 border-[#634aff] hover:bg-white hover:text-[#634aff] px-2 py-1 rounded-xl transition-all duration-150 text-white"
            >
              Admin Login
            </Link>
          )}
        </div>
      </nav>

      <div className="flex-1 w-full">
        <Routes>
          <Route path="/" index element={<Landing />} />
          <Route path="/adminlogin" index element={<Login />} />
          <Route path="/adminsignup" index element={<Signup />} />
          <Route
            path="/reportedcases"
            element={<ReportedCases isAuthenticated={isAuthenticated} />}
          />
          <Route path="/instantsearch" element={<InstantSearch />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/reportpage" element={<ReportPage />} />
          </Route>
        </Routes>
      </div>
    </section>
  );
}

export default App;
