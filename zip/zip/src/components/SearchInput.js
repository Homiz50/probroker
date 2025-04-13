import React from "react";
import { useNavigate } from "react-router-dom";
import "./SearchInput.css";
import Cookies from "js-cookie"; // Import js-cookie if not already imported

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

  return (
    <div className="search-input-container" onClick={handleClick}>
      <input
        type="text"
        className="search-input"
        placeholder="Search..."
        readOnly // Prevents typing, making it clear that it's a clickable field
      />
      <button className="custom-button">{"Search"}</button>
    </div>
  );
};

export default SearchInput;
