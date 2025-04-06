// src/components/Signup.js
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import {
  FaUser,
  FaPhoneAlt,
  FaKey,
  FaEnvelope,
  FaBusinessTime,
  FaEyeSlash,
  FaEye,
} from "react-icons/fa";
import image from "../image/login-model.png";
import bowser from "bowser";
import FingerprintJS from "@fingerprintjs/fingerprintjs"; // For browser fingerprinting
import { FaLocationPin } from "react-icons/fa6";

const Signup = () => {
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  // Function to gather device details
  const getDeviceDetails = () => {
    const browser = bowser.getParser(window.navigator.userAgent);
    const info = browser.getResult();

    return {
      browser: info.browser.name,
      browserVersion: info.browser.version,
      os: info.os.name,
      osVersion: info.os.version,
      platform: info.platform.type,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      userAgent: navigator.userAgent,
    };
  };
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState); // Toggle the password visibility state
  };
  // Function to get browser fingerprint (unique ID for the browser)
  const getFingerprint = async () => {
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    return result.visitorId; // Unique ID for browser
  };

  // Function to get the user's IP address
  const getIPAddress = async () => {
    try {
      const response = await axios.get("https://api.ipify.org?format=json");
      return response.data.ip; // Returns the IP address of the user
    } catch (error) {
      console.error("Unable to fetch IP address", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true); // Set loading to true when submission starts

    // Validate form fields
    if (!name || !number || !password || !email || !address || !companyName) {
      setError("All fields are required.");
      setLoading(false); // Set loading to false if validation fails
      return;
    }

    // Validate contact number format
    const contactPattern = /^[0-9]{10}$/; // Example pattern for 10-digit numbers
    if (!contactPattern.test(number)) {
      setError("Invalid contact number format.");
      setLoading(false); // Set loading to false if validation fails
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      setLoading(false); // Set loading to false if validation fails
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setLoading(false); // Set loading to false if validation fails
      return;
    }

    const deviceDetails = getDeviceDetails(); // Get device details here
    const fingerprint = await getFingerprint(); // Get browser fingerprint
    const ipAddress = await getIPAddress(); // Get user's IP address

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_IP}/user/v2/signin/vkjdbfuhe/nkdkjbed`,
        {
          companyName,
          email,
          address,
          name,
          number,
          password,
          deviceDetails, // Send device details to server
          fingerprint, // Send browser fingerprint to server
          ipAddress, // Send IP address to server
        }
      );

      if (response.data.status === "success") {
        // Save userId in cookie for 1 day
        Cookies.set("userId", response.data.data.id, { expires: 1 });
        Cookies.set("isPremium", response.data.data.isPremium, { expires: 1 });
        Cookies.set("name", response.data.data.name, { expires: 1 });
        Cookies.set("number", response.data.data.number, { expires: 1 });

        // Navigate to the home page
        navigate("/");
        window.location.reload(); // Reload the page to apply the authentication state
      } else {
        setError(response.data.message || "An unexpected error occurred.");
      }
    } catch (error) {
      console.error("Error response:", error.response); // Print detailed error information
      if (error.response && error.response.data) {
        setError(
          error.response.data.message || "An error occurred during signup."
        );
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false); // Set loading to false after completion
    }
  };

  return (
    <div className="flex h-screen justify-center items-center bg-[#FAF7FF] mx-4 lg:mx-28 my-[70px]">
      <div className="hidden lg:flex flex-1">
        <img src={image} alt="Pro Broker" className="object-cover" />
      </div>
      <div className="flex-1 max-w-lg p-12 bg-white rounded-lg shadow-lg ">
        <p className="text-4xl text-gray-800 mb-1">Welcome to</p>
        <p className="text-5xl font-bold text-[#503691] mb-4">PRObroker</p>
        <form onSubmit={handleSubmit}>
          <p className="text-3xl font-bold mb-4">Signup</p>
          <div className="relative mb-4">
            <FaBusinessTime className="absolute top-1/2 left-4 transform -translate-y-1/2 text-[#503691]" />
            <input
              type="text"
              placeholder="Enter Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full px-10 py-3 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="relative mb-4">
            <FaUser className="absolute top-1/2 left-4 transform -translate-y-1/2 text-[#503691]" />
            <input
              type="text"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-10 py-3 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="relative mb-4">
            <FaPhoneAlt className="absolute top-1/2 left-4 transform -translate-y-1/2 text-[#503691]" />
            <input
              type="text"
              placeholder="Enter Your Contact Number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className="w-full px-10 py-3 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="relative mb-4">
            <FaEnvelope className="absolute top-1/2 left-4 transform -translate-y-1/2 text-[#503691]" />
            <input
              type="text"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-10 py-3 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="relative mb-4">
            <FaLocationPin className="absolute top-1/2 left-4 transform -translate-y-1/2 text-[#503691]" />
            <input
              type="text"
              placeholder="Enter Your Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-10 py-3 border border-gray-300 rounded-md"
              required
            />
          </div>
          {/* <div className="relative mb-4">
            <FaKey className="absolute top-1/2 left-4 transform -translate-y-1/2 text-[#503691]" />
            <input
              type="password"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-10 py-3 border border-gray-300 rounded-md"
              required
            />
          </div> */}
          <div className="relative mb-4">
            <FaKey className="absolute top-1/2 left-4 transform -translate-y-1/2 text-[#503691]" />
            <input
              type={showPassword ? "text" : "password"} // Toggle between text and password types
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-10 py-3 border border-gray-300 rounded-md"
              required
            />
            <button
              type="button"
              className="absolute top-1/2 right-4 transform -translate-y-1/2 text-[#503691] focus:outline-none"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Icon toggle */}
            </button>
          </div>
          {error && (
            <div className="text-red-500 bg-red-100 border border-red-500 rounded-md p-2 text-center mb-2">
              {error}
            </div>
          )}
          <button
            type="submit"
            className="w-full h-11 bg-[#503691] text-white rounded-full font-semibold hover:bg-[#5b54e6] disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
          {loading && <div className="mt-2 text-center">Loading...</div>}
          <div className="text-center mt-4">
            <p>
              Already a member?{" "}
              <Link to="/login" className="text-[#503691] font-semibold">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
