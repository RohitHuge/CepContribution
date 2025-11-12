import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { UserCircle2, LogOut, LayoutDashboard } from "lucide-react";

const navLinks = [
  { name: "Home", to: "/" },
  { name: "Why Organic?", to: "/why-organic" },
  { name: "Innovations", to: "/innovations" },
  { name: "Fetilizers and manures", to: "/fetilizers-and-manures" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await signOut();
    navigate("/auth");
  };

  // ✅ Check if user has admin label from Appwrite
  const isAdmin = user?.labels?.includes("admin");

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-shadow duration-300 ${
        scrolled ? "shadow-md" : "shadow-none"
      }`}
    >
      <nav className="bg-white px-4 md:px-10 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold text-green-700"
        >
          <span role="img" aria-label="leaf">
            🌿
          </span>
          Organic Farming Innovations
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              className="text-green-700 font-medium px-2 py-1 rounded transition-colors duration-200 hover:text-[#2e8b57] hover:underline"
            >
              {link.name}
            </Link>
          ))}

          {/* --- User Section --- */}
          {!user ? (
            <button
              onClick={() => navigate("/auth")}
              className="ml-4 px-5 py-2 bg-gradient-to-r from-[#2e8b57] to-[#4CAF50] text-white font-semibold rounded-xl shadow hover:from-[#4CAF50] hover:to-[#2e8b57] transition-all duration-200 focus:outline-none"
            >
              Login
            </button>
          ) : (
            <div
              className="relative ml-4"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-green-300 bg-green-50 hover:bg-green-100 transition-colors duration-200 focus:outline-none"
                aria-label="Account menu"
              >
                <UserCircle2 className="text-green-700" size={24} />
                <span className="font-medium text-green-700">
                  {user.name || "Account"}
                </span>
              </button>

              <AnimatePresence>
                {showDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-56 bg-white border border-green-100 rounded-xl shadow-lg overflow-hidden z-50"
                  >
                    <div className="px-4 py-3 border-b border-green-50">
                      <p className="text-green-700 font-semibold">
                        {user.email}
                      </p>
                    </div>
                    {/* ✅ Show admin button if labels include "admin" */}
                    {isAdmin && (
                      <button
                        onClick={() => navigate("/admin")}
                        className="w-full text-left flex items-center gap-2 px-4 py-3 hover:bg-green-50 text-green-700 transition-all duration-200"
                      >
                        <LayoutDashboard size={18} /> Admin Dashboard
                      </button>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left flex items-center gap-2 px-4 py-3 hover:bg-green-50 text-green-700 transition-all duration-200"
                    >
                      <LogOut size={18} /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Hamburger (Mobile) */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded focus:outline-none hover:bg-green-50 transition"
          onClick={() => setMenuOpen((m) => !m)}
          aria-label="Toggle navigation menu"
        >
          <span
            className={`block w-6 h-0.5 bg-green-700 rounded transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-green-700 rounded my-1 transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-green-700 rounded transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          ></span>
        </button>
      </nav>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white px-4 pb-4 shadow rounded-b-2xl"
          >
            <div className="flex flex-col gap-3 mt-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  className="text-green-700 font-medium px-2 py-2 rounded transition-colors duration-200 hover:text-[#2e8b57] hover:bg-green-50"
                >
                  {link.name}
                </Link>
              ))}

              {!user ? (
                <button
                  onClick={() => navigate("/auth")}
                  className="mt-2 px-5 py-2 bg-gradient-to-r from-[#2e8b57] to-[#4CAF50] text-white font-semibold rounded-xl shadow hover:from-[#4CAF50] hover:to-[#2e8b57] transition-all duration-200 focus:outline-none text-center"
                >
                  Login
                </button>
              ) : (
                <>
                  {isAdmin && (
                    <button
                      onClick={() => navigate("/admin")}
                      className="px-5 py-2 bg-green-100 text-green-700 font-medium rounded-xl shadow-sm hover:bg-green-200 transition-all duration-200 focus:outline-none text-center"
                    >
                      Admin Dashboard
                    </button>
                  )}
                  <button
                    onClick={handleLogout}
                    className="mt-2 px-5 py-2 bg-gradient-to-r from-[#2e8b57] to-[#4CAF50] text-white font-semibold rounded-xl shadow hover:from-[#4CAF50] hover:to-[#2e8b57] transition-all duration-200 focus:outline-none text-center"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
