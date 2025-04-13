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

// const ResidentialRental = () => {
//   const [properties, setProperties] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [hasMore, setHasMore] = useState(true);
//   const [selectedStatus, setSelectedStatus] = useState(""); // To store selected status
//   const [selectedListedBy, setSelectedListedBy] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const bottomBoundaryRef = useRef();
//   const location = useLocation();
//   const navigate = useNavigate();

//   const { type, status, filters, listedBy } = location.state || {}; // Assuming filters and type are passed via state

//   const isPremium = Cookies.get("isPremium"); // Get the isPremium status

//   const [modal, setModal] = useState({
//     isOpen: false,
//     title: "",
//     content: null,
//   });

//   useEffect(() => {
//     if (status) {
//       setSelectedStatus(status); // Set initial status from props
//     }
//   }, [status]);

//   useEffect(() => {
//     if (listedBy) {
//       setSelectedListedBy(listedBy); // Set initial status from props
//     }
//   }, [listedBy]);

//   const fetchProperties = async (page = 0, append = false) => {
//     setIsLoading(true);
//     try {
//       const userId = Cookies.get("userId");

//       const payload = {
//         userId: userId || "",
//         type: type || "",
//         status: selectedStatus || "",
//         listedBy: selectedListedBy || "",
//         search: searchQuery || "",
//         ...(selectedStatus === "today" || selectedStatus === "yesterday"
//           ? {}
//           : filters),
//       };
//       const response = await axios.post(
//         `${process.env.REACT_APP_API_IP}/user/properties/filter/jkdbxcb/wdjkwbshuvcw/fhwjvshudcknsb?page=${page}&size=25`,
//         payload
//       );

//       const newProperties = response.data.data.properties;

//       // Check for duplicate keys
//       const uniqueProperties = newProperties.filter(
//         (property, index, self) =>
//           index === self.findIndex((p) => p.id === property.id)
//       );

//       setProperties((prevProperties) =>
//         append ? [...prevProperties, ...uniqueProperties] : uniqueProperties
//       );
//       setHasMore(newProperties.length > 0);
//       setCurrentPage(page + 1);
//     } catch (error) {
//       //   console.error("Error fetching properties:", error);
//     }
//     setIsLoading(false);
//   };

//   useEffect(() => {
//     if (filters || type || selectedStatus) {
//       fetchProperties();
//     }
//   }, [filters, type, selectedStatus]); // Fetch properties when filters or type changes

//   useEffect(() => {
//     const handleScroll = () => {
//       if (isLoading || !hasMore || !bottomBoundaryRef.current) return;
//       if (
//         bottomBoundaryRef.current.getBoundingClientRect().bottom <=
//         window.innerHeight
//       ) {
//         fetchProperties(currentPage, true);
//       }
//     };

//     const debouncedHandleScroll = debounce(handleScroll, 300); // Debounce scroll event

//     window.addEventListener("scroll", debouncedHandleScroll);
//     return () => {
//       window.removeEventListener("scroll", debouncedHandleScroll);
//     };
//   }, [isLoading, hasMore, currentPage]);

//   // Debounce function
//   function debounce(func, delay) {
//     let timer;
//     return (...args) => {
//       clearTimeout(timer);
//       timer = setTimeout(() => func.apply(this, args), delay);
//     };
//   }

//   useEffect(() => {
//     if (selectedStatus) {
//       fetchProperties(0, false);
//     }
//   }, [selectedStatus]);

//   const handleClick = () => {
//     const isLoggedIn = Cookies.get("userId");
//     // const isPremium = Cookies.get("isPremium");
//     if (isPremium === "1") {
//       navigate("/filter");
//     } else if (isLoggedIn && isPremium === "0") {
//       alert("Please Buy Premium");
//     } else {
//       navigate("/signup");
//     }
//   };
//   return (
//     <div className="property-list mx-0 md:mx-8" style={{ background: "#FAF7FF" }}>
//       <div className="property-list-container">
//           <div className="flex items-center my-8 mx-4 md:mx-8">
//             <div className="md:w-1/2 bg-white w-9/12 rounded-lg flex items-center">
//               <input
//                 type="text"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="p-2 rounded-lg w-full"
//                 placeholder={"start your search  with ai"}
//               />
//               <button onClick={
//                 () => {
//                   fetchProperties()
//                 }
//               } className="relative z-10 bg-gradient-to-r from-[#2DA1FE] to-[#AD43FE] text-white py-2 px-4 rounded w-fit text-nowrap">
//                 Search
//               </button>
//             </div>
//              <div className="">
//               <button
//                 className="bg-blue-800 text-white py-1.5 px-4 rounded-full ml-2 md:ml-6"
//                 onClick={handleClick}
//               >
//                 Filter
//               </button>
//             </div>
//           </div>
//         {isLoading && properties.length === 0 ? (
//           <Loader /> // Replace text loader with actual loader component
//         ) : properties.length === 0 ? (
//           <div className="no-properties">No properties found</div>
//         ) : (
//           <div>
//             {properties.length !== 0 &&
//               !isLoading &&
//               properties.map((property) => (
//                 <div key={property.id} className="gap-4 mt-2 md:m-4">
//                   <PropertyCard property={property} />
//                 </div>
//               ))}
//           </div>
//         )}
//         <div ref={bottomBoundaryRef}></div> {/* Trigger loading more */}
//       </div>
//       {isLoading && <Loader/>}
//       <SimpleModal
//         isOpen={modal.isOpen}
//         onClose={() => setModal({ ...modal, isOpen: false })}
//         title={modal.title}
//       >
//         {modal.content}
//       </SimpleModal>
//     </div>
//   );
// };

// const ResidentialRental = () => {
//   const [properties, setProperties] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isPageChanging, setIsPageChanging] = useState(false);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [totalPages, setTotalPages] = useState(1);
//   const [totalItems, setTotalItems] = useState(0);
//   const [selectedStatus, setSelectedStatus] = useState("");
//   const [selectedListedBy, setSelectedListedBy] = useState("");
//   const [selectedListedOn, setSelectedListedOn] = useState(null); // Date state
//   const [searchQuery, setSearchQuery] = useState("");
//   const location = useLocation();
//   const navigate = useNavigate();

//   const { type: stateType, status, filters } = location.state || {};
//   const [type, setType] = useState(stateType || "");

//   const isPremium = Cookies.get("isPremium");

//   const [modal, setModal] = useState({
//     isOpen: false,
//     title: "",
//     content: null,
//   });

//   useEffect(() => {
//     if (status) setSelectedStatus(status);
//   }, [status]);

//   // useEffect(() => {
//   //   if (listedBy) setSelectedListedBy(listedBy);
//   // }, [listedBy]);

//   const fetchProperties = async (page = 0) => {
//     setIsLoading(true);
//     setIsPageChanging(true); // Show page change loader

//     try {
//       const userId = Cookies.get("userId");

//       let payload;
//       if (selectedListedOn) {
//         // If a date is selected, use only the date to filter properties
//         payload = {
//           userId: userId || "",
//           type,
//           status: selectedStatus || "",
//           search: searchQuery || "",
//           listedOn: formatDate(selectedListedOn), // Date is the primary filter
//         };
//       } else {
//         payload = {
//           userId: userId || "",
//           type,
//           status: selectedStatus || "",
//           listedBy: selectedListedBy || "",
//           search: searchQuery || "",
//           // listedOn: formatDate(selectedListedOn), // Using the formatDate function
//           ...(selectedStatus === "today" || selectedStatus === "yesterday"
//             ? {}
//             : filters),
//         };
//       }

//       const response = await axios.post(
//         `${process.env.REACT_APP_API_IP}/user/v2/properties/filter/jkdbxcb/wdjkwbshuvcw/fhwjvshudcknsb?page=${page}&size=25`,
//         payload
//       );

//       const newProperties = response.data.data.properties;
//       setProperties(newProperties);
//       setTotalPages(response.data.data.totalPages);
//       setCurrentPage(page);
//       setTotalItems(response.data.data.totalItems);
//     } catch (error) {
//       console.error("Error fetching properties:", error);
//     }

//     setIsLoading(false);
//     setIsPageChanging(false);
//   };
//   useEffect(() => {
//     fetchProperties(currentPage); // Fetch properties when page or filter changes
//   }, [currentPage]);

//   useEffect(() => {
//     // Reset to the first page whenever filters change
//     setCurrentPage(0);
//     fetchProperties(0);
//   }, [filters, type, selectedStatus, selectedListedOn]);

//   useEffect(() => {
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth", // Smooth scroll to the top
//     });
//   }, [properties]); // Trigger scroll when properties are updated

//   const handlePageChange = (page) => {
//     if (page >= 0 && page < totalPages) {
//       setCurrentPage(page);
//       // fetchProperties(page); // Ensure to fetch properties for the selected page
//     }
//   };

//   const handleDateChange = (date) => {
//     setSelectedListedOn(date);
//     // fetchProperties(0); // Refetch properties when date changes
//   };

//   const formatDate = (date) => {
//     if (!date) return "";
//     const d = new Date(date);
//     const day = `0${d.getDate()}`.slice(-2); // Ensures two digits
//     const month = `0${d.getMonth() + 1}`.slice(-2); // Ensures two digits, and getMonth() is zero-based
//     const year = d.getFullYear();
//     return `${day}/${month}/${year}`;
//   };

//   const handleClick = () => {
//     const isLoggedIn = Cookies.get("userId");
//     if (isPremium === "1") {
//       navigate("/filter");
//     } else if (isLoggedIn && isPremium === "0") {
//       alert("Please Buy Premium");
//     } else {
//       navigate("/signup");
//     }
//   };

//   return (
//     <div className="property-list mx-0 md:mx-8 pagination-container relative">
//       {isPageChanging && <Loader />}

//       <div className="property-list-container">
//         <div className="flex items-center my-8 mx-4 md:mx-8">
//           <div className="md:w-1/2 bg-white w-9/12 rounded-lg flex items-center">
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="p-2 rounded-lg w-full"
//               placeholder={"search area/premise name"}
//             />
//             <button
//               onClick={() => fetchProperties(0)}
//               className="relative z-10 bg-gradient-to-r from-[#2DA1FE] to-[#AD43FE] text-white py-2 px-4 rounded w-fit"
//             >
//               Search
//             </button>
//           </div>
//           <div className="ml-2">
//             <button
//               className="bg-blue-800 text-white py-1.5 px-4 rounded-full"
//               onClick={handleClick}
//             >
//               Filter
//             </button>
//           </div>
//         </div>
//         <div className="">
//           <div className="flex items-center my-8 mx-4 md:mx-8">
//             <DatePicker
//               selected={selectedListedOn}
//               onChange={handleDateChange}
//               className="form-control p-2 rounded-lg w-full date-picker-highlight"
//               placeholderText="Select listed date"
//               isClearable={true} // Allows clearing the date selection
//               clearButtonTitle="Clear date"
//               maxDate={new Date()} // Restrict selection to today or earlier
//             />
//             {/* Additional UI elements remain the same */}
//           </div>
//           <div>
//             {" "}
//             <p className="ml-4 text-gray-700 text-center">
//               {totalItems > 0 && `${totalItems} Properties found`}
//             </p>
//           </div>
//         </div>
//         {isLoading && properties.length === 0 ? (
//           <Loader />
//         ) : properties.length === 0 ? (
//           <div className="no-properties">No properties found</div>
//         ) : (
//           <div className="properties-grid">
//             {properties.map((property) => (
//               <div key={property.id} className="gap-4 mt-2 md:m-4">
//                 <PropertyCard property={property} />
//               </div>
//             ))}
//           </div>
//         )}

//         <div className="pagination">
//           <button
//             className={`pagination-btn ${currentPage === 0 ? "disabled" : ""}`}
//             onClick={() => handlePageChange(currentPage - 1)}
//             disabled={currentPage === 0}
//           >
//             Previous
//           </button>
//           <span className="pagination-info">
//             Page {currentPage + 1} of {totalPages}
//           </span>
//           <button
//             className={`pagination-btn ${
//               currentPage === totalPages - 1 ? "disabled" : ""
//             }`}
//             onClick={() => handlePageChange(currentPage + 1)}
//             disabled={currentPage === totalPages - 1}
//           >
//             Next
//           </button>
//         </div>
//       </div>

//       <SimpleModal
//         isOpen={modal.isOpen}
//         onClose={() => setModal({ ...modal, isOpen: false })}
//         title={modal.title}
//       >
//         {modal.content}
//       </SimpleModal>
//     </div>
//   );
// };

// export default ResidentialRental;

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
  const location = useLocation();
  const navigate = useNavigate();

  const { type: stateType, status, filters } = location.state || {};
  const [type, setType] = useState(stateType || "");

  const isPremium = Cookies.get("isPremium");

  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    content: null,
  });

  // useEffect(() => {
  //   if (listedBy) setSelectedListedBy(listedBy);
  // }, [listedBy]);

  const fetchProperties = async (page = 0) => {
    setIsLoading(true);
    try {
      const userId = Cookies.get("userId");

      // const payload = {
      //   userId: userId || "",
      //   type,
      //   status: selectedStatus || "",
      //   search: searchQuery || "",
      //   listedOn: selectedListedOn ? formatDate(selectedListedOn) : "",
      //   ...filters,
      // };

      let payload;
      if (selectedListedOn) {
        // If a date is selected, use only the date to filter properties
        payload = {
          userId: userId || "",
          type,
          status: selectedStatus || "",
          search: searchQuery || "",
          listedOn: formatDate(selectedListedOn), // Date is the primary filter
        };
      } else {
        payload = {
          userId: userId || "",
          type,
          status: selectedStatus || "",
          listedBy: selectedListedBy || "",
          search: searchQuery || "",
          // listedOn: formatDate(selectedListedOn), // Using the formatDate function
          ...(selectedStatus === "today" || selectedStatus === "yesterday"
            ? {}
            : filters),
        };
      }

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
        <div className="flex items-center my-8 mx-4 md:mx-8">
          <div className="md:w-1/2 bg-white w-9/12 rounded-lg flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-2 rounded-lg w-full"
              placeholder={"search area/premise name"}
            />
            <button
              onClick={() => fetchProperties(0)}
              className="relative z-10 bg-gradient-to-r from-[#2DA1FE] to-[#AD43FE] text-white py-2 px-4 rounded w-fit"
            >
              Search
            </button>
          </div>
          <div className="ml-2">
            <button
              className="bg-blue-800 text-white py-1.5 px-4 rounded-full"
              onClick={handleClick}
            >
              Filter
            </button>
          </div>
        </div>
        <div className="">
          <div className="flex items-center my-8 mx-4 md:mx-8">
            <DatePicker
              selected={selectedListedOn}
              onChange={handleDateChange}
              className="form-control p-2 rounded-lg w-full date-picker-highlight"
              placeholderText="Select listed date"
              isClearable={true} // Allows clearing the date selection
              clearButtonTitle="Clear date"
              maxDate={new Date()} // Restrict selection to today or earlier
            />
            {/* Additional UI elements remain the same */}
          </div>
          <div>
            {" "}
            <p className="ml-4 text-gray-700 text-center">
              {totalItems > 0 && `${totalItems} Properties found`}
            </p>
          </div>
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

export default ResidentialRental;
