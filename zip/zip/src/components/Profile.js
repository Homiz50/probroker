import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie"; // Import js-cookie if not already imported
import "./Profile.css"; // Create a separate CSS file for styling
import { MdPayment } from "react-icons/md";

const Profile = () => {
  const userId = Cookies.get("userId");
  const [profileData, setProfileData] = useState({
    name: "",
    contactNumber: "",
    companyName: "",
    email: "",
    address: "",
    paymentHistory: [],
    joinedOn: "",
    activePlanDetails: null,
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0"); // Add leading zero if needed
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  const calculateDaysLeft = (endDate) => {
    const now = new Date();
    const end = new Date(endDate);
    const timeDiff = end.getTime() - now.getTime();
    return Math.max(Math.floor(timeDiff / (1000 * 3600 * 24)), 0);
  };

  useEffect(() => {
    // Fetch user profile data from API
    const fetchProfileData = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_IP}/user/dsvsdv/v2/casadyt/${userId}/csauyv`
        );
        const data = response.data.data.user; // Extract 'data' from response
        setProfileData({
          name: data.name,
          contactNumber: data.number,
          companyName: data.companyName,
          email: data.email,
          address: data.address,
          joinedOn: formatDate(data.createdOn), // Format the date here
          paymentHistory: response.data.data.paymentHistory || [],
          activePlanDetails: data.activePlanDetails || null,
        });
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetchProfileData();
  }, [userId]);

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-icon">
          <svg
            width="83"
            height="83"
            viewBox="0 0 83 83"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle opacity="0.2" cx="41.5" cy="41.5" r="41.5" fill="#6200E8" />
            <image
              href="./image/image-42.png"
              x="10"
              y="10"
              height="63"
              width="63"
              //   clip-path="circle(31.5px at 41.5px 41.5px)"
            />
          </svg>
        </div>

        <h2>Your Profile</h2>
      </div>
      {profileData.activePlanDetails && (
        <div className="active-plan-details">
          <h2>Active Plan Details</h2>
          <div className="plan-grid">
            <div className="plan-item">
              <strong>Purchased On:</strong>
              <span>{formatDate(profileData.activePlanDetails.paidOn)}</span>
            </div>
            <div className="plan-item">
              <strong>Expired On:</strong>
              <span>{formatDate(profileData.activePlanDetails.expiredOn)}</span>
            </div>
            <div className="plan-item">
              <strong>Days Remaining:</strong>
              <span>
                {calculateDaysLeft(profileData.activePlanDetails.expiredOn)}
              </span>
            </div>
            <div className="plan-item">
              <strong>Status:</strong>
              <span>
                {calculateDaysLeft(profileData.activePlanDetails.expiredOn) > 0
                  ? "Active"
                  : "Expired"}
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="profile-details">
        <div className="profile-field">
          <label>Name</label>
          <div className="profile-input">
            <input type="text" value={profileData.name} readOnly />
          </div>
        </div>

        <div className="profile-field">
          <label>Contact Number</label>
          <div className="profile-input">
            <input type="text" value={profileData.contactNumber} readOnly />
          </div>
        </div>

        <div className="profile-field">
          <label>Company Name</label>
          <div className="profile-input">
            <input type="text" value={profileData.companyName} readOnly />
          </div>
        </div>

        <div className="profile-field">
          <label>Email</label>
          <div className="profile-input">
            <input type="text" value={profileData.email} readOnly />
          </div>
        </div>

        <div className="profile-field">
          <label>Address</label>
          <div className="profile-input">
            <input type="text" value={profileData.address} readOnly />
          </div>
        </div>

        <div className="profile-field">
          <label>Joined On</label>
          <div className="profile-input">
            <input type="text" value={profileData.joinedOn} readOnly />
          </div>
        </div>
      </div>

      {profileData.paymentHistory.length > 0 && (
        <div className="payment-history">
          <h1>Payment History</h1>
          <div className="payment-records">
            {profileData.paymentHistory.map((payment, index) => (
              <div key={index} className="payment-record">
                <div>Name: {payment.name}</div>
                <div className="amount">Amount: ₹{payment.amount}</div>
                <div className="payment-mode">
                  <MdPayment />
                  Payment Mode: {payment.paymentMode}
                </div>
                <div>OrderId: {payment.orderId}</div>
                <div>Paid to: {payment.agentName}</div>
                <div>Status: {payment.status}</div>
                <div>Paid On: {formatDate(payment.createdOn)}</div>
                <div>Expired On: {formatDate(payment.expiredDate)}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
