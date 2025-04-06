import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ResidentialRental.css";
import Cookies from "js-cookie"; // Import js-cookie if not already imported
import SimpleModal from "./SimpleModal";
import Loader from "./Loader"; // Import a loader component
import PropertyCard from "./PropertyCard";

const ContactedProperties = () => {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPageChanging, setIsPageChanging] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const isPremium = Cookies.get("isPremium");

  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    content: null,
  });

  const fetchProperties = async (page = 0) => {
    setIsLoading(true);
    setIsPageChanging(true); // Show page change loader

    try {
      const userId = Cookies.get("userId");

      const response = await axios.post(
        `${process.env.REACT_APP_API_IP}/user/v2/cijwubwi/cjwvucshbuhw/${userId}/contacted-properties/clnfuhcbw?page=${page}&size=25`
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
      <div>
        <p className="text-center my-4 text-3xl ">
          <b>Contacted Properties</b>
        </p>
      </div>
      {isPageChanging && <Loader />}

      <div className="property-list-container">
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

export default ContactedProperties;
