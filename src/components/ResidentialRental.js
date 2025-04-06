import React, { useEffect, useState, useRef } from "react";
import DatePicker from "react-datepicker";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ResidentialRental.css";
import Cookies from "js-cookie"; // Import js-cookie if not already imported
import SimpleModal from "./SimpleModal";
import Loader from "./Loader"; // Import a loader component
import PropertyCard from "./PropertyCard";
import "react-datepicker/dist/react-datepicker.css"; // Importing DatePicker styles
import { debounce } from "lodash"; // Make sure lodash is installed or implement your own debounce function

const ResidentialRental = () => {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPageChanging, setIsPageChanging] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedListedBy, setSelectedListedBy] = useState("");
  const [selectedListedOn, setSelectedListedOn] = useState(null); // Date state
  const [searchQuery, setSearchQuery] = useState("");
  const [propertyTypes, setPropertyTypes] = useState([]); // State for property types
  const location = useLocation();
  const navigate = useNavigate();

  const { type: stateType, status, filters } = location.state || {};
  const [type, setType] = useState(stateType || "All");

  const isPremium = Cookies.get("isPremium");

  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    content: null,
  });

  // Fetch property types from the server or define them here
  useEffect(() => {
    const fetchPropertyTypes = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_IP}/property/types`);
        setPropertyTypes(response.data.types);
      } catch (error) {
        console.error("Error fetching property types:", error);
        // Fallback to predefined types if fetching fails
        setPropertyTypes(["All", "Residential Rent", "Commercial Rent", "Residential Sell", "Commercial Sell"]);
      }
    };

    fetchPropertyTypes();
  }, []);

  const fetchProperties = async (page = 0) => {
    setIsLoading(true);
    try {
      const userId = Cookies.get("userId");

      const payload = {
        userId: userId || "",
        type: type === "All" ? "" : type,
        status: selectedStatus || "",
        search: searchQuery || "",
        listedOn: selectedListedOn ? formatDate(selectedListedOn) : "",
        ...filters,
      };

      const response = await axios.post(
        `${process.env.REACT_APP_API_IP}/user/v2/properties/filter/jkdbxcb/wdjkwbshuvcw/fhwjvshudcknsb?page=${page}&size=25`,
        payload
      );

      const newProperties = response.data.data.properties;
      setProperties(newProperties);
      setTotalPages(response.data.data.totalPages);
      setCurrentPage(page);
      setTotalItems(response.data.data.totalItems);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
    setIsLoading(false);
  };

  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const day = `0${d.getDate()}`.slice(-2); // Ensures two digits
    const month = `0${d.getMonth() + 1}`.slice(-2); // Ensures two digits, and getMonth() is zero-based
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handlePageChange = (page) => {
    if (page >= 0 && page < totalPages) {
      setIsPageChanging(true); // Show loader or indicator
      fetchProperties(page).then(() => {
        setCurrentPage(page); // Update the current page after data is fetched
        setIsPageChanging(false); // Hide loader or indicator
      });
    }
  };

  const handleDateChange = (date) => {
    setSelectedListedOn(date);
  };

  const handleClick = () => {
    const isLoggedIn = Cookies.get("userId");
    if (isPremium === "1") {
      navigate("/filter");
    } else if (isLoggedIn && isPremium === "0") {
      alert("Please Buy Premium");
    } else {
      navigate("/signup");
    }
  };

  useEffect(() => {
    if (!filters && !type && !selectedStatus && !selectedListedOn) return;
    fetchProperties(currentPage);
  }, [filters, type, selectedStatus, selectedListedOn]); // Remove currentPage from dependencies

  useEffect(() => {
    if (status) setSelectedStatus(status);
  }, [status]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [properties]);

  return (
    <div className="property-list mx-0 md:mx-8 pagination-container relative">
      {isPageChanging && <Loader />}

      <div className="property-list-container">
        <div className="flex items-center justify-start flex-wrap gap-[15px] my-4 mx-8">
          {/* Property Type Dropdown */}
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="p-2 rounded-lg"
          >
            {propertyTypes.map((propertyType) => (
              <option key={propertyType} value={propertyType}>
                {propertyType}
              </option>
            ))}
          </select>

          {/* Total Properties */}
          <p className="text-gray-700 whitespace-nowrap">
            {totalItems > 0 && `${totalItems} Properties found`}
          </p>

          {/* Date Picker */}
          <div className="relative">
            <DatePicker
              selected={selectedListedOn}
              onChange={handleDateChange}
              className="form-control h-12 p-2 rounded-lg w-[200px] shadow-md"
              placeholderText="Select listed date"
              isClearable={true}
              clearButtonTitle="Clear date"
              maxDate={new Date()}
            />
          </div>

          {/* Search Box */}
          <div className="relative w-[600px]">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-3 pr-20 rounded-lg w-full placeholder:text-gray-400 shadow-md"
              placeholder="Premise Name"
            />
            <button
              onClick={() => fetchProperties(0)}
              className="absolute right-1 top-1 bottom-1 bg-[#503691] text-white px-4 rounded-md shadow-lg"
            >
              Search
            </button>
          </div>

          {/* All Filter Button */}
          <button
            className="bg-[#503691] text-white py-3 flex items-center gap-2 px-6 rounded-xl"
            onClick={handleClick}
          >
            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 4L15 12V21L9 18V15.5M9 12L4 4H16" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            All Filter
          </button>
        </div>

        {isLoading && properties.length === 0 ? (
          <Loader />
        ) : properties.length === 0 ? (
          <div className="no-properties">No properties found</div>
        ) : (
          <div className="properties-grid">
            {properties.map((property) => (
              <div key={property.id} className="gap-4 mt-2 md:m-4">
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        )}

        <div className="pagination">
          <button
            className={`pagination-btn ${currentPage === 0 ? "disabled" : ""}`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 0}
          >
            Previous
          </button>
          <span className="pagination-info">
            Page {currentPage + 1} of {totalPages}
          </span>
          <button
            className={`pagination-btn ${currentPage === totalPages - 1 ? "disabled" : ""}`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages - 1}
          >
            Next
          </button>
        </div>
      </div>

      <SimpleModal
        isOpen={modal.isOpen}
        onClose={() => setModal({ ...modal, isOpen: false })}
        title={modal.title}
      >
        {modal.content}
      </SimpleModal>
    </div>
  );
};

export default ResidentialRental;
