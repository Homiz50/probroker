import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const Dropdown = ({ propertyType, status, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  // const options = ["Active", "Not Answer", "Rent out", "Busy"];
  const options =
    propertyType === "Residential Sell" || propertyType === "Commercial Sell"
      ? [
          "Active",
          "Not Answer",
          "Sell out",
          "Data Mismatch",
          "Broker",
          "Duplicate",
        ]
      : [
          "Active",
          "Not Answer",
          "Rent out",
          "Data Mismatch",
          "Broker",
          "Duplicate",
        ];

  const handleOptionClick = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  const getStatusClassName = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-500";
      case "Rent out":
        return "bg-red-500";
      case "Sell out":
        return "bg-red-500";
      case "Data Mismatch":
        return "bg-gray-500";
      case "Not Answer":
        return "bg-yellow-500";
      case "Broker":
        return "bg-blue-500";
      case "Duplicate":
        return "bg-purple-500"; // New color for Duplicate status
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className={`border border-gray-300  text-white rounded-lg px-2 lg:py-2 py-1 w-full ${getStatusClassName(
          status
        )}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {status}
        {isOpen ? (
          <FaChevronUp className="inline-block ml-2" />
        ) : (
          <FaChevronDown className="inline-block ml-2" />
        )}
      </button>

      {isOpen && (
        <ul className="custom-left-offset mt-1 w-32 bg-white border border-gray-300 rounded-lg shadow-lg z-10 left-45">
          {options.map((option) => (
            <li
              key={option}
              className="px-4 py-2 cursor-pointer hover:bg-gray-200 text-nowrap"
              onClick={() => handleOptionClick(option)} // Pass the option directly
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
