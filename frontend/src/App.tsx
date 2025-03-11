import { Link, Route, Routes } from "react-router-dom";
import { Contact, Landing, Login, ReportPage } from "./pages";

function App() {
  return (
    <section className="w-full min-h-screen flex flex-col overflowx-x-hidden">
      {/* Navbar */}
      <nav className="w-full max-w-screen h-12 shadow-gray-100 shadow-sm flex items-center justify-between px-4">
        <span>
          <Link to="/" className="text-xl font-tinos">
            FindThem
          </Link>
        </span>

        <div className="flex gap-2">
          <span className="px-2 py-1 border-2 border-transparent">
            <Link to="/contact" className="text-xl font-tinos">
              Contact
            </Link>
          </span>
          <Link
            to="/adminlogin"
            className="bg-[#634aff] font-tinos border-2 hover:border-[#634aff] hover:bg-white hover:text-[#634aff] transition-all duration-150 text-white px-2 py-1 rounded-xl flex items-center justify-center"
          >
            <span>Admin Login</span>
          </Link>
        </div>
      </nav>

      {/* Content - Takes full width and avoids overflow */}
      <div className="flex-1 w-full">
        <Routes>
          <Route path="/" index element={<Landing />} />
          <Route path="/reportpage" index element={<ReportPage />} />
          <Route path="/adminlogin" index element={<Login />} />
          <Route path="/contact" index element={<Contact />} />
        </Routes>
      </div>
    </section>
  );
}

export default App;
