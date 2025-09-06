import { Link } from "react-router-dom";
import { FiUserPlus, FiLogIn, FiLogOut, FiSearch } from "react-icons/fi";
import { useAuth } from "../Context/Contextprovider";

const Navbar = ({ setSearchQuery }) => {
  const { user, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-40 backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-b border-white/20 dark:border-slate-700/30 shadow-lg w-full">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between h-auto sm:h-16 py-2 sm:py-0 gap-2 sm:gap-0">
          {/* Logo */}
          <Link
            to="/"
            className="group flex items-center space-x-2 text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700 dark:hover:from-blue-300 dark:hover:to-purple-300 transition-all duration-300"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-neu-inset group-hover:shadow-neu-elevated transition-all duration-300">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            NotesApp
          </Link>

          {/* Search Bar (desktop) */}
          <div className="flex-1 max-w-md mx-0 sm:mx-8 w-full hidden sm:block">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors duration-200" />
              </div>
              <input
                type="text"
                placeholder="Search your notes..."
                className="w-full pl-12 pr-4 py-3 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 shadow-neu-inset hover:shadow-neu-elevated focus:shadow-neu-elevated text-sm sm:text-base"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center space-x-2 sm:space-x-4 mt-2 sm:mt-0">
            {user && user._id ? (
              <div className="flex items-center space-x-2 sm:space-x-4">
                {/* User Info */}
                <div className="hidden md:flex items-center space-x-3 px-3 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl backdrop-blur-sm shadow-neu-inset">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-slate-700 dark:text-slate-300 font-medium max-w-24 sm:max-w-32 truncate">
                    {user.name}
                  </span>
                </div>
                {/* Logout Button */}
                <button
                  onClick={logout}
                  className="group flex items-center space-x-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 backdrop-blur-sm border border-white/20 text-sm sm:text-base"
                >
                  <FiLogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-400/50 to-red-600/50 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Link
                  to="/login"
                  className="group flex items-center space-x-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 backdrop-blur-sm border border-white/20 text-sm sm:text-base"
                >
                  <FiLogIn className="w-4 h-4" />
                  <span className="hidden sm:inline">Login</span>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/50 to-blue-600/50 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                </Link>
                <Link
                  to="/register"
                  className="group flex items-center space-x-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 backdrop-blur-sm border border-white/20 text-sm sm:text-base"
                >
                  <FiUserPlus className="w-4 h-4" />
                  <span className="hidden sm:inline">Sign Up</span>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-400/50 to-emerald-600/50 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="sm:hidden pb-2 w-full">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors duration-200" />
            </div>
            <input
              type="text"
              placeholder="Search your notes..."
              className="w-full pl-12 pr-4 py-3 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 shadow-neu-inset hover:shadow-neu-elevated focus:shadow-neu-elevated text-sm"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <style>{`
        .shadow-neu-inset {
          box-shadow: inset 4px 4px 8px rgba(0, 0, 0, 0.1), inset -4px -4px 8px rgba(255, 255, 255, 0.8);
        }
        .shadow-neu-elevated {
          box-shadow: 8px 8px 16px rgba(0, 0, 0, 0.15), -8px -8px 16px rgba(255, 255, 255, 0.7);
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
