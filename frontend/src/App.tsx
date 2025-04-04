import { Route, Routes, useNavigate } from "react-router-dom";
import {
  Chatbot,
  Dashboard,
  InstantSearch,
  Landing,
  Login,
  ReportedCases,
  ReportPage,
  Signup,
} from "./pages";
import { ChatbotBtn, NavBar, ProtectedRoute } from "./components";
import { useAuth } from "./hooks/useAuth";

function App() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/adminlogin");
  };

  return (
    <section className="w-full min-h-screen flex flex-col overflow-x-hidden bg-gray-50 dark:bg-gray-800 relative">
      <NavBar handleLogout={handleLogout} isAuthenticated={isAuthenticated} />

      <div className="flex-1 w-full">
        <Routes>
          <Route path="/" index element={<Landing />} />
          <Route path="/adminlogin" index element={<Login />} />
          <Route path="/signup" index element={<Signup />} />
          <Route
            path="/reportedcases"
            element={<ReportedCases isAuthenticated={isAuthenticated} />}
          />
          <Route path="/instantsearch" element={<InstantSearch />} />
          <Route path="/chatbot" element={<Chatbot />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/reportpage" element={<ReportPage />} />
          </Route>
        </Routes>
      </div>

      <ChatbotBtn />
    </section>
  );
}

export default App;
