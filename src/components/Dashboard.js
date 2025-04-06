// src/components/Dashboard.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import Cookies from "js-cookie";
import SearchInput from "./SearchInput";
import FeaturedOn from "./FeaturedOn";
import axios from "axios";
import { gsap } from "gsap";

const Dashboard = () => {
  const navigate = useNavigate();
  const [propertyCounts, setPropertyCounts] = useState({});

  localStorage.removeItem("filters");

  const handlePropertyClick = (type, status, listedBy) => {
    const isLoggedIn = Cookies.get("userId");
    const isPremium = Cookies.get("isPremium");
    if (isPremium === "1") {
      navigate("/residential-rental", { state: { type, status, listedBy } });
    } else if (isLoggedIn && isPremium === "0") {
      alert("Please Buy Premium");
    } else {
      navigate("/signup");
    }
  };
  useEffect(() => {
    // Fetch the property counts when the component mounts
    axios
      .get(
        `${process.env.REACT_APP_API_IP}/user/counts/fjkbfhwb/fkjbwdiwhbdjwkfjwbj`
      )
      .then((response) => {
        setPropertyCounts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching property counts:", error);
      });
  }, []);

  useEffect(() => {
    const buttons = document.querySelectorAll(".dashboard-property-summary, .property-summary1");

    buttons.forEach((button) => {
      button.addEventListener("mouseenter", () => {
        gsap.to(button, { scale: 1.1, duration: 0.3 });
      });

      button.addEventListener("mouseleave", () => {
        gsap.to(button, { scale: 1, duration: 0.3 });
      });
    });

    // Cleanup function to remove event listeners
    return () => {
      buttons.forEach((button) => {
        button.removeEventListener("mouseenter", () => {
          gsap.to(button, { scale: 1.1, duration: 0.3 });
        });

        button.removeEventListener("mouseleave", () => {
          gsap.to(button, { scale: 1, duration: 0.3 });
        });
      });
    };
  }, []);

  return (
    <div className="dashboard-container" style={{ background: "#FAF7FF" }}>
      <div className="dashboard-heading">
        <h1>The ultimate property solution for brokers</h1>
        <p>
          #1 B2B platform for brokers to get direct  <br />
          owners properties in Ahmedabad
        </p>
      </div>
      <SearchInput placeholder="Search Property..." buttonText="Search" />
      {/* <div>
        <p className="dashobard-title">Today's Properties</p>
      </div>
      <div className="today-property">
        <div
          className="property-item1 box-1"
          onClick={() =>
            handlePropertyClick("Residential Rent", "today", "Owner")
          }
        >
          <div className="property-info">
            <span className="number">
              {propertyCounts.todayResidentialRental || 0}
            </span>
            <span className="property-text">Residential Rent</span>
          </div>
        </div>
        <div
          className="property-item1 box-2"
          onClick={() =>
            handlePropertyClick("Residential Sell", "today", "Owner")
          }
        >
          <div className="property-info">
            <span className="number">
              {propertyCounts.todayResidentialSell || 0}
            </span>
            <span className="property-text">Residential Sell</span>
          </div>
        </div>
        <div
          className="property-item1 box-3"
          onClick={() =>
            handlePropertyClick("Commercial Rent", "today", "Owner")
          }
        >
          <div className="property-info">
            <span className="number">
              {propertyCounts.todayCommercialRent || 0}
            </span>
            <span className="property-text">Commercial Rent</span>
          </div>
        </div>
        <div
          className="property-item1 box-4"
          onClick={() =>
            handlePropertyClick("Commercial Sell", "today", "Owner")
          }
        >
          <div className="property-info">
            <span className="number">
              {propertyCounts.todayCommercialSell || 0}
            </span>
            <span className="property-text">Commercial Sell</span>
          </div>
        </div>
      </div> */}
      <div className="active-properties-section">
        {" "}
        <p className="dashobard-title ">Active Properties </p>
      </div>
      <div className="active-property">
        <div
          className="property-summary1"
          onClick={() => handlePropertyClick("", "active", "Owner")}
        >
          <div className="center-total-image">
            <img src="./image/5.png" alt="Property Icon" />
          </div>
          <div className="property-info1">
            <div className="property-info">
              <span className="number1">
                #{propertyCounts.totalActiveProperties || 0}
              </span>
              <span className="property-text1">Total Property</span>
            </div>
          </div>
        </div>
        <div>
          <div
            className="dashboard-property-summary"
            onClick={() =>
              handlePropertyClick("Residential Rent", "active", "Owner")
            }
          >
            <img src="./image/residental-rent.png" alt="Property Icon" />
            <div className="property-info">
              <span className="number">
                #{propertyCounts.activeResidentialRental || 0}
              </span>
              <span className="property-text">Residential Rent</span>
            </div>
          </div>
          <div
            className="dashboard-property-summary mt-3"
            onClick={() =>
              handlePropertyClick("Commercial Rent", "active", "Owner")
            }
          >
            <img src="./image/3.png" alt="Property Icon" />
            <div className="property-info">
              <span className="number">
                #{propertyCounts.activeCommercialRent || 0}
              </span>
              <span className="property-text">Commercial Rent</span>
            </div>
          </div>
        </div>
        <div>
          <div
            className="dashboard-property-summary"
            onClick={() =>
              handlePropertyClick("Residential Sell", "active", "Owner")
            }
          >
            <img src="./image/2.png" alt="Property Icon" />
            <div className="property-info">
              <span className="number">
                #{propertyCounts.activeResidentialSell || 0}
              </span>
              <span className="property-text">Residential Sell</span>
            </div>
          </div>
          <div
            className="dashboard-property-summary mt-3"
            onClick={() =>
              handlePropertyClick("Commercial Sell", "active", "Owner")
            }
          >
            <img src="./image/4.png" alt="Property Icon" />
            <div className="property-info">
              <span className="number">
                #{propertyCounts.activeCommercialSell || 0}
              </span>
              <span className="property-text">Commercial Sell</span>
            </div>
          </div>
        </div>
      </div>


      <p className="video-section-title">How to use Probroker</p>
      <div className="video-section  ">

        <div className="video-section2 shadow-xl">
          <iframe

            src="https://www.youtube.com/embed/VbFJcpt-ejI?si=iZ39GNRdSdAXeqHF"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
          <h1 className=" text-black font-bold text-lg pl-7 pt-5">Getting Started with Probroker</h1>
          <p className=" text-black  text-sm pl-7  mb-4 pt-2">Learn the basic of using PRObroker to find  properties</p>
          <a href="https://www.youtube.com/watch?v=VbFJcpt-ejI" className="text-[#5f3dc4] pl-7  font-bold">Watch Now

            <svg className="relative left-28  bottom-[35px]  " xmlns="http://www.w3.org/2000/svg" width="28" height="50" viewBox="0 0 100 50" fill="#5f3dc4" >
              <line x1="22" y1="25" x2="90" y2="25" stroke="#5f3dc4" stroke-width="8" stroke-linecap="round" />
              <polyline points="80,10 95,25 80,40" fill="none" stroke="#5f3dc4" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </a>
        </div>
        <div className="video-section2 shadow-xl">
          <iframe


            src="https://www.youtube.com/embed/VbFJcpt-ejI?si=iZ39GNRdSdAXeqHF"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
          <h1 className=" text-black font-bold text-lg pl-7 pt-5">Getting Started with Probroker</h1>
          <p className=" text-black  text-sm pl-7  mb-4 pt-2">Learn the basic of using PRObroker to find  properties</p>
          <a href="https://www.youtube.com/watch?v=VbFJcpt-ejI" className="text-[#5f3dc4] pl-7  font-bold">Watch Now

            <svg className="relative left-28  bottom-[35px]  " xmlns="http://www.w3.org/2000/svg" width="28" height="50" viewBox="0 0 100 50" fill="#5f3dc4" >
              <line x1="22" y1="25" x2="90" y2="25" stroke="#5f3dc4" stroke-width="8" stroke-linecap="round" />
              <polyline points="80,10 95,25 80,40" fill="none" stroke="#5f3dc4" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </a>
        </div>
        <div className="video-section2 shadow-xl">
          <iframe


            src="https://www.youtube.com/embed/VbFJcpt-ejI?si=iZ39GNRdSdAXeqHF"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
          <h1 className=" text-black font-bold text-lg pl-7 pt-5">Getting Started with Probroker</h1>
          <p className=" text-black  text-sm pl-7  mb-4 pt-2">Learn the basic of using PRObroker to find  properties</p>
          <a href="https://www.youtube.com/watch?v=VbFJcpt-ejI" className="text-[#5f3dc4] pl-7  font-bold">Watch Now

            <svg className="relative left-28  bottom-[35px]  " xmlns="http://www.w3.org/2000/svg" width="28" height="50" viewBox="0 0 100 50" fill="#5f3dc4" >
              <line x1="22" y1="25" x2="90" y2="25" stroke="#5f3dc4" stroke-width="8" stroke-linecap="round" />
              <polyline points="80,10 95,25 80,40" fill="none" stroke="#5f3dc4" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </a>        </div>


      </div>
      <FeaturedOn />
      {/* <SuggestionButton /> */}
    </div>
  );
};

export default Dashboard;
