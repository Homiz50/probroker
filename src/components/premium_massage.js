import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const PremiumMessage = () => {
  const navigate = useNavigate();
  const [showExpiryAlert, setShowExpiryAlert] = useState(false);
  const [daysRemaining, setDaysRemaining] = useState(0);

  // Check Premium Expiration Status
  useEffect(() => {
    const checkPremiumStatus = async () => {
      const userId = Cookies.get("userId");
      const isPremium = Cookies.get("isPremium");

      if (userId && isPremium === "1") {
        try {
          const response = await axios.post(
            "https://auth.probroker.in/ijscui/probroker-admin/ceknvuhbd/cjwbhusb/protected/cishcub/premium-account-list/auhnuhzu"
          );

          const users = response.data;
          const currentUser = users.find(user => user.userId === userId);

          if (currentUser && currentUser.expiredDate) {
            const currentDate = new Date();
            const expiryDate = new Date(currentUser.expiredDate);

            // Calculate days remaining
            const timeDiff = expiryDate.getTime() - currentDate.getTime();
            const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

            // Show alert if 15 or fewer days remaining
            if (daysDiff <= 15 && daysDiff > 0) {
              setDaysRemaining(daysDiff);
              setShowExpiryAlert(true);
            }
          }
        } catch (error) {
          console.error("Error checking premium status:", error);
        }
      }
    };

    checkPremiumStatus();
  }, []);

  const closeExpiryAlert = () => {
    setShowExpiryAlert(false);
    // Remove the cookie setting here - we want the message to show again on next login
  };

  // Renew Premium function


  return (
    <div>
      {showExpiryAlert && (
        <div className="fixed bottom-5 left-5 z-[9999] w-80 animate-slide-up">
          <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col border-l-4 border-orange-500">

            <div className="mb-4">
              <div className="block mb-1 font-bold text-orange-600 text-base">Premium Expiring Soon ! <button

                className="bg-transparent border-none text-2xl cursor-pointer text-gray-500 hover:text-gray-700 px-9"
                onClick={closeExpiryAlert}
              >
                ×
              </button>
              </div>

              <p className="m-0 text-gray-700 text-sm">
                Your premium membership will expire in {daysRemaining} {daysRemaining === 1 ? 'day' : 'days'}. Renew now to keep enjoying all your premium benefits without interruption!
              </p>
            </div>
            <div className="flex justify-between items-center">
              <a href="tel:+918141817353">
                <button
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                >
                  Renew Premium
                </button>
              </a>


            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PremiumMessage;
