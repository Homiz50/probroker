import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchInput.css";
import Cookies from "js-cookie"; // Import js-cookie if not already imported
import gsap from "gsap";

const SearchInput = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    const isLoggedIn = Cookies.get("userId");
    const isPremium = Cookies.get("isPremium");
    if (isPremium === "1") {
      navigate("/filter");
    } else if (isLoggedIn && isPremium === "0") {
      alert("Please Buy Premium");
    } else {
      navigate("/signup");
    }
    // if (isLoggedIn) {
    //   navigate("/filter");
    // } else {
    //   navigate("/signup");
    // }
  };

  useEffect(() => {
    const container = document.querySelector(".search-input-container");

    const handleMouseEnter = () => {
      gsap.to(container, { scale: 1.05, duration: 0.3 });
    };

    const handleMouseLeave = () => {
      gsap.to(container, { scale: 1, duration: 0.3 });
    };

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    // Cleanup function to remove event listeners
    return () => {
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="search-input-container    left-[-5px] relative " onClick={handleClick}>
      <svg className="absolute left-6 " xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="23" fill="#ffffff" height="23" viewBox="0 0 50 50">
        <path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"></path>
      </svg>



      <input

        type="text"
        className="search-input font-semibold bg-[#503691]   text-center rounded-3xl   h-[50px]  placeholder:text-white"
        placeholder="Start Your Property Search  "
        readOnly // Prevents typing, making it clear that it's a clickable field
      />
      <svg className="absolute right-8" xmlns="http://www.w3.org/2000/svg" width="28" height="50" viewBox="0 0 100 50" fill="#ffffff" >
        <line x1="22" y1="25" x2="90" y2="25" stroke="#ffffff" stroke-width="8" stroke-linecap="round" />
        <polyline  points="80,10 95,25 80,40" fill="none" stroke="#ffffff" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />
      </svg>

      {/* <button className="custom-button">{"Search"}</button> */}
    </div>
  );
};

export default SearchInput;
