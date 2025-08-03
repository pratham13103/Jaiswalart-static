import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";

const categories = [
  "Mandala",
  "Warli",
  "Paintings",
  "Abstract",
  "Modern",
  "Landscape",
];

const Navbar: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isSearchBarOpen, setSearchBarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleCategoryClick = (category: string) => {
    setSearchQuery(category);
    setSearchBarOpen(false);
    navigate(`/product-search?query=${category}`);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchBarOpen(false);
      navigate(`/product-search?query=${searchQuery.trim()}`);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      {/* Marquee */}
      <div className="bg-red-600 text-white py-2 text-sm md:text-lg font-semibold overflow-hidden">
        <div className="flex whitespace-nowrap animate-scroll">
          <span className="mx-8 md:mx-16">
            🎨 Get 20% OFF on your first order!
          </span>
          <span className="mx-8 md:mx-16">🖌️ New Arrivals Just Dropped!</span>
          <span className="mx-8 md:mx-16">
            🚚 Free Shipping on orders above ₹5000
          </span>
          <span className="mx-8 md:mx-16">
            🎁 Custom Art Commissions Available – Contact us now!
          </span>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="w-full bg-white shadow-md/10 backdrop-blur-md shadow-md z-50">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 md:px-8 py-4 h-20">
          {/* Title */}
          <Link
            to="/"
            className="text-3xl md:text-4xl font-sans font-bold bg-gradient-to-r from-red-700 to-orange-500 text-transparent bg-clip-text drop-shadow-md"
          >
            Jaiswal Arts
          </Link>

          {/* Categories */}
          <div className="hidden md:flex space-x-4 md:space-x-6 ml-4 md:ml-10">
            {categories.slice(0, 5).map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className="text-base md:text-lg font-semibold text-gray-700 hover:text-red-700 tracking-wide transition"
              >
                {category}
              </button>
            ))}
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4 md:space-x-6">
            {/* Search */}
            <button
              onClick={() => setSearchBarOpen(!isSearchBarOpen)}
              className="text-gray-800 hover:text-red-600"
            >
              <Search className="h-6 w-6 md:h-8 md:w-8" />
            </button>

            {/* Sidebar Toggle */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-800 hover:text-red-600 focus:outline-none"
            >
              <Menu className="h-6 w-6 md:h-8 md:w-8" />
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar Content */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute top-4 right-4 text-gray-800 hover:text-red-600 focus:outline-none"
        >
          <X className="h-8 w-8" />
        </button>
        <div className="mt-16 flex flex-col space-y-6 px-6">
          <Link
            to="/about"
            className="text-xl sm:text-2xl font-semibold text-gray-800 hover:text-red-600"
            onClick={() => setSidebarOpen(false)}
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-xl sm:text-2xl font-semibold text-gray-800 hover:text-red-600"
            onClick={() => setSidebarOpen(false)}
          >
            Contact
          </Link>
        </div>
      </div>

      {/* Search Bar */}
      {isSearchBarOpen && (
        <div className="w-full bg-white border-t border-b shadow-md">
          <div className="max-w-screen-xl mx-auto px-4 md:px-8 py-4 flex flex-col md:flex-row items-start md:items-center gap-4">
            <form
              onSubmit={handleFormSubmit}
              className="flex w-full md:w-2/3 items-center border-2 border-gray-700 rounded-lg px-4 py-2 md:py-3 shadow-sm"
            >
              <input
                type="text"
                placeholder="Search artwork..."
                className="w-full text-base md:text-lg font-medium text-gray-700 bg-transparent outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit">
                <Search className="h-6 w-6 text-red-600" />
              </button>
            </form>

            {/* Category Chips */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className="px-3 md:px-4 py-1.5 md:py-2 text-sm sm:text-base font-semibold border border-gray-700 text-gray-800 rounded-full hover:bg-gray-800 hover:text-white transition-all duration-200"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
