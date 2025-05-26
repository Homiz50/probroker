import React, { useEffect, useState, useRef } from "react";
import "./FilterPage.css";
import { useNavigate } from "react-router-dom";
import CustomRangeSlider from "./CustomRangeSlider";

const FilterPage = () => {
  const navigate = useNavigate();
  const min = 0;
  const max = 10000;
  const steps = 10;
  const [rangeValues, setRangeValues] = useState([min, max]);
  const status = "active";
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const searchInputRef = useRef(null);
  const [visibleAreasCount, setVisibleAreasCount] = useState(
    window.innerWidth < 768 ? 14 : 35
  ); // State to manage visible areas
  const [isShowingAllAreas, setIsShowingAllAreas] = useState(false); // New state to track if showing all areas

  const initialType = Location.state?.type || "Residential Rent";

  const [filters, setFilters] = useState({
    type: initialType, // Default selected type
    furnishedTypes: [],
    areas: [],
    bhks: [],
    subType: [],
    minRent: "",
    maxRent: "",
    status: "active",
    listedBy: "",
    minsqFt: min,
    maxsqFt: max,
  });

  const clearFilters = () => {
    // Clear the filters state
    setFilters({
      type: initialType,
      furnishedTypes: [],
      areas: [],
      bhks: [],
      subType: [],
      minRent: "",
      maxRent: "",
      status: "active",
      listedBy: "",
      minsqFt: min,
      maxsqFt: max,
    });

    // Remove filters from localStorage
    localStorage.removeItem("filters");

    // Optionally, reset range values to initial state
    setRangeValues([min, max]);
  };

  // Retrieve filters from localStorage on component mount
  useEffect(() => {
    const storedFilters = localStorage.getItem("filters");

    if (storedFilters) {
      const parsedFilters = JSON.parse(storedFilters);

      // Update filters and rangeValues after retrieving filters
      setFilters(parsedFilters);

      // Ensure rangeValues is updated with minsqFt and maxsqFt
      setRangeValues([
        parsedFilters.minsqFt || min,
        parsedFilters.maxsqFt || max,
      ]);
    }
  }, []);

  // Update filters state when rangeValues change
  useEffect(() => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      minsqFt: rangeValues[0],
      maxsqFt: rangeValues[1],
    }));
  }, [rangeValues]);

  const handleCheckboxChange = (event) => {
    const { name, value, checked } = event.target;

    // Directly update the filters state to ensure UI updates
    setFilters((prevState) => {
      const updatedAreas = checked
        ? [...prevState[name], value] // Add area if checked
        : prevState[name].filter((item) => item !== value); // Remove area if unchecked

      return {
        ...prevState,
        [name]: updatedAreas,
      };
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFilters((prevState) => {
      // Check if the type has changed
      if (name === "type") {
        let resetSubType = [];
        let resetBhks = [];

        // Reset subType if switching between residential and commercial
        if (
          (value === "Residential Rent" || value === "Residential Sell") &&
          (prevState.type === "Commercial Rent" ||
            prevState.type === "Commercial Sell")
        ) {
          resetSubType = []; // Reset subType for Residential
          resetBhks = []; // Reset bhk for Residential
        } else if (
          (value === "Commercial Rent" || value === "Commercial Sell") &&
          (prevState.type === "Residential Rent" ||
            prevState.type === "Residential Sell")
        ) {
          resetSubType = []; // Reset subType for Commercial
          resetBhks = []; // Reset bhk for Commercial
        }

        return {
          ...prevState,
          [name]: value,
          subType: resetSubType, // Clear subType when type changes
          bhks: resetBhks, // Clear bhks when type changes
        };
      }

      // For all other input changes
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleApplyFilters = () => {
    // Log the filter values
    // console.log("Applied Filters:", filters);

    // save filterrs to local storage
    localStorage.setItem("filters", JSON.stringify(filters));

    // Navigate to the results page with the applied filters
    navigate("/residential-rental", { state: { filters, type: filters.type } });
  };

  const renderLabels = () => {
    const interval = (max - min) / steps;
    const labels = [];

    for (let i = 0; i <= steps; i++) {
      labels.push(<span key={i}>{Math.round(min + i * interval)}</span>);
    }

    return labels;
  };

  const areas = [
    "100 Feet Ring Road",
    "Adalaj",
    "Akhbar Nagar",
    "Ambawadi",
    "Ambli",
    "Ashram Road",
    "Bavla",
    "Bhadaj",
    "Bhat",
    "Bhuyangdev",
    "Bodakdev",
    "Bopal",
    "CG Road",
    "Chanakyapuri",
    "Chandkheda",
    "Chandlodia",
    "Changodar",
    "Drive In Road",
    "Ellisbridge",
    "Ghatlodia",
    "Ghuma",
    "Gota",
    "Gulbai Tekra",
    "Gurukul",
    "Hebatpur Road",
    "Income Tax",
    "Iscon Ambli Road",
    "Jagatpur",
    "Jivrajpark",
    "Jodhpur",
    "Juhapura",
    "Kalol",
    "Koba",
    "Koteshwar",
    "Law Garden",
    "Makarba",
    "Manekbaug",
    "Manipur",
    "Memnagar",
    "Mithakhali",
    "Motera",
    "Nana Chiloda",
    "Naranpura",
    "Navrangpura",
    "Nehru Nagar",
    "New CG Road",
    "New Ranip",
    "New Wadaj",
    "Nirnay Nagar",
    "Paldi",
    "Palodia",
    "Pethapur",
    "Prahladnagar",
    "Ramdevnagar",
    "Rancharda",
    "Ranip",
    "Sabarmati",
    "Sanand",
    "Sanathal",
    "Sarkhej",
    "Satadhar",
    "Satellite",
    "Science City",
    "SG Road",
    "Shastrinagar",
    "Shela",
    "Shilaj",
    "Shivranjani",
    "Shyamal",
    "Sindhubhavan Road",
    "Sola",
    "South Bopal",
    "SP Ring Road",
    "Subhash Bridge",
    "Sughad",
    "Thaltej",
    "Tragad",
    "Usmanpura",
    "Vaishno Devi",
    "Vasna",
    "Vastrapur",
    "Vavol",
    "Vejalpur",
    "Vijay Cross Road",
    "Wadaj",
    "Zundal",
    "Ongaj",
    "Ishkon",
    "Wapa",
    "Godrej Garden City",
    "Adani Shantigram",
    "Prernatirth Derasar Road",
    "Sindhubhavan Extn Road",
    "Other Area",
  ];

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    // Only show suggestions if there is a query
    setShowSuggestions(e.target.value.length > 0);
    setHighlightedIndex(-1); // Reset highlight when typing
  };

  const handleSuggestionClick = (area) => {
    // Add the selected area to filters if not already included
    if (!filters.areas.includes(area)) {
      setFilters((prev) => ({
        ...prev,
        areas: [...prev.areas, area],
      }));
    }
    setSearchQuery(""); // Clear the search input after selection
    setShowSuggestions(false);
    setHighlightedIndex(-1); // Reset highlight after selection
    searchInputRef.current.focus(); // Focus the input after selection
  };

  // Add a function to handle clicking outside the suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      const searchContainer = document.querySelector(".area-search-container");
      // Check if the clicked element is NOT within the suggestions or the search container itself
      if (
        searchContainer &&
        !searchContainer.contains(event.target) &&
        !event.target.closest(".area-suggestions")
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Function to remove an area chip
  const handleRemoveArea = (areaToRemove) => {
    setFilters((prev) => ({
      ...prev,
      areas: prev.areas.filter((area) => area !== areaToRemove),
    }));
  };

  const filteredAreas = areas.filter(
    (area) =>
      area.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !filters.areas.includes(area)
  );

  // Add window resize handler
  useEffect(() => {
    const handleResize = () => {
      if (!isShowingAllAreas) {
        setVisibleAreasCount(window.innerWidth < 768 ? 14 : 35);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isShowingAllAreas]);

  const handleShowMoreAreas = () => {
    setVisibleAreasCount(areas.length); // Show all areas
    setIsShowingAllAreas(true); // Update state to show we're displaying all areas
  };

  // New function to handle showing less areas
  const handleShowLessAreas = () => {
    setVisibleAreasCount(window.innerWidth < 768 ? 14 : 35); // Show initial number of areas based on screen size
    setIsShowingAllAreas(false); // Update state to show we're not displaying all areas
  };

  // Add keyboard navigation for suggestions
  const handleKeyDown = (e) => {
    if (!showSuggestions || filteredAreas.length === 0) {
      if (e.key === "Enter" && searchQuery) {
        const matchingArea = areas.find(
          (area) => area.toLowerCase() === searchQuery.toLowerCase()
        );
        if (matchingArea && !filters.areas.includes(matchingArea)) {
          setFilters((prev) => ({
            ...prev,
            areas: [...prev.areas, matchingArea],
          }));
          setSearchQuery("");
        }
        setShowSuggestions(false);
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prevIndex) =>
        prevIndex === filteredAreas.length - 1 ? 0 : prevIndex + 1
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prevIndex) =>
        prevIndex === 0 || prevIndex === -1
          ? filteredAreas.length - 1
          : prevIndex - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightedIndex !== -1) {
        handleSuggestionClick(filteredAreas[highlightedIndex]);
      }
    } else if (e.key === "Backspace" && searchQuery === "") {
      if (filters.areas.length > 0) {
        const lastArea = filters.areas[filters.areas.length - 1];
        handleRemoveArea(lastArea);
      }
    }
  };

  return (
    <div className="filter-page  relative" style={{ background: "#FAF7FF" }}>
      {/* <h2>Filter Properties</h2> */}
      <div className="filter-grid">
        <div className="">
          <div className="mobile-hide flex flex-row ">
            <h3 className="lg:hidden">PROPERTY TYPE</h3>

            <div className="mobile-show clear-filters-mobile">
              <button onClick={clearFilters} className="clear-filters-button">
                Clear Filter
              </button>
            </div>
          </div>
          <div className="filter-section1  md:ml-[-20px]">
            <div className="filter-options1">
              <div className="pt-4 right-[90px] text-[#503691] relative hidden lg:block text-style">
                PROPERTY TYPE
              </div>
              <label
                className={`radio-button ${
                  filters.type === "Residential Rent" ? "selected" : ""
                }`}
              >
                <input
                  type="radio"
                  name="type"
                  value="Residential Rent"
                  onChange={handleInputChange}
                  checked={filters.type === "Residential Rent"}
                />
                Resident Rent
              </label>
              <label
                className={`radio-button ${
                  filters.type === "Residential Sell" ? "selected" : ""
                }`}
              >
                <input
                  type="radio"
                  name="type"
                  value="Residential Sell"
                  onChange={handleInputChange}
                  checked={filters.type === "Residential Sell"}
                />
                Resident Sell
              </label>
              <label
                className={`radio-button ${
                  filters.type === "Commercial Rent" ? "selected" : ""
                }`}
              >
                <input
                  type="radio"
                  name="type"
                  value="Commercial Rent"
                  onChange={handleInputChange}
                  checked={filters.type === "Commercial Rent"}
                />
                Commercial Rent
              </label>
              <label
                className={`radio-button ${
                  filters.type === "Commercial Sell" ? "selected" : ""
                }`}
              >
                <input
                  type="radio"
                  name="type"
                  value="Commercial Sell"
                  onChange={handleInputChange}
                  checked={filters.type === "Commercial Sell"}
                />
                Commercial Sell
              </label>
              <div className="clear-filters-desktop ">
                <button onClick={clearFilters} className="clear-filters-button">
                  Clear Filter
                </button>
              </div>
            </div>
          </div>
          <hr className="relative w-full left-0 md:w-[98%] md:left-[120px]" />

          <div className="mobile-hide">
            <h3 className="lg:hidden">FURNISHED</h3>
          </div>
          <div className="filter-section1 lg:ml-[-20px]">
            <div className="filter-options2">
              {/* <label>
                <input
                  className="checkbox"
                  type="checkbox"
                  name="furnishedTypes"
                  value="Fix-Furnished"
                  checked={filters.furnishedTypes.includes("Fix-Furnished")}
                  onChange={handleCheckboxChange}
                />{" "}
                Fix - Furnished
              </label> */}
              <div className="pt-4 right-[90px] text-[#503691] relative hidden lg:block text-style">
                FURNISHED TYPE
              </div>
              <div className="filter-options2">
                <label>
                  <input
                    className="checkbox"
                    type="checkbox"
                    name="furnishedTypes"
                    value="Furnished"
                    checked={filters.furnishedTypes.includes("Furnished")}
                    onChange={handleCheckboxChange}
                  />{" "}
                  Furnished
                </label>

                <label>
                  <input
                    className="checkbox"
                    type="checkbox"
                    name="furnishedTypes"
                    value="Semi-Furnished"
                    checked={filters.furnishedTypes.includes("Semi-Furnished")}
                    onChange={handleCheckboxChange}
                  />{" "}
                  Semi-Furnished
                </label>
                <label>
                  <input
                    className="checkbox"
                    type="checkbox"
                    name="furnishedTypes"
                    value="Kitchen-Fix"
                    checked={filters.furnishedTypes.includes("Kitchen-Fix")}
                    onChange={handleCheckboxChange}
                  />{" "}
                  Kitchen - Fix
                </label>
                <label>
                  <input
                    className="checkbox"
                    type="checkbox"
                    name="furnishedTypes"
                    value="Unfurnished"
                    checked={filters.furnishedTypes.includes("Unfurnished")}
                    onChange={handleCheckboxChange}
                  />{" "}
                  Unfurnished
                </label>
              </div>
            </div>
          </div>
          <hr className="relative w-full left-0 md:w-[98%] md:left-[120px]" />
          <div className="mobile-hide">
            <h3 className="lg:hidden">AREA</h3>
          </div>
          <div className="filter-section2 lg:mt-[-10px] lg:ml-28  ">
            <div className="bottom-[-220px] right-[190px] text-[#503691] relative hidden lg:block sqarea-font">
              AREA
            </div>
            <div className="filter-options">
              {/* Add search box for areas */}
              <div className="area-search-container gap-3  ">
                <div className="w-full lg:w-1/2 md:w-full flex items-center justify-end">
                  <input
                    type="text"
                    ref={searchInputRef}
                    placeholder={
                      filters.areas.length > 0
                        ? "Add more areas..."
                        : "Search areas..."
                    }
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onKeyDown={handleKeyDown}
                    className="w-full h-10 placeholder:p-0.5 p-3 shadow-sm border border-purple-800 shadow-slate-200 rounded-full relative my-2  md:w-full"
                  />
                  <div className="absolute mr-1 mb-0.5">
                    <button
                      className=" searchboxbtn "
                      onClick={handleApplyFilters}
                    >
                      <span className="pl-4 pr-4 px-[6px] py-[5px] bg-purple-900 text-base  rounded-full text-white font-sans font-medium">
                      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>
                      </span>
                    </button>
                  </div>
                </div>

                {/* Display selected areas as chips */}
                {filters.areas.map((area, index) => (
                  <div
                    key={index}
                    className="area-chip   inline-flex items-center justify-between bg-transparent text-purple-800 border border-purple-800"
                  >
                    <span className="truncate font-sans font-medium   ">
                      {area}
                    </span>
                    <button
                      className="remove-area-button text-white ml-2 flex-shrink-0"
                      onClick={() => handleRemoveArea(area)}
                    >
                      &times;
                    </button>
                  </div>
                ))}
                {showSuggestions && searchQuery && filteredAreas.length > 0 && (
                  <div className="area-suggestions">
                    {filteredAreas.map((area, index) => (
                      <div
                        key={index}
                        className={`suggestion-item ${
                          index === highlightedIndex ? "highlighted" : ""
                        }`}
                        onClick={() => handleSuggestionClick(area)}
                      >
                        {area}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <hr className="relative w-full  left-0 md:w-[100%] md:left-[10px]" />

              {areas.slice(0, visibleAreasCount).map((area, index) => (
                <label
                  key={index}
                  className={`checkbox-button  ${
                    filters.areas.includes(area) ? "checkbox-selected" : ""
                  }`}
                >
                  <input
                    className="custome-checkbox"
                    type="checkbox"
                    name="areas"
                    value={area}
                    checked={filters.areas.includes(area)}
                    onChange={handleCheckboxChange}
                  />{" "}
                  {area}
                </label>
              ))}

              <div className="w-full flex items-center justify-center">
                <div className="px-2 py-0.5  rounded-full hover:text-slate-400 border bg-purple-100  border-purple-200 hover:bg-purple-200 ">
                  {!isShowingAllAreas && visibleAreasCount < areas.length && (
                    <button
                      onClick={handleShowMoreAreas}
                      className="no-underline cursor-pointer  block w-full hover:text-slate-600"
                    >
                      <span class="material-symbols-outlined  pr-2">
                        expand_circle_down
                      </span>
                      <span className="hover:text-slate-950 text-[13px] font-sans font-medium text-gray-800   ">
                        Show More Areas
                      </span>
                      <span class="material-symbols-outlined pl-2">
                        expand_circle_down
                      </span>
                    </button>
                  )}

                  {isShowingAllAreas && (
                    <button
                      onClick={handleShowLessAreas}
                      className="rounded-full h-6   no-underline cursor-pointer block w-full"
                    >
                      {/* Show Up */}
                      <img
                        width="32"
                        height=""
                        className="pr-2 "
                        src="https://img.icons8.com/windows/32/circled-up-2.png"
                        alt="circled-up-2"
                      />
                      <span className="  text-gray-800 hover:text-slate-950">
                        Show Less
                      </span>
                      <img
                        width="32"
                        height=""
                        className="pl-2 "
                        src="https://img.icons8.com/windows/32/circled-up-2.png"
                        alt="circled-up-2"
                      />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          {(filters.type === "Residential Rent" ||
            filters.type === "Residential Sell") && (
            <>
              <hr className="relative w-full left-0 md:w-[98%] md:left-[120px]" />
              <div className="mobile-hide">
                <h3 className="lg:hidden">BHK Type</h3>
              </div>
              <div className="filter-section2">
                <div className="filter-options-bhk lg:ml-8">
                  <div className=" right-[135px] text-[#503691] relative hidden lg:block text-style">
                    BHK TYPE
                  </div>
                  <div className="filter-options-bhk">
                    {[
                      "1 BHK",
                      "2 BHK",
                      "3 BHK",
                      "4 BHK",
                      "5 BHK",
                      "6 BHK",
                      "6+ BHK",
                    ].map((bhks, index) => (
                      <label key={index}>
                        <input
                          className="checkbox"
                          type="checkbox"
                          name="bhks"
                          value={bhks}
                          checked={filters.bhks.includes(bhks)}
                          onChange={handleCheckboxChange}
                        />{" "}
                        {bhks}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
          {(filters.type === "Residential Rent" ||
            filters.type === "Residential Sell") && (
            <>
              <hr className="relative w-full left-0 md:w-[98%] md:left-[120px]" />
              <div className="mobile-hide">
                <h3 className="lg:hidden">TYPE</h3>
              </div>
              <div className="filter-section2 lg:ml-[71px] ">
                <div className="filter-options">
                  <div className="pt-4 right-[170px] text-[#503691] relative hidden lg:block text-style">
                    TYPE
                  </div>
                  <div className="filter-options type-PR">
                    {[
                      "Apartment",
                      "Bungalow",
                      "Tenement",
                      "Penthouse",
                      "Weekend Home",
                      "Rowhouse",
                      "Residential Plot",
                      "PG",
                      ...(filters.type === "Residential Sell"
                        ? ["Pre Leased Spaces"]
                        : []), // Add 'Pre Leased Spaces' only for Residential Sell
                    ].map((subType, index) => (
                      <label key={index}>
                        <input
                          className="checkbox"
                          type="checkbox"
                          name="subType"
                          value={subType}
                          checked={filters.subType.includes(subType)}
                          onChange={handleCheckboxChange}
                        />{" "}
                        {subType}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
          {(filters.type === "Commercial Rent" ||
            filters.type === "Commercial Sell") && (
            <>
              <hr className="relative  w-full left-0 md:w-[98%] md:left-[120px]" />

              <div className="mobile-hide">
                <h3>TYPE</h3>
              </div>

              <div className="filter-section2 lg:ml-[120px] ">
                <div className="top-10 left-[-790px] text-[#503691] relative hidden lg:block text-style">
                  TYPE
                </div>
                <div className="typeCheckbox ">
                  {[
                    "Basement",
                    "Commercial Plot",
                    "Shed",
                    "Co Working Space",
                    "Factory",
                    "Shop",
                    "Commercial Building",
                    "Godown",
                    "Showroom",
                    "Restaurant",
                    "Industrial Land",
                    "Commercial Flat",
                    "Office",
                    "Ware House",
                    ...(filters.type === "Commercial Sell"
                      ? ["Pre Leased Spaces"]
                      : []), // Add 'Pre Leased Spaces' only for Commercial Sell
                  ].map((subType, index) => (
                    <div>
                      <label key={index}>
                        <input
                          className="typeCheckboxList"
                          type="checkbox"
                          name="subType"
                          value={subType}
                          checked={filters.subType.includes(subType)}
                          onChange={handleCheckboxChange}
                        />{" "}
                        {subType}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
          <hr className="relative w-full left-0 md:w-[98%] md:left-[120px]" />

          <div className="mobile-hide">
            <h3 className="lg:hidden">BUDGET</h3>
          </div>
          <div className="filter-section lg:ml-12">
            <div className="input-row">
              <div className="pt-4 right-[150px] text-[#503691] relative hidden lg:block text-style">
                BUDGET
              </div>
              <div className="budget-input-container">
                <input
                  type="text"
                  name="minRent"
                  placeholder="Enter Min rent..."
                  className="budget-input"
                  value={filters.minRent}
                  onChange={handleInputChange}
                />
                <div className="budget-max">Min</div>
              </div>
              <div className="budget-input-container">
                <input
                  type="text"
                  name="maxRent"
                  placeholder="Enter Max rent..."
                  className="budget-input"
                  value={filters.maxRent}
                  onChange={handleInputChange}
                />
                <div className="budget-max">Max</div>
              </div>
            </div>
          </div>
          <hr className="relative w-full left-0 md:w-[98%] md:left-[120px]" />
          <div className="mobile-hide">
            <h3 className="lg:hidden">Sqft</h3>
          </div>
          <div className="filter-section lg:ml-28">
            <div className="slidecontainer">
              {/* Tooltip displaying the slider value */}
              <div className="top-9 right-[188px]  text-[#503691] relative hidden lg:block sqarea-font">
                SQFT
              </div>
              <CustomRangeSlider
                min={min}
                max={max}
                rangeValues={rangeValues}
                setRangeValues={setRangeValues}
                onChange={(newValues) => {
                  setRangeValues(newValues); // Update rangeValues state
                  setFilters((prevState) => ({
                    ...prevState,
                    minsqFt: newValues[0], // Update minsqFt in filters
                    maxsqFt: newValues[1], // Update maxsqFt in filters
                  }));
                }}
                step={20}
              />

              {/* Range Labels */}
              <div className="range-labels">{renderLabels()}</div>
            </div>
          </div>
          <button
            className="apply-filters-button mb-5 ml-20"
            onClick={handleApplyFilters}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterPage;
