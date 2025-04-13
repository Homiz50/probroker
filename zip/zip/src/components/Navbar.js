// src/components/Navbar.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import "./Navbar.css";
import image from "../image/probrocker-logo.png";
import HelpButton from "./HelpButton"; // Adjust the path accordingly
import { Button } from "bootstrap";
import SuggestionModal from "./SuggestionModal";

const Navbar = () => {
  const isLoggedIn = Cookies.get("userId");
  const [menuActive, setMenuActive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  const handleLinkClick = () => {
    setMenuActive(false); // Close the menu when a link is clicked
  };

  const handleLogout = () => {
    Cookies.remove("userId"); // Remove the userId cookie to log out the user
    window.location.href = "/"; // Redirect to the home page
    window.location.reload(); // Reload the page to apply the logout state
  };

  return (
    <nav className="navbar z-20">
      <div className="navbar-logo">
        <a href="/">
          <img src={image} alt="Pro Broker" />
        </a>
      </div>

      <div className={`navbar-menu ${menuActive ? "active" : ""}`}>
        <Link
          to="/"
          className="hover:bg-[#f0f0f0] text-black px-3 py-1.5 rounded-lg"
          onClick={handleLinkClick} // Close menu on click
        >
          Home
        </Link>
        <Link
          to="/"
          className="hover:bg-[#f0f0f0] text-black px-3 py-1.5 rounded-lg"
          onClick={openModal}
        >
          Suggestion
        </Link>

        {isLoggedIn ? (
          <>
            {/* Dropdown for larger screens */}
            <div className="dropdown hidden lg:block">
              <button className="hover:bg-[#f0f0f0] text-black px-3 py-1.5 rounded-lg">
                Profile
              </button>
              <div className="dropdown-menu hidden absolute bg-white shadow-md rounded-lg mt-1 p-2">
                <Link
                  to="/my-profile"
                  className="block px-4 py-2 text-black hover:bg-gray-100"
                  onClick={handleLinkClick} // Close menu on click
                >
                  Your Profile
                </Link>
                <Link
                  to="/saved-properties"
                  className="block px-4 py-2 text-black hover:bg-gray-100"
                  onClick={handleLinkClick} // Close menu on click
                >
                  Saved Properties
                </Link>
              </div>
            </div>

            <Link
              to="/my-profile"
              className="hover:bg-[#f0f0f0] text-black px-3 py-1.5 rounded-lg lg:hidden"
            >
              Your Profile
            </Link>
            <Link
              to="/saved-properties"
              className="hover:bg-[#f0f0f0] text-black px-3 py-1.5 rounded-lg lg:hidden"
            >
              Saved Properties
            </Link>
            {/* Direct links for mobile/tablet (visible on smaller screens) */}
            {/* <div className="block lg:hidden">
              <Link
                to="/saved-properties"
                className="hover:bg-[#f0f0f0] text-black px-3 py-1.5 rounded-lg"
              >
              </Link>
              <Link
                to="/contacted-properties"
                className="hover:bg-[#f0f0f0] text-black px-3 py-1.5 rounded-lg"
              >
              </Link>
            </div> */}

            <button
              onClick={handleLogout}
              className="hover:bg-white bg-[#503691] border border-[#503691] text-white hover:text-[#503691] px-6 py-1.5 rounded-full"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/signup"
              className="bg-white font-bold hover:bg-[#503691] border border-[#503691] hover:text-white text-[#503691] px-6 py-1.5 rounded-full"
              onClick={handleLinkClick} // Close menu on click
            >
              Register
            </Link>
            <Link
              to="/login"
              className="hover:bg-white font-bold bg-[#503691] border border-[#503691] text-white hover:text-[#503691] px-6 py-1.5 rounded-full mt-2 lg:mt-0"
              onClick={handleLinkClick} // Close menu on click
            >
              Login
            </Link>
          </>
        )}
      </div>

      <div className="navbar-toggle" onClick={toggleMenu}>
        ☰
      </div>
      <HelpButton />
      {isModalOpen && <SuggestionModal onClose={closeModal} />}
    </nav>
  );
};

export default Navbar;
