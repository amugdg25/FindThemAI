import React from "react";
import { Link } from "react-router-dom";
import ModeToggleBtn from "./ModeToggleBtn";

interface NavBarProps {
  handleLogout: () => void;
  isAuthenticated: boolean;
}

const NavBar: React.FC<NavBarProps> = ({ handleLogout, isAuthenticated }) => {
  return (
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
  );
};

export default NavBar;
