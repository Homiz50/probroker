// src/App.js
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ResidentialRental from "./components/ResidentialRental";
import ProtectedRoute from "./components/ProtectedRoute";
import FilterPage from "./components/FilterPage";
import Footer from "./components/Footer";
import PaymentStatusPage from "./components/PaymentStatusPage";
import SavedProperties from "./components/SavedProperties";
import Profile from "./components/Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./App.css";

const App = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  // Check if the popup was previously dismissed or the website is already added to home screen
  useEffect(() => {
    const isPopupDismissed = localStorage.getItem("popupDismissed");
    const isAddedToHomeScreen = localStorage.getItem("addedToHomeScreen");

    if (!isPopupDismissed && !isAddedToHomeScreen) {
      setShowPopup(true);
    }

    // Listen for beforeinstallprompt event
    const beforeInstallPromptListener = (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      setDeferredPrompt(e); // Save the event for later use
    };

    window.addEventListener("beforeinstallprompt", beforeInstallPromptListener);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        beforeInstallPromptListener
      );
    };
  }, []);

  const handleAddToHomeScreen = () => {
    if (deferredPrompt) {
      // Show the "Add to Home Screen" prompt
      deferredPrompt.prompt();

      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          localStorage.setItem("addedToHomeScreen", "true");
          setShowPopup(false); // Close the popup after the app is added to home screen
        } else {
          // Optionally handle the case when the user dismisses the prompt
        }
        setDeferredPrompt(null); // Clear the deferred prompt after the user makes a choice
      });
    }
  };

  const handleDismissPopup = () => {
    setShowPopup(false);
    localStorage.setItem("popupDismissed", "true"); // Mark the popup as dismissed
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };
  // useEffect(() => {
  //   const handleContextMenu = (e) => e.preventDefault();

  //   const handleKeyDown = (e) => {
  //     if (
  //       e.key === "F12" ||
  //       (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J")) ||
  //       (e.ctrlKey && e.key === "U")
  //     ) {
  //       e.preventDefault();
  //     }
  //   };

  //   const checkDevToolsOpen = () => {
  //     const threshold = 150;

  //     // Improved detection to consider screen width and height
  //     const isDevToolsOpen =
  //       window.outerWidth - window.innerWidth > threshold &&
  //       window.outerHeight - window.innerHeight > threshold;

  //     // Additional logic using detection scripts or alternate methods
  //     if (isDevToolsOpen) {
  //       localStorage.setItem("devToolsOpen", "true");
  //       window.history.replaceState(null, "", window.location.href);
  //       window.location.replace("https://www.google.com");
  //     } else {
  //       localStorage.removeItem("devToolsOpen");
  //     }
  //   };

  //   const preventBackNavigation = () => {
  //     const popstateHandler = () => {
  //       if (localStorage.getItem("devToolsOpen") === "true") {
  //         window.history.replaceState(null, "", window.location.href);
  //       }
  //     };

  //     window.history.pushState(null, "", window.location.href);
  //     window.addEventListener("popstate", popstateHandler);

  //     return () => {
  //       window.removeEventListener("popstate", popstateHandler);
  //     };
  //   };

  //   // Attach event listeners for context menu and keydown
  //   document.addEventListener("contextmenu", handleContextMenu);
  //   document.addEventListener("keydown", handleKeyDown);
  //   window.addEventListener("resize", checkDevToolsOpen);
  //   const cleanupPopstate = preventBackNavigation();

  //   // Initial check for dev tools status
  //   checkDevToolsOpen();

  //   return () => {
  //     // Clean up event listeners
  //     document.removeEventListener("contextmenu", handleContextMenu);
  //     document.removeEventListener("keydown", handleKeyDown);
  //     window.removeEventListener("resize", checkDevToolsOpen);
  //     cleanupPopstate();
  //   };
  // }, []);

  return (
    <Router>
      <ToastContainer
        position="top-right" // Customize as needed
        autoClose={5000} // Auto close after 5 seconds
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Public Route */}
        <Route
          path="/filter"
          element={<ProtectedRoute element={FilterPage} />}
        />
        <Route
          path="/residential-rental"
          element={<ProtectedRoute element={ResidentialRental} />}
        />
        <Route
          path="/saved-properties"
          element={<ProtectedRoute element={SavedProperties} />}
        />
        <Route
          path="/my-profile"
          element={<ProtectedRoute element={Profile} />}
        />
        <Route
          path="/payment-success"
          element={<ProtectedRoute element={PaymentStatusPage} />}
        />
        {/* Add more routes as needed */}
      </Routes>
      <Footer />
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-container">
            <button className="popup-close-btn" onClick={handleClosePopup}>
              &times;
            </button>
            <h2 className="popup-header">Add to Home Screen</h2>
            <p className="popup-description-text">
              To have quick access to our website, add it to your home screen
              for easy access anytime!
            </p>
            <div className="popup-button-container">
              <button className="popup-add-btn" onClick={handleAddToHomeScreen}>
                Add to Home Screen
              </button>
              <button
                className="popup-dismiss-btn"
                onClick={handleDismissPopup}
              >
                Don’t Show Again
              </button>
            </div>
          </div>
        </div>
      )}
    </Router>
  );
};

export default App;
