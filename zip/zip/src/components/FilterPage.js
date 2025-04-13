import React, { useEffect, useState } from "react";
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

  const initialType = location.state?.type || "Residential Rent";

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

  return (
    <div className="filter-page" style={{ background: "#FAF7FF" }}>
      {/* <h2>Filter Properties</h2> */}
      <div className="filter-grid">
        <div className="filter-titles">
          <h3 className="spacing2">PROPERTY TYPE</h3>
          {/* Clear Filters Button for Mobile View */}
          {/* <h3>CONDITION</h3> */}
          <h3 className="spacing">AREA</h3>
          {(filters.type === "Residential Rent" ||
            filters.type === "Residential Sell") && (
            <h3 className="spacing1">BHKs</h3>
          )}
          {/* <h3 className="spacing1">AVAILABILITY</h3> */}
          <h3
            className={
              (filters.type === "Commercial Rent" ||
                filters.type === "Commercial Sell") &&
              "spacing2"
            }
          >
            TYPE
          </h3>
          <h3 className="spacing1">BUDGET</h3>
          <h3 className="spacing3">sq Feet</h3>
        </div>
        <div className="">
          <div className="mobile-hide flex flex-row md:hidden">
            <h3>PROPERTY TYPE</h3>
            <div className="mobile-show clear-filters-mobile">
              <button onClick={clearFilters} className="clear-filters-button">
                Clear Filter
              </button>
            </div>
          </div>
          <div className="filter-section1">
            <div className="filter-options1">
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
              <div className="clear-filters-desktop">
                <button onClick={clearFilters} className="clear-filters-button">
                  Clear Filter
                </button>
              </div>
            </div>
          </div>
          <hr />
          <div className="mobile-hide">
            <h3>FURNISHED TYPE</h3>
          </div>
          <div className="filter-section1">
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

              {/* <label>
                <input
                  className="checkbox"
                  type="checkbox"
                  name="furnishedTypes"
                  value="Fully Furnished"
                  checked={filters.furnishedTypes.includes("Fully Furnished")}
                  onChange={handleCheckboxChange}
                />{" "}
                Fully - Furnished
              </label> */}
            </div>
          </div>
          <hr />
          <div className="mobile-hide">
            <h3>AREA</h3>
          </div>
          <div className="filter-section2">
            <div className="filter-options">
              {[
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
                "Other Area",
              ].map((area, index) => (
                <label
                  key={index}
                  className={`checkbox-button ${
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
            </div>
          </div>
          {(filters.type === "Residential Rent" ||
            filters.type === "Residential Sell") && (
            <>
              <hr />
              <div className="mobile-hide">
                <h3>BHK Type</h3>
              </div>
              <div className="filter-section2">
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
            </>
          )}
          {(filters.type === "Residential Rent" ||
            filters.type === "Residential Sell") && (
            <>
              <hr />
              <div className="mobile-hide">
                <h3>TYPE</h3>
              </div>
              <div className="filter-section2">
                <div className="filter-options">
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
            </>
          )}
          {(filters.type === "Commercial Rent" ||
            filters.type === "Commercial Sell") && (
            <>
              <hr />
              <div className="mobile-hide">
                <h3>TYPE</h3>
              </div>
              <div className="filter-section2">
                <div className="filter-options">
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
            </>
          )}
          <hr />
          {/* <div className="mobile-hide">
            <h3>AVAILABILITY</h3>
          </div>
          <div className="filter-section">
            <div className="filter-options">
              {[
                "1 Room - Tenement",
                "1 Room - Low Rise Apartment",
                "1 Room & kitchen - Tenement",
                "1 Room & kitchen - Low Rise Apartment",
                "1BHK - Low Rise Apartment",
                "1BHK - Tenement",
                "2BHK",
                "3BHK",
                "4BHK",
                "5BHK",
                "6BHK",
                "Above 6BHK",
                "Duplex",
                "Duplex 1",
                "Independent Building",
                "PG",
                "Residential Plot",
              ].map((avail, index) => (
                <label key={index}>
                  <input
                    className="checkbox"
                    type="checkbox"
                    name="bhks"
                    value={avail}
                    onChange={handleCheckboxChange}
                  />{" "}
                  {avail}
                </label>
              ))}
            </div>
          </div>
          <hr /> */}
          <div className="mobile-hide">
            <h3>BUDGET</h3>
          </div>
          <div className="filter-section">
            <div className="input-row">
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
          <hr />
          <div className="mobile-hide">
            <h3>Sqft</h3>
          </div>
          <div className="filter-section">
            <div className="slidecontainer">
              {/* Tooltip displaying the slider value */}
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
          <button className="apply-filters-button" onClick={handleApplyFilters}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterPage;
