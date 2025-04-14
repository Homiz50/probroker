import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ResidentialRental.css";
import Cookies from "js-cookie"; // Import js-cookie if not already imported
import SimpleModal from "./SimpleModal";
import Loader from "./Loader"; // Import a loader component
import PropertyCard from "./PropertyCard";
import { useNavigate } from "react-router-dom";
import List from "./List"; // Import the List component
import ResidentialRental from "./ResidentialRental";

const SavedProperties = () => {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPageChanging, setIsPageChanging] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const isPremium = Cookies.get("isPremium");

  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    content: null,
  });

  // Add this state for view preference (initialize from localStorage)
  const [isListView, setIsListView] = useState(() => {
    const savedView = localStorage.getItem('savedPropertiesListView');
    return savedView === 'list';
  });

  // Add this effect to save the view preference when it changes
  useEffect(() => {
    localStorage.setItem('savedPropertiesListView', isListView ? 'list' : 'grid');
  }, [isListView]);

  const fetchProperties = async (page = 0) => {
    setIsLoading(true);
    setIsPageChanging(true); // Show page change loader

    try {
      const userId = Cookies.get("userId");

      const response = await axios.post(
        `${process.env.REACT_APP_API_IP}/user/v2/ckjshcigsuch/kjciushcuihn/${userId}/saved-properties/ckjsiuc?page=${page}&size=25`
      );

      const newProperties = response.data.data.properties;
      setProperties(newProperties);
      setTotalPages(response.data.data.totalPages);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }

    setIsLoading(false);
    setIsPageChanging(false);
  };

  useEffect(() => {
    fetchProperties(currentPage); // Fetch properties based on 0-based page number
  }, [currentPage]);

  // Add useEffect to scroll to the top after properties are updated
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scroll to the top
    });
  }, [properties]); // Trigger scroll when properties are updated

  const handlePageChange = (page) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
    }
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

  return (
    <div className="property-list mx-0 md:mx-8 pagination-container relative">
      <div className="flex items-center w-full justify-between gap-10">
        <p className="text-center my-4 text-3xl "><b>Saved Properties</b></p>
           
           
           <div className="hidden md:flex  items-center gap-2">
            <span className="text-sm text-slate-600"> Change View :</span>
            <div className="flex bg-white border-2 gap-2 w-[75px] h-10 border-blue-100 rounded-full py-[5px] px-2">
              <button
                className={`h-6 w-6 flex items-center justify-center rounded-full transition-all ${!isListView ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-sm' : 'text-blue-600'}`}
                onClick={() => setIsListView(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="34" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-layout-grid h-4 w-4">
                  <rect width="7" height="7" x="3" y="3" rx="1"></rect>
                  <rect width="7" height="7" x="14" y="3" rx="1"></rect>
                  <rect width="7" height="7" x="14" y="14" rx="1"></rect>
                  <rect width="7" height="7" x="3" y="14" rx="1"></rect>
                </svg>
              </button>


              <button
                className={`flex h-6 w-6 items-center justify-center rounded-full transition-all ${isListView ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-sm' : 'text-blue-600'}`}
                onClick={() => setIsListView(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-list h-4 w-4"
                >
                  <line x1="8" x2="21" y1="6" y2="6" />
                  <line x1="8" x2="21" y1="12" y2="12" />
                  <line x1="8" x2="21" y1="18" y2="18" />
                  <line x1="3" x2="3.01" y1="6" y2="6" />
                  <line x1="3" x2="3.01" y1="12" y2="12" />
                  <line x1="3" x2="3.01" y1="18" y2="18" />
                </svg>
              </button>

            </div>
          </div>

      </div>
      {/* <ResidentialRental /> */}
      {isPageChanging && <Loader />}

      <div className="property-list-container">
        {isLoading && properties.length === 0 ? (
          <Loader />
        ) : properties.length === 0 ? (
          <div className="no-properties">No properties found</div>
        ) : (
          <div>
            {isListView ? (
              <List properties={properties} /> // Make sure to pass your actual properties array
            ) : (
              <div className="properties-grid">
                {properties.map((property) => (
                  <div key={property.id} className="gap-4 mt-2 md:m-4">
                    <PropertyCard property={property} />
                  </div>
                ))}
              </div>
            )}
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
            className={`pagination-btn ${
              currentPage === totalPages - 1 ? "disabled" : ""
            }`}
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

export default SavedProperties;
