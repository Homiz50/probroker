// src/components/Navbar.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import "./Navbar.css";
import image from "../image/probrocker-logo.png";
import HelpButton from "./HelpButton"; // Adjust the path accordingly
import { Button } from "bootstrap";
import SuggestionModal from "./SuggestionModal";
import { gsap } from "gsap";

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

  useEffect(() => {
    const buttons = document.querySelectorAll(
      ".navbar-menu .hover\\:bg-\\[\\#f0f0f0\\], .dropdown button, .dropdown-menu a"
    );

    buttons.forEach((button) => {
      const handleMouseEnter = () => {
        gsap.to(button, { scale: 1.1, duration: 0.3 });
      };

      const handleMouseLeave = () => {
        gsap.to(button, { scale: 1, duration: 0.3 });
      };

      button.addEventListener("mouseenter", handleMouseEnter);
      button.addEventListener("mouseleave", handleMouseLeave);

      // Cleanup function to remove event listeners
      return () => {
        button.removeEventListener("mouseenter", handleMouseEnter);
        button.removeEventListener("mouseleave", handleMouseLeave);
      };
    });
  }, []);

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

<Link to="/property-listed">
          <button
            class="bg-[#EFE9FF] 
         hover:from-blue-600 hover:to-indigo-600 
         text-[#503691]  px-3 py-2.5 rounded-full 
         transition-all border border-[#503691] duration-200 
         flex items-center gap-1.5 
         text-xs font-bold shadow-md shadow-blue-500/10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-building2 w-3 h-3"
            >
              <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"></path>
              <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"></path>
              <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"></path>
              <path d="M10 6h4"></path>
              <path d="M10 10h4"></path>
              <path d="M10 14h4"></path>
              <path d="M10 18h4"></path>
            </svg>
            Add Property
          </button>

        </Link>

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
