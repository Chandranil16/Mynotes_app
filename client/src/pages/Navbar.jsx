import React from "react";
import { Link } from "react-router-dom";
import { FiUserPlus, FiLogIn, FiLogOut } from "react-icons/fi";
import { useAuth } from "../Context/Contextprovider";

const Navbar = ({ setSearchQuery }) => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-200 shadow-md px-2 sm:px-4 md:px-6 py-2 sm:py-3 flex flex-wrap items-center justify-between gap-y-2">
      <Link
        to="/"
        className="text-blue-600 font-bold text-lg sm:text-xl tracking-tight flex-shrink-0"
      >
        NotesApp
      </Link>
      <div className="flex-1 flex justify-center w-full sm:w-auto order-3 sm:order-none mt-2 sm:mt-0">
        <input
          type="text"
          placeholder="Search notes..."
          className="px-3 py-2 border-3 border-black rounded-full transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 w-full max-w-xs sm:max-w-md text-center shadow-sm hover:border-blue-500 hover:shadow-lg"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-2 mt-2 sm:mt-0">
        {user && user._id ? (
          <>
            <span className="text-gray-600 mr-2 sm:mr-4 font-bold break-all">
              {user.name}
            </span>
            <button
              className="px-3 sm:px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold shadow transition duration-200 transform hover:scale-105 hover:from-red-600 hover:to-red-800 focus:outline-none text-sm sm:text-base"
              onClick={logout}
            >
              <FiLogOut className="inline-block mr-1" />
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="px-3 sm:px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold shadow transition duration-200 transform hover:scale-105 hover:from-blue-600 hover:to-blue-800 focus:outline-none mr-2 sm:mr-4 text-sm sm:text-base"
            >
              <FiLogIn className="inline-block mr-1" />
              Login
            </Link>
            <Link
              to="/register"
              className="px-3 sm:px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold shadow transition duration-200 transform hover:scale-105 hover:from-green-600 hover:to-green-800 focus:outline-none mr-2 sm:mr-4 text-sm sm:text-base"
            >
              <FiUserPlus className="inline-block mr-1" />
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
