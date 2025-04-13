import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  FaMapMarked,
  FaBed,
  FaShareAlt,
  FaRegBookmark,
  FaBookmark,
  FaMapMarker,
} from "react-icons/fa";
import { GoHome } from "react-icons/go";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { IoDocumentTextOutline } from "react-icons/io5";
import { LuUserSquare2 } from "react-icons/lu";
import {
  MdOutlineCalendarMonth,
  MdOutlinePhone,
  MdNoteAlt,
} from "react-icons/md";
import { RxDimensions } from "react-icons/rx";
import { TbLamp } from "react-icons/tb";
import Cookies from "js-cookie"; // Import js-cookie if not already imported
import Dropdown from "./CustomDropdown";
import { toast } from "react-toastify";

function PropertyCard({ property }) {
  // State to handle show more/less
  const [showMore, setShowMore] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSaved, setIsSaved] = useState(property?.isSaved);
  const [showDescMore, setShowDescMore] = useState(false);
  const [contactInfo, setContactInfo] = useState(
    property?.number === "0"
      ? null
      : { name: property?.name, number: property?.number }
  ); // State to store contact info
  const [loading, setLoading] = useState(false); // State to handle loading
  const [remark, setRemark] = useState(property?.remark || ""); // State for the remark
  const [isEditing, setIsEditing] = useState(false); // Toggle for editing
  const [status, setStatus] = useState(property?.status || "Not Answer"); // State for status

  const userId = Cookies.get("userId");
  const brokerName = Cookies.get("name");
  const brokerNumber = Cookies.get("number");

  const handleSaveRemark = async () => {
    try {
      const payload = {
        userId: userId,
        propId: property?.id,
        remark: remark,
      };

      // Fetch API call to save the remark
      const response = await fetch(
        `${process.env.REACT_APP_API_IP}/user/jcebduvhd/vehbvyubheud/property-remark`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      // Parse the response
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update remark.");
      }

      const result = await response.json();

      if (result.success) {
        toast.success("Remark updated successfully!");
        setIsEditing(false); // Exit edit mode
      } else {
        toast.error(
          result.message || "Failed to update remark. Please try again."
        );
      }
    } catch (error) {
      console.error("Error saving remark:", error);
      toast.error(
        error.message || "An error occurred while saving the remark."
      );
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false); // Exit edit mode
    setRemark(property?.remark || ""); // Reset remark to original value
  };

  const handleGetContact = async () => {
    setLoading(true); // Start loading
    const data = JSON.stringify({
      userId: userId, // Example user ID
      propId: property?.id, // Example property ID
    });

    const config = {
      method: "post",
      url: `${process.env.REACT_APP_API_IP}/user/v2/contacted/kcndjiwnjn/jdnjsnja/cxlbijbijsb`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    try {
      const response = await axios.request(config);
      if (response.data.success) {
        const contactInfo = response.data.data; // Store contact info in state
        setContactInfo(contactInfo);

        // Check if the user is on a mobile device
        const isMobileDevice = /Mobi|Android/i.test(navigator.userAgent);

        if (isMobileDevice && contactInfo?.number) {
          let phoneNumber = contactInfo.number;
          let name = contactInfo.name;

          // Check if the phone number starts with +91, and remove it if present
          if (phoneNumber.startsWith("+91")) {
            phoneNumber = phoneNumber.replace("+91", "").trim();
          }

          // Redirect to the phone's dialer app
          window.location.href = `tel:${phoneNumber}`;
        }
      }
    } catch (error) {
      console.error("Error getting contact:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveClick = async () => {
    // Optimistically update the state
    setIsSaved((prevIsSaved) => !prevIsSaved);

    const data = JSON.stringify({
      userId: userId, // Example user ID
      propId: property?.id, // Example property ID
    });

    let config = {
      method: "post",
      url: `${process.env.REACT_APP_API_IP}/user/save-property/ijddskjidns/cudhsbcuev`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    try {
      const response = await axios.request(config);
      if (!response.data.success) {
        // If the API call fails, revert the state
        setIsSaved((prevIsSaved) => !prevIsSaved);
      }
    } catch (error) {
      console.error(error);
      // Revert the state in case of error
      setIsSaved((prevIsSaved) => !prevIsSaved);
    }
  };

  // const handleStatusChange = (newStatus) => {
  //   setStatus(newStatus);
  // };

  const handleStatusChange = async (newStatus) => {
    setStatus(newStatus); // Update local status directly
    // Prepare data for API request
    const data = JSON.stringify({
      userId: userId,
      newStatus: newStatus, // No need to read from event, we get the newStatus directly
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_API_IP}/user/ckbwubuw/cjiwbucb/${property?.id}/status/cajbyqwvfydgqv`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    try {
      // Send request to update the status
      const response = await axios.request(config);
      if (!response.data.success) {
        console.error("Failed to update status");
      } else {
        setStatus(newStatus); // Update local status directly
      }
    } catch (error) {
      console.error("Error updating status", error);
    }
  };

  const totalWord = 20;
  // check if description is too long
  const isDescriptionTooLong =
    property?.description?.split(" ").length > totalWord;

  // Function to truncate text to 20 words
  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  const truncatedDescription = truncateText(property?.description, totalWord);

  // Check if the screen size is mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint in Tailwind
    };

    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  // const handleShareClick = async (property) => {
  //   try {
  //     if (navigator.share) {
  //       await navigator.share({
  //         text: `
  //         ${brokerNumber}
  //         ${brokerName}
  //         ${property?.bhk}
  //         ${property?.furnishedType}
  //         ${property?.squareFt}
  //         ${property?.area}
  //         ${property?.unitType}`,
  //       });
  //     } else {
  //       // Fallback for browsers that don't support the Web Share API
  //       console.log("Web Share API is not supported.");
  //     }
  //   } catch (error) {
  //     console.error("Error sharing:", error);
  //   }
  // };

  // const handleShareClick = async (property) => {
  //   try {
  //     if (navigator.share) {
  //       // Prepare the text content to share
  //       let shareText = `
  //         ${
  //           property?.type === "Residential Rent" ||
  //           property?.type === "Residential Sell"
  //             ? `Bedroom: ${property?.bhk || "NA"}`
  //             : ""
  //         }
  //         Furnished Type: ${property?.furnishedType || "NA"}
  //         Square Ft: ${property?.squareFt || "NA"} SqFt
  //         Address: ${property?.area || "NA"}, ${property?.city || "NA"}
  //         Type: ${property?.unitType || "NA"}
  //         Name: ${brokerName || "NA"}
  //         Number: ${brokerNumber || "NA"}
  //       `.trim();

  //       // Ensure single newlines between each section
  //       shareText = shareText.replace(/\n\s*\n/g, "\n").replace(/\n+/g, "\n");

  //       // Remove leading/trailing whitespace
  //       shareText = shareText.trim();

  //       // Sharing the formatted text
  //       await navigator.share({
  //         text: shareText,
  //       });
  //     } else {
  //       // Fallback for browsers that don't support the Web Share API
  //       console.log("Web Share API is not supported.");
  //     }
  //   } catch (error) {
  //     console.error("Error sharing:", error);
  //   }
  // };

  const handleShareClick = (property) => {
    // Create the share message
    const shareText = `
      ${
        property?.type === "Residential Rent" ||
        property?.type === "Residential Sell"
          ? `Bedroom: ${property?.bhk || "NA"}`
          : ""
      }
      ${
        property?.type === "Residential Rent" ||
        property?.type === "Commercial Rent"
          ? `Rent: ${property?.rent || "NA"}`
          : `Price: ${property?.rent || "NA"}`
      }
      Furnished Type: ${property?.furnishedType || "NA"}
      Square Ft: ${property?.squareFt || "NA"} SqFt
      Address: ${property?.area || "NA"}, ${property?.city || "NA"}
      Type: ${property?.unitType || "NA"}
      Name: ${brokerName || "NA"}
      Number: ${brokerNumber || "NA"}
    `
      .trim()
      .replace(/\n\s*\n/g, "\n")
      .replace(/\n+/g, "\n"); // Formatting

    // Check if the user is on mobile or desktop
    const isMobileDevice = /Mobi|Android/i.test(navigator.userAgent);

    if (isMobileDevice) {
      // Mobile device: Open WhatsApp with the pre-filled message
      const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
        shareText
      )}`;
      window.open(whatsappUrl, "_blank");
    } else {
      // Desktop: Copy to clipboard
      copyToClipboard(shareText);
      // Show toast notification
      showToast("Content copied to clipboard!");
    }
  };

  // Utility function to copy text to clipboard
  const copyToClipboard = (text) => {
    const tempTextArea = document.createElement("textarea");
    tempTextArea.value = text;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    document.execCommand("copy");
    document.body.removeChild(tempTextArea);
  };

  // Utility function to show toast message
  const showToast = (message) => {
    const toast = document.createElement("div");
    toast.innerText = message;
    toast.style.position = "fixed";
    toast.style.bottom = "20px";
    toast.style.left = "50%";
    toast.style.transform = "translateX(-50%)";
    toast.style.backgroundColor = "#333";
    toast.style.color = "#fff";
    toast.style.padding = "10px 20px";
    toast.style.borderRadius = "5px";
    toast.style.zIndex = "1000";
    document.body.appendChild(toast);

    // Remove the toast after 3 seconds
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 3000);
  };

  const getStatusClassName = (status) => {
    switch (status) {
      case "Rentout":
        return "bg-green-500 text-white";
      case "Not Answer":
        return "bg-yellow-500 text-white";
      case "Renting":
        return "bg-blue-500 text-white"; // Example, you can adjust the color
      default:
        return "bg-white text-black"; // Default case
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-2 lg:p-4 lg:mx-0">
      {/* Uncomment if you need the availability banner */}
      {/* <div className="flex flex-row items-center justify-end px-4 py-2">
        <div className="bg-yellow-300 rounded-lg p-1.5 text-white font-bold">
          Not Available
        </div>
      </div> */}

      {/* Desktop mode */}
      <div className="grid-cols-1 lg:grid-cols-2 lg:grid hidden gap-2 items-center justify-between pt-4 px-1 xl:px-4 lg:px-2">
        <div className="flex flex-col lg:flex-row justify-between gap-2">
          <div className="rounded-full p-2 text-red-500 font-bold px-4 w-fit border border-red-500">
            {/* #{generateRandom6DigitNumber()} */}
            {formatDate(property?.listedDate) || "NA"}
          </div>
          <p className="text-[#503691] bg-[#EFE9FF] font-bold  px-4 py-2 rounded-full border border-indigo-600">
            Premise - {property?.title || "NA"}
          </p>
        </div>
        <div className="flex flex-col lg:flex-row justify-between gap-2">
          {/* <p className="text-[#503691] bg-[#EFE9FF] font-bold px-4 py-2 rounded-full border border-indigo-600  text-nowrap overflow-hidden text-ellipsis">
            Rent: {property?.rent || "NA"}
          </p> */}
          <p className="text-[#503691] bg-[#EFE9FF] font-bold px-4 py-2 rounded-full border border-indigo-600 text-nowrap overflow-hidden text-ellipsis">
            {property?.type === "Residential Rent" ||
            property?.type === "Commercial Rent"
              ? `Rent: ${property?.rent || "NA"}`
              : property?.type === "Residential Sell" ||
                property?.type === "Commercial Sell"
              ? `Sell: ${property?.rent || "NA"}`
              : "Type Not Available"}
          </p>

          {/* Dropdown */}
          <div className="flex flex-row gap-2">
            <Dropdown
              status={status}
              onChange={handleStatusChange}
              propertyType={property?.type}
            />
            <div
              className="flex flex-row items-center gap-2 h-fit w-20 hover:bg-white bg-[#503691] border border-blue-800 text-white hover:text-blue-800 px-3 py-1.5 rounded-lg cursor-pointer"
              onClick={() => handleShareClick(property)}
            >
              <FaShareAlt className="h-4 w-4" />
              Share
            </div>
            {/* <div
              className={`flex flex-row items-center gap-2 h-fit ${
                isSaved
                  ? "bg-white text-[#503691]"
                  : "bg-white text-[#503691] hover:bg-[#503691] hover:text-white"
              } border border-[#503691] px-3 py-1.5 rounded-lg cursor-pointer w-20`}
              onClick={handleSaveClick}
              disabled={loading}
            >
              {isSaved ? (
                <FaBookmark className="h-4 w-4" />
              ) : (
                <FaRegBookmark className="h-4 w-4" />
              )}
              {isSaved ? "Unsave" : "Save"}
            </div> */}
            <div
              className={`flex flex-row items-center gap-2 h-fit ${
                isSaved
                  ? "bg-white text-[#503691]"
                  : "bg-white text-[#503691] hover:bg-[#503691] hover:text-white"
              } border border-[#503691] px-3 py-1.5 rounded-lg cursor-pointer`}
              onClick={handleSaveClick}
            >
              {isSaved ? (
                <FaBookmark className="h-4 w-4" />
              ) : (
                <FaRegBookmark className="h-4 w-4" />
              )}
              {isSaved ? "Unsave" : "Save"}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile mode */}
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:hidden gap-2 items-center justify-between pt-4 px-1 lg:px-4">
        <div className="flex flex-col lg:flex-row justify-between gap-2">
          <div className="flex flex-row justify-between gap-2">
            <p className="text-[#503691] bg-[#EFE9FF] font-bold px-1.5 py-1 rounded-full border text-sm border-blue-700 text-nowrap overflow-hidden text-ellipsis">
              Premise - {property?.title || "NA"}
            </p>
            <p className="text-[#503691] bg-[#EFE9FF] font-bold px-1.5 py-1 rounded-full border text-sm border-blue-700 text-nowrap overflow-hidden text-ellipsis">
              {/* Rent: {property?.rent || "NA"} */}
              {property?.type === "Residential Rent" ||
              property?.type === "Commercial Rent"
                ? `Rent: ${property?.rent || "NA"}`
                : property?.type === "Residential Sell" ||
                  property?.type === "Commercial Sell"
                ? `Sell: ${property?.rent || "NA"}`
                : "Type Not Available"}
            </p>
          </div>
          <div className="flex flex-row justify-between gap-2">
            <div className="bg-gray-100 rounded-full p-2 text-sm text-red-500 font-bold w-fit">
              {/* #{generateRandom6DigitNumber()} */}
              {formatDate(property?.listedDate) || "NA"}
            </div>
            <div>
              <Dropdown
                status={status}
                onChange={handleStatusChange}
                propertyType={property?.type}
              />{" "}
            </div>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 text-sm lg:text-md gap-4 p-2 lg:p-4 divide-x lg:divide-solid divide-none lg:divide-black">
        {/* First grid of items */}
        <div className="grid grid-cols-1 gap-2">
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-row items-center">
              <svg
                className="mr-2 h-6 w-6"
                width="33"
                height="32"
                viewBox="0 0 33 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.37089 0.15625L6.2147 0.30625V15.5875V30.8687L3.72184 30.8875L1.22897 30.9062L1.06653 31.0562C0.847861 31.2625 0.841613 31.6687 1.04779 31.8625L1.19149 32H16.9046H32.624L32.7552 31.8563C32.9552 31.6437 32.9427 31.2562 32.7303 31.0562C32.5678 30.9062 32.5678 30.9062 30.8872 30.8875L29.2065 30.8687V22.1C29.2065 15.7188 29.1878 13.275 29.1378 13.125C29.0003 12.7437 29.0441 12.75 24.9268 12.75H21.2094V6.63125C21.2094 2.54375 21.1906 0.449999 21.1469 0.3375C21.0094 -0.0125008 21.4343 0.00625038 13.6933 0H6.52084L6.37089 0.15625ZM20.0848 6.9375V12.7437L17.2983 12.7625L14.5117 12.7812L14.3618 12.9562L14.2119 13.1313V22.0062V30.875H13.7183H13.2185L13.1997 28.2938C13.181 25.7375 13.181 25.7188 13.0373 25.425C12.8498 25.0437 12.4562 24.7125 12.0626 24.5938C11.694 24.4812 10.4632 24.4688 10.0696 24.5687C9.66347 24.6687 9.25737 25 9.06369 25.3812L8.90124 25.7125V28.2938V30.875H8.12027H7.3393V16V1.125H13.712H20.0848V6.9375ZM28.0819 22.375V30.875H21.7092H15.3365V22.375V13.875H21.7092H28.0819V22.375ZM11.9127 25.8L12.0564 25.9437L12.0751 28.4062L12.0939 30.875H11.0567H10.0258V28.4188C10.0258 26.5437 10.0446 25.9375 10.1071 25.8625C10.2695 25.6625 10.4319 25.625 11.1005 25.6375C11.7065 25.6562 11.7877 25.6687 11.9127 25.8Z"
                  fill="#F1D35C"
                />
                <path
                  d="M9.06369 2.25625L8.90125 2.38125V4.21875C8.90125 5.225 8.91999 6.1 8.93873 6.15625C9.0387 6.40625 9.25737 6.4375 11.0192 6.4375C11.9439 6.4375 12.7749 6.4125 12.8623 6.375C13.1935 6.25 13.2185 6.09375 13.1997 4.1875L13.181 2.45L13.031 2.2875L12.8811 2.125H11.0567C9.3011 2.125 9.22613 2.13125 9.06369 2.25625ZM12.0876 4.28125V5.3125H11.0567H10.0258V4.28125V3.25H11.0567H12.0876V4.28125Z"
                  fill="#F1D35C"
                />
                <path
                  d="M14.3681 2.28125L14.2119 2.43125V4.24375V6.05625L14.3619 6.23125L14.5118 6.40625H16.3674H18.223L18.3729 6.23125L18.5229 6.05625V4.25625V2.45625L18.3667 2.2875L18.2167 2.125H16.3674H14.5181L14.3681 2.28125ZM17.3983 4.28125V5.3125H16.3674H15.3365V4.28125V3.25H16.3674H17.3983V4.28125Z"
                  fill="#F1D35C"
                />
                <path
                  d="M9.1824 7.5125C8.90749 7.6625 8.90125 7.6875 8.90125 9.60625V11.4437L9.05744 11.5938L9.20739 11.75H11.0442H12.8811L13.031 11.5875L13.181 11.425V9.58125V7.7375L13.006 7.5875L12.8311 7.4375H11.0692C9.91338 7.44375 9.26362 7.4625 9.1824 7.5125ZM12.0876 9.59375V10.625H11.0567H10.0258V9.59375V8.5625H11.0567H12.0876V9.59375Z"
                  fill="#F1D35C"
                />
                <path
                  d="M14.4931 7.5125C14.2182 7.66875 14.2182 7.7 14.2119 9.6V11.4188L14.3744 11.5875L14.543 11.75H16.3674H18.1917L18.3604 11.5875L18.5229 11.4188V9.65C18.5229 7.775 18.5041 7.63125 18.2292 7.50625C18.0168 7.4125 14.6618 7.4125 14.4931 7.5125ZM17.3983 9.59375V10.625H16.3674H15.3365V9.59375V8.5625H16.3674H17.3983V9.59375Z"
                  fill="#F1D35C"
                />
                <path
                  d="M9.27611 12.7938C9.22613 12.8125 9.11992 12.8875 9.04494 12.9563C8.90125 13.0813 8.90125 13.0938 8.90125 14.9375V16.7938L9.06369 16.9438C9.22613 17.0938 9.22613 17.0938 10.8693 17.1125C11.9439 17.125 12.6062 17.1063 12.7749 17.0625C13.1935 16.95 13.2122 16.8438 13.2122 14.9375C13.2122 13.1 13.181 12.9438 12.8373 12.8188C12.6249 12.75 9.46354 12.725 9.27611 12.7938ZM12.0876 14.9375V16H11.0567H10.0258V14.9375V13.875H11.0567H12.0876V14.9375Z"
                  fill="#F1D35C"
                />
                <path
                  d="M9.06369 18.2562L8.90125 18.3812V20.2188C8.90125 21.225 8.91999 22.1 8.93873 22.1562C9.0387 22.4062 9.25737 22.4375 11.0192 22.4375C11.9439 22.4375 12.7749 22.4125 12.8623 22.375C13.1935 22.25 13.2185 22.0938 13.1997 20.1875L13.181 18.45L13.031 18.2875L12.8811 18.125H11.0567C9.3011 18.125 9.22613 18.1312 9.06369 18.2562ZM12.0876 20.2812V21.3125H11.0567H10.0258V20.2812V19.25H11.0567H12.0876V20.2812Z"
                  fill="#F1D35C"
                />
                <path
                  d="M17.3045 14.9187C17.2358 14.9374 17.1171 15.0062 17.0421 15.0812C16.8984 15.2062 16.8984 15.2187 16.8984 17.0624V18.9187L17.0609 19.0687C17.2233 19.2187 17.2233 19.2187 18.8852 19.2374C19.9973 19.2499 20.6346 19.2374 20.7908 19.1874C21.1844 19.0749 21.2094 18.9437 21.2094 17.0624C21.2094 15.1749 21.1844 15.0499 20.7908 14.9437C20.5596 14.8749 17.5607 14.8562 17.3045 14.9187ZM20.0848 17.0624V18.1249H19.0539H18.023V17.0624V15.9999H19.0539H20.0848V17.0624Z"
                  fill="#F1D35C"
                />
                <path
                  d="M22.5401 14.9688C22.4339 15.0125 22.3152 15.1062 22.2777 15.1813C22.234 15.2625 22.209 15.9312 22.209 17.0875V18.8688L22.3589 19.0438L22.5089 19.2188H24.3645H26.2201L26.37 19.0438L26.5199 18.8688V17.0875C26.5199 15.9312 26.495 15.2625 26.4512 15.175C26.3075 14.9125 26.0639 14.875 24.352 14.875C23.1212 14.8812 22.6901 14.9 22.5401 14.9688ZM25.3953 17.0625V18.125H24.3645H23.3336V17.0625V16H24.3645H25.3953V17.0625Z"
                  fill="#F1D35C"
                />
                <path
                  d="M17.0546 20.4062L16.8984 20.5563V22.3687C16.8984 23.3625 16.9172 24.225 16.9359 24.2812C17.0359 24.5312 17.2483 24.5625 19.0789 24.5625H20.8283L21.0032 24.4125L21.1782 24.2625V22.4188V20.575L21.0282 20.4125L20.8783 20.25H19.0414H17.2046L17.0546 20.4062ZM20.0848 22.4062V23.4375H19.0539H18.023V22.4062V21.375H19.0539H20.0848V22.4062Z"
                  fill="#F1D35C"
                />
                <path
                  d="M22.3714 20.4125L22.209 20.5812V22.4C22.2152 24.3125 22.2152 24.3375 22.5026 24.4875C22.6901 24.5875 26.0139 24.5937 26.2263 24.4937C26.5012 24.3687 26.5199 24.225 26.5199 22.35V20.5812L26.3575 20.4125L26.1888 20.25H24.3645H22.5401L22.3714 20.4125ZM25.3953 22.4062V23.4375H24.3645H23.3336V22.4062V21.375H24.3645H25.3953V22.4062Z"
                  fill="#F1D35C"
                />
                <path
                  d="M17.1796 25.6375C16.9047 25.7875 16.8984 25.8125 16.8984 27.7563V29.6188L17.0609 29.7438C17.2233 29.8688 17.2983 29.875 19.0539 29.875H20.8783L21.0282 29.7125L21.1782 29.55L21.1969 27.8125C21.2157 25.9063 21.1907 25.75 20.8595 25.625C20.6346 25.5375 17.3358 25.55 17.1796 25.6375ZM20.0848 27.7188V28.75H19.0539H18.023V27.7188V26.6875H19.0539H20.0848V27.7188Z"
                  fill="#F1D35C"
                />
                <path
                  d="M22.5464 25.625C22.2215 25.7562 22.209 25.8312 22.209 27.7687V29.5687L22.3652 29.7188L22.5151 29.875H24.3645H26.2138L26.3638 29.7125L26.5199 29.5437V27.7437V25.9437L26.37 25.7687L26.2201 25.5938L24.4457 25.5812C23.4773 25.575 22.6151 25.5938 22.5464 25.625ZM25.3953 27.7188V28.75H24.3645H23.3336V27.7188V26.6875H24.3645H25.3953V27.7188Z"
                  fill="#F1D35C"
                />
              </svg>

              {/* <MdOutlineCalendarMonth className="text-[#f1d35c] mr-2 h-6 w-6" /> */}
              <p>Type</p>
            </div>
            <p className="text-end">{property?.type || "NA"}</p>
          </div>
          <hr className="block"></hr>
          {/* <div className="flex items-center justify-between gap-4">
            <div className="flex flex-row items-center">
              <LuUserSquare2 className="text-[#503691] mr-2 h-6 w-6" />
              <p>Name</p>
            </div>
            <p className="text-end">{property?.name || "NA"}</p>
          </div>
          <hr className="block"></hr> */}
          {/* <div className="flex items-center justify-between gap-4">
            <div className="flex flex-row items-center">
              <MdOutlineCalendarMonth className="text-[#f1d35c] mr-2 h-6 w-6" />
              <p>Date</p>
            </div>
            <p className="text-end">
              {formatDate(property?.createdOn) || "NA"}
            </p>
          </div> */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-row items-center">
              <svg
                className="mr-2 h-6 w-6"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.7377 1.22155C12.2465 1.88853 10.9665 2.50304 10.8873 2.57799C10.7487 2.72038 10.7487 2.72038 10.7487 8.74567V14.7635H6.17613C1.82128 14.7635 1.59034 14.771 1.49137 14.8984C1.3858 15.0258 1.3792 15.6927 1.3792 22.9546V30.8759H0.831545C0.343274 30.8759 0.264095 30.8984 0.138728 31.0482C-0.0526211 31.2806 -0.0460228 31.5878 0.158523 31.8126L0.316881 32H15.9811H31.6454L31.8235 31.8426C32.0413 31.6478 32.0611 31.2506 31.8631 31.0258C31.7509 30.8984 31.6454 30.8759 31.2033 30.8759H30.6754L30.6622 22.7447C30.6424 14.7335 30.6424 14.6136 30.5105 14.4712C30.4379 14.3888 29.2964 13.6019 27.9701 12.7251L25.5618 11.1288L24.4269 11.1063L23.2854 11.0838V7.23185V3.37986L23.1402 3.2C23.0413 3.08009 21.913 2.50304 19.8081 1.50632C18.0662 0.681969 16.5948 0 16.542 0C16.4958 0.00749397 15.2355 0.554567 13.7377 1.22155ZM16.0933 16.1499V30.8759H13.9159H11.7385V17.1016V3.3274L13.8367 2.38314C14.9848 1.86604 15.9679 1.43888 16.0141 1.43138C16.0735 1.42389 16.0933 4.41405 16.0933 16.1499ZM19.7421 2.70539L22.2957 3.91944V17.4014V30.8759H19.6564H17.0171V16.1424C17.0171 4.38408 17.0368 1.41639 17.1028 1.44637C17.1424 1.46885 18.3301 2.03091 19.7421 2.70539ZM24.869 21.5457V30.8759H24.0772H23.2854V21.5457V12.2155H24.0772H24.869V21.5457ZM27.924 14.0141L29.6857 15.1756V23.022V30.8759H27.7722H25.8587V21.7705V12.6576L26.0171 12.755C26.0962 12.8075 26.9606 13.3771 27.924 14.0141ZM10.7487 23.3443V30.8759H6.55883H2.36894V23.3443V15.8126H6.55883H10.7487V23.3443Z"
                  fill="#249B7E"
                />
                <path
                  d="M14.6087 3.78455C14.4569 3.94942 14.4437 4.02436 14.4437 4.64638C14.4437 5.26839 14.4569 5.34333 14.6087 5.5082C14.6945 5.61312 14.8462 5.69556 14.9386 5.69556C15.031 5.69556 15.1827 5.61312 15.2685 5.5082C15.4203 5.34333 15.4335 5.26839 15.4335 4.66136C15.4335 4.0993 15.4137 3.96441 15.2949 3.79204C15.1167 3.53724 14.8264 3.52975 14.6087 3.78455Z"
                  fill="#249B7E"
                />
                <path
                  d="M12.5303 4.34669C12.4181 4.47409 12.3983 4.594 12.3983 5.24599C12.3983 6.09282 12.4907 6.29517 12.8602 6.29517C13.2297 6.29517 13.3221 6.09282 13.3221 5.24599C13.3221 4.39915 13.2297 4.19681 12.8602 4.19681C12.748 4.19681 12.6029 4.26425 12.5303 4.34669Z"
                  fill="#249B7E"
                />
                <path
                  d="M14.6087 7.68152C14.4569 7.84639 14.4437 7.92134 14.4437 8.54335C14.4437 9.16536 14.4569 9.2403 14.6087 9.40518C14.6945 9.51009 14.8462 9.59253 14.9386 9.59253C15.031 9.59253 15.1827 9.51009 15.2685 9.40518C15.4203 9.2403 15.4335 9.16536 15.4335 8.54335C15.4335 7.92134 15.4203 7.84639 15.2685 7.68152C15.1827 7.5766 15.031 7.49417 14.9386 7.49417C14.8462 7.49417 14.6945 7.5766 14.6087 7.68152Z"
                  fill="#249B7E"
                />
                <path
                  d="M12.5303 8.24366C12.4181 8.37106 12.3983 8.49097 12.3983 9.14296C12.3983 9.9898 12.4907 10.1921 12.8602 10.1921C13.2297 10.1921 13.3221 9.9898 13.3221 9.14296C13.3221 8.29612 13.2297 8.09378 12.8602 8.09378C12.748 8.09378 12.6029 8.16123 12.5303 8.24366Z"
                  fill="#249B7E"
                />
                <path
                  d="M14.6087 11.5785C14.4569 11.7434 14.4437 11.8183 14.4437 12.4403C14.4437 13.0623 14.4569 13.1373 14.6087 13.3021C14.6945 13.4071 14.8462 13.4895 14.9386 13.4895C15.031 13.4895 15.1827 13.4071 15.2685 13.3021C15.4203 13.1373 15.4335 13.0623 15.4335 12.4403C15.4335 11.8183 15.4203 11.7434 15.2685 11.5785C15.1827 11.4736 15.031 11.3911 14.9386 11.3911C14.8462 11.3911 14.6945 11.4736 14.6087 11.5785Z"
                  fill="#249B7E"
                />
                <path
                  d="M12.5303 12.1406C12.4181 12.268 12.3983 12.3879 12.3983 13.0399C12.3983 13.8868 12.4907 14.0891 12.8602 14.0891C13.2297 14.0891 13.3221 13.8868 13.3221 13.0399C13.3221 12.1931 13.2297 11.9908 12.8602 11.9908C12.748 11.9908 12.6029 12.0582 12.5303 12.1406Z"
                  fill="#249B7E"
                />
                <path
                  d="M14.6087 15.4755C14.4569 15.6403 14.4437 15.7153 14.4437 16.3373C14.4437 16.9593 14.4569 17.0342 14.6087 17.1991C14.6945 17.304 14.8462 17.3865 14.9386 17.3865C15.031 17.3865 15.1827 17.304 15.2685 17.1991C15.4203 17.0342 15.4335 16.9593 15.4335 16.3373C15.4335 15.7153 15.4203 15.6403 15.2685 15.4755C15.1827 15.3705 15.031 15.2881 14.9386 15.2881C14.8462 15.2881 14.6945 15.3705 14.6087 15.4755Z"
                  fill="#249B7E"
                />
                <path
                  d="M12.6622 15.9401C12.4445 16.03 12.3983 16.2173 12.3983 16.9518C12.3983 17.7836 12.4907 17.986 12.8602 17.986C13.2297 17.986 13.3221 17.7836 13.3221 16.9518C13.3221 16.1799 13.3023 16.1049 13.0779 15.97C12.9262 15.8801 12.8206 15.8726 12.6622 15.9401Z"
                  fill="#249B7E"
                />
                <path
                  d="M14.6087 19.3723C14.4569 19.5372 14.4437 19.6121 14.4437 20.2192C14.4437 21.021 14.5625 21.2833 14.9386 21.2833C15.3147 21.2833 15.4335 21.021 15.4335 20.2192C15.4335 19.6121 15.4203 19.5372 15.2685 19.3723C15.1827 19.2674 15.031 19.185 14.9386 19.185C14.8462 19.185 14.6945 19.2674 14.6087 19.3723Z"
                  fill="#249B7E"
                />
                <path
                  d="M12.6293 19.8745C12.4181 20.0094 12.3983 20.0843 12.3983 20.8487C12.3983 21.6806 12.4907 21.8829 12.8602 21.8829C13.2297 21.8829 13.3221 21.6806 13.3221 20.8487C13.3221 20.0768 13.3023 20.0019 13.0779 19.867C12.8998 19.7621 12.8008 19.7621 12.6293 19.8745Z"
                  fill="#249B7E"
                />
                <path
                  d="M14.6087 23.2693C14.4569 23.4342 14.4437 23.5091 14.4437 24.1161C14.4437 24.918 14.5625 25.1803 14.9386 25.1803C15.3147 25.1803 15.4335 24.918 15.4335 24.1161C15.4335 23.5091 15.4203 23.4342 15.2685 23.2693C15.1827 23.1644 15.031 23.0819 14.9386 23.0819C14.8462 23.0819 14.6945 23.1644 14.6087 23.2693Z"
                  fill="#249B7E"
                />
                <path
                  d="M12.6293 23.7715C12.4181 23.9064 12.3983 23.9813 12.3983 24.7832C12.3983 25.4876 12.4115 25.5551 12.5435 25.66C12.6227 25.7274 12.7678 25.7799 12.8602 25.7799C12.9526 25.7799 13.0977 25.7274 13.1769 25.66C13.3089 25.5551 13.3221 25.4876 13.3221 24.7832C13.3221 23.9663 13.3023 23.8989 13.0779 23.764C12.8998 23.6591 12.8008 23.6591 12.6293 23.7715Z"
                  fill="#249B7E"
                />
                <path
                  d="M14.6087 27.1663C14.4569 27.3312 14.4437 27.4061 14.4437 28.0132C14.4437 28.5752 14.4635 28.7101 14.5823 28.8825C14.7604 29.1373 15.0904 29.1523 15.2883 28.905C15.4137 28.7551 15.4335 28.6427 15.4335 28.0356C15.4335 27.4061 15.4203 27.3312 15.2685 27.1663C15.1827 27.0614 15.031 26.979 14.9386 26.979C14.8462 26.979 14.6945 27.0614 14.6087 27.1663Z"
                  fill="#249B7E"
                />
                <path
                  d="M12.5699 27.7358C12.4049 27.8857 12.3983 27.9156 12.3983 28.665C12.3983 29.3845 12.4115 29.4519 12.5435 29.5569C12.6227 29.6243 12.7678 29.6768 12.8602 29.6768C12.9526 29.6768 13.0977 29.6243 13.1769 29.5569C13.3089 29.4519 13.3221 29.3845 13.3221 28.665C13.3221 27.9156 13.3155 27.8857 13.1505 27.7358C13.0515 27.6458 12.9262 27.5784 12.8602 27.5784C12.7942 27.5784 12.6688 27.6458 12.5699 27.7358Z"
                  fill="#249B7E"
                />
                <path
                  d="M17.8946 3.14748C17.6702 3.2524 17.6108 3.46223 17.6108 4.18917C17.6108 4.98354 17.7032 5.1709 18.0991 5.1709C18.4686 5.1709 18.6006 4.9086 18.6006 4.18917C18.6006 3.4997 18.5214 3.25989 18.2509 3.14748C18.1453 3.11001 18.0529 3.07254 18.0463 3.08003C18.0397 3.08003 17.9737 3.11001 17.8946 3.14748Z"
                  fill="#249B7E"
                />
                <path
                  d="M19.2935 3.93439C19.1417 4.09926 19.1285 4.1742 19.1285 4.78123C19.1285 5.34329 19.1483 5.47818 19.2671 5.65055C19.4453 5.90535 19.7752 5.92034 19.9731 5.67303C20.0985 5.51565 20.1183 5.41823 20.1183 4.78123C20.1183 4.09177 20.1117 4.0543 19.9467 3.90441C19.7158 3.69458 19.4914 3.70956 19.2935 3.93439Z"
                  fill="#249B7E"
                />
                <path
                  d="M20.844 4.57154C20.7318 4.69894 20.712 4.81885 20.712 5.47084C20.712 6.31768 20.8044 6.52002 21.1739 6.52002C21.5434 6.52002 21.6358 6.31768 21.6358 5.47084C21.6358 4.624 21.5434 4.42166 21.1739 4.42166C21.0617 4.42166 20.9166 4.48911 20.844 4.57154Z"
                  fill="#249B7E"
                />
                <path
                  d="M17.789 7.11943C17.6174 7.27681 17.6108 7.29929 17.6108 8.02622C17.6108 8.67072 17.6306 8.79063 17.7428 8.91803C17.9408 9.14285 18.2905 9.12037 18.4686 8.86557C18.594 8.67821 18.6072 8.58079 18.5874 7.96627C18.5676 7.20936 18.5082 7.08196 18.1717 6.99953C18.0265 6.96955 17.921 6.99953 17.789 7.11943Z"
                  fill="#249B7E"
                />
                <path
                  d="M19.2935 7.83132C19.1417 7.99619 19.1285 8.07114 19.1285 8.69315C19.1285 9.31516 19.1417 9.39011 19.2935 9.55498C19.4914 9.7798 19.7158 9.79479 19.9467 9.58495C20.1117 9.43507 20.1183 9.40509 20.1183 8.69315C20.1183 7.98121 20.1117 7.95123 19.9467 7.80135C19.7158 7.59151 19.4914 7.6065 19.2935 7.83132Z"
                  fill="#249B7E"
                />
                <path
                  d="M20.844 8.46841C20.7318 8.59581 20.712 8.71572 20.712 9.36021C20.712 10.1621 20.7582 10.297 21.0749 10.3869C21.2267 10.4319 21.4972 10.312 21.583 10.1621C21.6094 10.1171 21.6358 9.74991 21.6358 9.34523C21.6358 8.52087 21.5434 8.31853 21.1739 8.31853C21.0617 8.31853 20.9166 8.38598 20.844 8.46841Z"
                  fill="#249B7E"
                />
                <path
                  d="M17.7824 11.0238C17.6174 11.1737 17.6108 11.2112 17.6108 11.9082C17.6108 12.5751 17.624 12.6501 17.7626 12.8C17.9671 13.0173 18.2377 13.0098 18.4356 12.7775C18.5874 12.6126 18.6006 12.5377 18.6006 11.9156C18.6006 11.2936 18.5874 11.2187 18.4356 11.0538C18.2377 10.829 18.0133 10.814 17.7824 11.0238Z"
                  fill="#249B7E"
                />
                <path
                  d="M19.2935 11.7283C19.1417 11.8932 19.1285 11.9681 19.1285 12.5901C19.1285 13.2121 19.1417 13.2871 19.2935 13.4519C19.4914 13.6768 19.7158 13.6918 19.9467 13.4819C20.1117 13.332 20.1183 13.2946 20.1183 12.5976C20.1183 11.9306 20.1051 11.8557 19.9665 11.7058C19.762 11.4885 19.4914 11.496 19.2935 11.7283Z"
                  fill="#249B7E"
                />
                <path
                  d="M20.8572 12.3353C20.7252 12.4402 20.712 12.5076 20.712 13.2271C20.712 13.9765 20.7186 14.0065 20.8836 14.1563C20.9826 14.2463 21.1079 14.3137 21.1739 14.3137C21.2399 14.3137 21.3653 14.2463 21.4642 14.1563C21.6292 14.0065 21.6358 13.9765 21.6358 13.2271C21.6358 12.5076 21.6226 12.4402 21.4906 12.3353C21.4115 12.2678 21.2663 12.2154 21.1739 12.2154C21.0815 12.2154 20.9364 12.2678 20.8572 12.3353Z"
                  fill="#249B7E"
                />
                <path
                  d="M17.756 14.9358C17.6306 15.0932 17.6108 15.1906 17.6108 15.8276C17.6108 16.517 17.6174 16.5545 17.7824 16.7044C18.0001 16.8993 18.2113 16.9067 18.4092 16.7194C18.5544 16.592 18.5676 16.5021 18.5874 15.8576C18.6138 15.1756 18.6072 15.1381 18.4422 14.9508C18.2311 14.711 17.9474 14.7035 17.756 14.9358Z"
                  fill="#249B7E"
                />
                <path
                  d="M19.2605 15.6403C19.1351 15.8277 19.1219 15.9251 19.1417 16.5396C19.1615 17.304 19.2209 17.4239 19.5706 17.5064C19.7422 17.5438 19.8148 17.5139 19.9467 17.364C20.1051 17.1841 20.1183 17.1242 20.1183 16.4497C20.1183 15.8352 20.0985 15.7153 19.9863 15.5879C19.7884 15.363 19.4387 15.3855 19.2605 15.6403Z"
                  fill="#249B7E"
                />
                <path
                  d="M20.8243 16.2473C20.6527 16.4572 20.6659 17.8361 20.8309 18.0084C20.9958 18.1808 21.3917 18.1733 21.5237 18.001C21.6953 17.7911 21.6821 16.4122 21.5171 16.2398C21.3522 16.0675 20.9563 16.075 20.8243 16.2473Z"
                  fill="#249B7E"
                />
                <path
                  d="M17.7428 18.8103C17.6306 18.9377 17.6108 19.0576 17.6108 19.7021C17.6108 20.429 17.6174 20.4515 17.789 20.6089C17.921 20.7288 18.0265 20.7588 18.1717 20.7288C18.5082 20.6464 18.5676 20.519 18.5874 19.7621C18.6072 19.1475 18.594 19.0501 18.4686 18.8628C18.2905 18.608 17.9408 18.5855 17.7428 18.8103Z"
                  fill="#249B7E"
                />
                <path
                  d="M19.2671 19.5298C19.1549 19.6946 19.1285 19.837 19.1285 20.3167C19.1285 21.0361 19.2011 21.2609 19.4387 21.3359C19.9665 21.4932 20.1183 21.2684 20.1183 20.3391C20.1183 19.7321 20.0985 19.6122 19.9863 19.4848C19.7884 19.26 19.4387 19.2825 19.2671 19.5298Z"
                  fill="#249B7E"
                />
                <path
                  d="M20.8243 20.1443C20.6527 20.3541 20.6659 21.7331 20.8309 21.9054C20.9958 22.0778 21.3917 22.0703 21.5237 21.8979C21.6953 21.6881 21.6821 20.3092 21.5171 20.1368C21.3522 19.9644 20.9563 19.9719 20.8243 20.1443Z"
                  fill="#249B7E"
                />
                <path
                  d="M17.7428 22.7073C17.6306 22.8347 17.6108 22.9546 17.6108 23.5391C17.6108 23.9138 17.6438 24.281 17.6834 24.3635C17.8418 24.7082 18.3762 24.6782 18.528 24.311C18.5676 24.2061 18.6006 23.8614 18.6006 23.5391C18.6006 23.0595 18.5742 22.9171 18.462 22.7522C18.2905 22.5049 17.9408 22.4824 17.7428 22.7073Z"
                  fill="#249B7E"
                />
                <path
                  d="M19.3529 23.2918C19.1945 23.4117 19.1285 23.6965 19.1285 24.2435C19.1285 25.0304 19.2407 25.2552 19.6432 25.2552C20.0259 25.2552 20.1183 25.0604 20.1183 24.2585C20.1183 23.4192 20.0391 23.2318 19.6696 23.2318C19.5376 23.2318 19.3925 23.2618 19.3529 23.2918Z"
                  fill="#249B7E"
                />
                <path
                  d="M20.8836 23.9887C20.7186 24.1386 20.712 24.1686 20.712 24.918C20.712 25.6374 20.7252 25.7049 20.8572 25.8098C20.9364 25.8772 21.0815 25.9297 21.1739 25.9297C21.2663 25.9297 21.4115 25.8772 21.4906 25.8098C21.6226 25.7049 21.6358 25.6374 21.6358 24.918C21.6358 24.1686 21.6292 24.1386 21.4642 23.9887C21.3653 23.8988 21.2399 23.8313 21.1739 23.8313C21.1079 23.8313 20.9826 23.8988 20.8836 23.9887Z"
                  fill="#249B7E"
                />
                <path
                  d="M17.7164 26.6192C17.6372 26.7391 17.6108 26.9715 17.6108 27.4661C17.6108 28.2904 17.69 28.4778 18.0595 28.4778C18.495 28.4778 18.6006 28.2754 18.6006 27.4661C18.6006 26.6567 18.495 26.4544 18.0595 26.4544C17.8814 26.4544 17.789 26.4993 17.7164 26.6192Z"
                  fill="#249B7E"
                />
                <path
                  d="M19.4057 27.1288C19.2011 27.2262 19.1285 27.496 19.1285 28.1705C19.1285 28.8899 19.2605 29.1522 19.63 29.1522C20.0259 29.1522 20.1183 28.9649 20.1183 28.148C20.1183 27.5859 20.0919 27.4136 20.0061 27.2937C19.8609 27.1063 19.6102 27.0314 19.4057 27.1288Z"
                  fill="#249B7E"
                />
                <path
                  d="M20.943 27.8182C20.7318 27.9531 20.712 28.0281 20.712 28.7925C20.712 29.6243 20.8044 29.8267 21.1739 29.8267C21.5434 29.8267 21.6358 29.6243 21.6358 28.7925C21.6358 28.0206 21.616 27.9456 21.3917 27.8107C21.2135 27.7058 21.1145 27.7058 20.943 27.8182Z"
                  fill="#249B7E"
                />
                <path
                  d="M26.5845 14.7635C26.4789 14.8834 26.4525 15.0108 26.4525 15.3855C26.4525 15.9626 26.5911 16.1874 26.9474 16.1874C27.3037 16.1874 27.4423 15.9626 27.4423 15.3855C27.4423 14.8159 27.3103 14.6136 26.9474 14.6136C26.8022 14.6136 26.6637 14.6736 26.5845 14.7635Z"
                  fill="#249B7E"
                />
                <path
                  d="M28.1615 15.8051C28.023 15.9326 28.0032 16.015 28.0032 16.4871C28.0032 16.9592 28.023 17.0417 28.1615 17.1691C28.3595 17.3564 28.6366 17.3489 28.8148 17.1616C28.9401 17.0267 28.9599 16.9218 28.9599 16.4871C28.9599 16.0225 28.9467 15.9625 28.7884 15.8201C28.5706 15.6253 28.3595 15.6178 28.1615 15.8051Z"
                  fill="#249B7E"
                />
                <path
                  d="M26.5845 17.3265C26.4789 17.4539 26.4525 17.5887 26.4525 17.9635C26.4525 18.533 26.5845 18.7354 26.9474 18.7354C27.3169 18.7354 27.4423 18.533 27.4423 17.9485C27.4423 17.5588 27.4159 17.4314 27.3103 17.3115C27.1321 17.1091 26.7626 17.1091 26.5845 17.3265Z"
                  fill="#249B7E"
                />
                <path
                  d="M28.2539 18.3008C27.9371 18.4731 27.8778 19.4549 28.1681 19.7246C28.3594 19.9045 28.663 19.897 28.8279 19.7097C28.9335 19.5897 28.9599 19.4623 28.9599 19.0427C28.9599 18.5705 28.9467 18.5106 28.7883 18.3682C28.597 18.1958 28.4716 18.1808 28.2539 18.3008Z"
                  fill="#249B7E"
                />
                <path
                  d="M26.5911 19.9045C26.4855 20.0543 26.4525 20.2117 26.4525 20.534C26.4525 21.0885 26.5911 21.3134 26.9474 21.3134C27.3037 21.3134 27.4423 21.0885 27.4423 20.534C27.4423 19.9869 27.2773 19.7096 26.9474 19.7096C26.789 19.7096 26.6901 19.7621 26.5911 19.9045Z"
                  fill="#249B7E"
                />
                <path
                  d="M28.1285 20.9911C28.0362 21.111 28.0032 21.2609 28.0032 21.6206C28.0032 22.1901 28.1351 22.4075 28.4782 22.4075C28.8346 22.4075 28.9599 22.1976 28.9599 21.5981C28.9599 21.1934 28.9335 21.0585 28.8412 20.9611C28.663 20.7812 28.2803 20.7962 28.1285 20.9911Z"
                  fill="#249B7E"
                />
                <path
                  d="M26.6175 22.4449C26.4789 22.5948 26.4525 22.6997 26.4525 23.0819C26.4525 23.4641 26.4789 23.5691 26.6175 23.7189C26.822 23.9588 27.0728 23.9588 27.2773 23.7189C27.4159 23.5691 27.4423 23.4641 27.4423 23.0819C27.4423 22.6997 27.4159 22.5948 27.2773 22.4449C27.1915 22.34 27.0398 22.2576 26.9474 22.2576C26.855 22.2576 26.7032 22.34 26.6175 22.4449Z"
                  fill="#249B7E"
                />
                <path
                  d="M28.1285 23.5391C28.0362 23.659 28.0032 23.8088 28.0032 24.1686C28.0032 24.7531 28.1285 24.9554 28.498 24.9554C28.8543 24.9554 28.9599 24.7831 28.9599 24.1985C28.9599 23.5765 28.8477 23.3817 28.5046 23.3817C28.3331 23.3817 28.2143 23.4341 28.1285 23.5391Z"
                  fill="#249B7E"
                />
                <path
                  d="M26.6175 24.993C26.4789 25.1429 26.4525 25.2478 26.4525 25.63C26.4525 26.0122 26.4789 26.1172 26.6175 26.267C26.822 26.5069 27.0728 26.5069 27.2773 26.267C27.4159 26.1172 27.4423 26.0122 27.4423 25.63C27.4423 25.2478 27.4159 25.1429 27.2773 24.993C27.1915 24.8881 27.0398 24.8057 26.9474 24.8057C26.855 24.8057 26.7032 24.8881 26.6175 24.993Z"
                  fill="#249B7E"
                />
                <path
                  d="M28.1351 26.0797C27.9899 26.267 27.9305 26.8141 28.0295 27.1438C28.1548 27.571 28.5375 27.6759 28.8477 27.3687C29.0192 27.1963 29.006 26.282 28.8279 26.0797C28.6563 25.8848 28.2934 25.8848 28.1351 26.0797Z"
                  fill="#249B7E"
                />
                <path
                  d="M26.7362 27.4285C26.5317 27.526 26.4525 27.7358 26.4525 28.2004C26.4525 28.725 26.6241 29.0023 26.9474 29.0023C27.2773 29.0023 27.4423 28.725 27.4423 28.178C27.4423 27.8782 27.4093 27.6983 27.3301 27.5934C27.1915 27.4061 26.9342 27.3311 26.7362 27.4285Z"
                  fill="#249B7E"
                />
                <path
                  d="M28.1681 28.6126C27.9635 28.8 27.9042 29.467 28.0625 29.8117C28.2011 30.119 28.5112 30.2014 28.7553 29.9991C28.9071 29.8642 28.9269 29.7892 28.9467 29.3171C28.9599 28.86 28.9467 28.7625 28.8279 28.6276C28.663 28.4403 28.3594 28.4328 28.1681 28.6126Z"
                  fill="#249B7E"
                />
                <path
                  d="M3.06181 16.8993C2.96943 16.9967 2.89685 17.1691 2.89685 17.274C2.89685 17.3789 2.96943 17.5513 3.06181 17.6487C3.20697 17.8211 3.26635 17.8361 3.87339 17.8361C4.66518 17.8361 4.83674 17.7386 4.83674 17.274C4.83674 16.8094 4.66518 16.7119 3.87339 16.7119C3.26635 16.7119 3.20697 16.7269 3.06181 16.8993Z"
                  fill="#249B7E"
                />
                <path
                  d="M5.73409 16.8618C5.52954 17.0941 5.53614 17.4988 5.74729 17.7012C5.85286 17.8136 6.00462 17.8361 6.52588 17.8361C7.07354 17.8361 7.1923 17.8136 7.34406 17.6787C7.5684 17.4763 7.575 17.1466 7.35066 16.8993C7.2055 16.7269 7.14612 16.7119 6.52588 16.7119C5.95183 16.7119 5.84626 16.7344 5.73409 16.8618Z"
                  fill="#249B7E"
                />
                <path
                  d="M8.41297 16.8693C8.18863 17.0717 8.17543 17.4464 8.39317 17.6712C8.53174 17.8211 8.61752 17.8361 9.21796 17.8361C9.98995 17.8361 10.1549 17.7386 10.1549 17.289C10.1549 16.8243 9.96356 16.7119 9.17837 16.7119C8.6835 16.7119 8.56473 16.7344 8.41297 16.8693Z"
                  fill="#249B7E"
                />
                <path
                  d="M3.06177 19.2899C2.9694 19.3648 2.92981 19.4847 2.92981 19.7095C2.92981 20.1742 3.04198 20.2341 3.89315 20.2341C4.57937 20.2341 4.60577 20.2266 4.73773 20.0393C4.81691 19.9269 4.87629 19.7845 4.87629 19.7095C4.87629 19.6346 4.81691 19.4922 4.73773 19.3798C4.60577 19.1924 4.57937 19.185 3.89315 19.185C3.39169 19.185 3.14755 19.2149 3.06177 19.2899Z"
                  fill="#249B7E"
                />
                <path
                  d="M5.70104 19.3348C5.63506 19.4173 5.58228 19.5896 5.58228 19.7095C5.58228 19.8294 5.63506 20.0018 5.70104 20.0842C5.80662 20.2191 5.90559 20.2341 6.53902 20.2341C7.34401 20.2341 7.51556 20.1442 7.51556 19.7095C7.51556 19.2749 7.34401 19.185 6.53902 19.185C5.90559 19.185 5.80662 19.1999 5.70104 19.3348Z"
                  fill="#249B7E"
                />
                <path
                  d="M8.34691 19.3498C8.28752 19.4398 8.24133 19.6046 8.24133 19.7095C8.24133 19.8145 8.28752 19.9793 8.34691 20.0693C8.43928 20.2266 8.49866 20.2341 9.19148 20.2341C10.0361 20.2341 10.1548 20.1667 10.1548 19.6946C10.1548 19.2524 10.0229 19.185 9.17828 19.185C8.49866 19.185 8.43928 19.1999 8.34691 19.3498Z"
                  fill="#249B7E"
                />
                <path
                  d="M3.06181 21.7705C2.96943 21.8679 2.89685 22.0403 2.89685 22.1452C2.89685 22.2501 2.96943 22.4225 3.06181 22.5199C3.20697 22.6923 3.26635 22.7073 3.87339 22.7073C4.66518 22.7073 4.83674 22.6099 4.83674 22.1452C4.83674 21.6806 4.66518 21.5832 3.87339 21.5832C3.26635 21.5832 3.20697 21.5981 3.06181 21.7705Z"
                  fill="#249B7E"
                />
                <path
                  d="M5.74729 21.7106C5.53614 21.9204 5.52954 22.3251 5.73409 22.5574C5.84626 22.6848 5.95183 22.7073 6.52588 22.7073C7.14612 22.7073 7.2055 22.6923 7.35066 22.5199C7.575 22.2726 7.5684 21.9429 7.34406 21.7405C7.1923 21.6056 7.07354 21.5832 6.52588 21.5832C6.00462 21.5832 5.85286 21.6056 5.74729 21.7106Z"
                  fill="#249B7E"
                />
                <path
                  d="M8.3866 21.7555C8.18205 22.0028 8.19525 22.3551 8.41299 22.5499C8.56475 22.6848 8.68352 22.7073 9.17839 22.7073C9.96358 22.7073 10.1549 22.5949 10.1549 22.1227C10.1549 21.6806 9.98997 21.5832 9.21138 21.5832C8.58455 21.5832 8.51856 21.5981 8.3866 21.7555Z"
                  fill="#249B7E"
                />
                <path
                  d="M3.02877 24.2061C2.87701 24.3785 2.86382 24.5659 2.97599 24.8431C3.07496 25.0904 3.18713 25.1129 3.97892 25.0904C4.59916 25.068 4.63875 25.0605 4.76411 24.8656C4.84989 24.7307 4.88288 24.6108 4.84989 24.4834C4.77071 24.1012 4.65854 24.0563 3.87995 24.0563C3.24651 24.0563 3.14754 24.0712 3.02877 24.2061Z"
                  fill="#249B7E"
                />
                <path
                  d="M5.70104 24.206C5.63506 24.2885 5.58228 24.4609 5.58228 24.5808C5.58228 24.7007 5.63506 24.873 5.70104 24.9555C5.80662 25.0904 5.90559 25.1053 6.53902 25.1053C7.34401 25.1053 7.51556 25.0154 7.51556 24.5808C7.51556 24.1461 7.34401 24.0562 6.53902 24.0562C5.90559 24.0562 5.80662 24.0712 5.70104 24.206Z"
                  fill="#249B7E"
                />
                <path
                  d="M8.34696 24.221C8.2018 24.4534 8.21499 24.7756 8.37335 24.9555C8.49212 25.0904 8.59109 25.1053 9.21793 25.1053C10.0361 25.1053 10.1549 25.0379 10.1549 24.5658C10.1549 24.1236 10.0229 24.0562 9.17834 24.0562C8.49872 24.0562 8.43933 24.0712 8.34696 24.221Z"
                  fill="#249B7E"
                />
                <path
                  d="M3.06181 26.6417C2.96943 26.7391 2.89685 26.9115 2.89685 27.0164C2.89685 27.1213 2.96943 27.2937 3.06181 27.3911C3.20697 27.5635 3.26635 27.5785 3.87339 27.5785C4.61899 27.5785 4.77735 27.4961 4.84993 27.0764C4.88292 26.8815 4.85653 26.7991 4.72457 26.6492C4.55961 26.4694 4.51342 26.4544 3.88659 26.4544C3.26635 26.4544 3.20697 26.4694 3.06181 26.6417Z"
                  fill="#249B7E"
                />
                <path
                  d="M5.74729 26.5818C5.53614 26.7916 5.52954 27.1963 5.73409 27.4286C5.84626 27.556 5.95183 27.5785 6.52588 27.5785C7.14612 27.5785 7.2055 27.5635 7.35066 27.3911C7.56181 27.1588 7.5684 26.8366 7.36386 26.6192C7.2253 26.4694 7.13952 26.4544 6.54568 26.4544C6.00462 26.4544 5.85286 26.4769 5.74729 26.5818Z"
                  fill="#249B7E"
                />
                <path
                  d="M8.38653 26.6043C8.17539 26.8291 8.18858 27.2188 8.41292 27.4211C8.56468 27.556 8.68345 27.5785 9.19812 27.5785C9.93052 27.5785 10.1549 27.4436 10.1549 27.0089C10.1549 26.5518 9.9965 26.4544 9.21131 26.4544C8.61747 26.4544 8.5119 26.4769 8.38653 26.6043Z"
                  fill="#249B7E"
                />
                <path
                  d="M3.02873 29.0773C2.85718 29.2722 2.86378 29.527 3.03533 29.7818C3.1739 29.9766 3.18049 29.9841 3.8997 29.9616C4.60572 29.9391 4.63871 29.9316 4.76407 29.7368C4.84985 29.6019 4.88284 29.482 4.84985 29.3546C4.77067 28.9724 4.6585 28.9274 3.87991 28.9274C3.24648 28.9274 3.1475 28.9424 3.02873 29.0773Z"
                  fill="#249B7E"
                />
                <path
                  d="M5.70108 29.0773C5.55592 29.2646 5.55592 29.6468 5.70768 29.8342C5.80665 29.9541 5.91882 29.9766 6.53906 29.9766C7.16589 29.9766 7.26486 29.9616 7.38363 29.8267C7.54199 29.6468 7.55519 29.3246 7.41002 29.0923C7.31765 28.9349 7.25826 28.9274 6.56545 28.9274C5.90562 28.9274 5.80665 28.9424 5.70108 29.0773Z"
                  fill="#249B7E"
                />
                <path
                  d="M8.35355 29.0623C8.20179 29.2496 8.21499 29.6468 8.37335 29.8267C8.48552 29.9541 8.59109 29.9766 9.18493 29.9766C10.0031 29.9766 10.1549 29.8941 10.1549 29.4595C10.1549 28.9948 10.0361 28.9274 9.18493 28.9274C8.5647 28.9274 8.44593 28.9499 8.35355 29.0623Z"
                  fill="#249B7E"
                />
              </svg>

              {/* <MdOutlineCalendarMonth className="text-[#f1d35c] mr-2 h-6 w-6" /> */}
              <p>Subtype</p>
            </div>
            <p className="text-end">{property?.unitType || "NA"}</p>
          </div>
          <hr className="block"></hr>

          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-row items-center">
              {/* <FaMapMarked className="text-[red] mr-2 h-6 w-6" /> */}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 22C11.7667 22 11.5667 21.9333 11.4 21.8C11.2333 21.6667 11.1083 21.4917 11.025 21.275C10.7083 20.3417 10.3083 19.4667 9.825 18.65C9.35833 17.8333 8.7 16.875 7.85 15.775C7 14.675 6.30833 13.625 5.775 12.625C5.25833 11.625 5 10.4167 5 9C5 7.05 5.675 5.4 7.025 4.05C8.39167 2.68333 10.05 2 12 2C13.95 2 15.6 2.68333 16.95 4.05C18.3167 5.4 19 7.05 19 9C19 10.5167 18.7083 11.7833 18.125 12.8C17.5583 13.8 16.9 14.7917 16.15 15.775C15.25 16.975 14.5667 17.975 14.1 18.775C13.65 19.5583 13.275 20.3917 12.975 21.275C12.8917 21.5083 12.7583 21.6917 12.575 21.825C12.4083 21.9417 12.2167 22 12 22ZM12 18.425C12.2833 17.8583 12.6 17.3 12.95 16.75C13.3167 16.2 13.85 15.4667 14.55 14.55C15.2667 13.6167 15.85 12.7583 16.3 11.975C16.7667 11.175 17 10.1833 17 9C17 7.61667 16.5083 6.44167 15.525 5.475C14.5583 4.49167 13.3833 4 12 4C10.6167 4 9.43333 4.49167 8.45 5.475C7.48333 6.44167 7 7.61667 7 9C7 10.1833 7.225 11.175 7.675 11.975C8.14167 12.7583 8.73333 13.6167 9.45 14.55C10.15 15.4667 10.675 16.2 11.025 16.75C11.3917 17.3 11.7167 17.8583 12 18.425ZM12 11.5C12.7 11.5 13.2917 11.2583 13.775 10.775C14.2583 10.2917 14.5 9.7 14.5 9C14.5 8.3 14.2583 7.70833 13.775 7.225C13.2917 6.74167 12.7 6.5 12 6.5C11.3 6.5 10.7083 6.74167 10.225 7.225C9.74167 7.70833 9.5 8.3 9.5 9C9.5 9.7 9.74167 10.2917 10.225 10.775C10.7083 11.2583 11.3 11.5 12 11.5Z"
                  fill="#1D1B20"
                />
              </svg>

              <p>Area</p>
            </div>
            <p className="text-end">{property?.area || "NA"}</p>
          </div>
          <hr className="block"></hr>

          {property?.type !== "Commercial Rent" &&
            property?.type !== "Commercial Sell" && (
              <div>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex flex-row items-center">
                    <FaBed className="text-[#f1d35c] mr-2 h-6 w-6" />
                    <p>Size</p>
                  </div>
                  <p className="text-end">{property?.bhk || "NA"}</p>
                </div>
                <hr className="block"></hr>
              </div>
            )}

          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-row items-center">
              <TbLamp className="text-[#5f8de9] mr-2 h-6 w-6" />
              <p>Condition</p>
            </div>
            <p className="text-end">{property?.furnishedType || "NA"}</p>
          </div>
        </div>

        {/* Second grid of items (conditionally rendered) */}
        {(showMore || !isMobile) && (
          <div className="grid grid-cols-1 gap-2 pl-0 lg:pl-4">
            <hr className="lg:hidden block"></hr>
            {/* <div className="flex items-center justify-between gap-4">
              <div className="flex flex-row items-center">
                <FaBed className="text-[#f1d35c] mr-2 h-6 w-6" />
                <p>Size</p>
              </div>
              <p className="text-end">{property?.bhk || "NA"}</p>
            </div> */}

            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-row items-center">
                <GoHome className="text-[#247d00] mr-2 h-6 w-6" />
                <p>Address</p>
              </div>
              <p className="text-end">{property?.address || "NA"}</p>
            </div>
            <hr className="block"></hr>
            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-row items-center">
                <RxDimensions className="text-[#f1d35c] mr-2 h-6 w-6" />
                <p>Sqft</p>
              </div>
              <p className="text-end">{property?.squareFt || "NA"} sqft</p>
            </div>
            <hr className="block"></hr>

            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-row items-center">
                <IoDocumentTextOutline className="text-[#247d00] mr-2 h-6 w-6" />
                <p>Description</p>
              </div>
              <p className="text-end">
                {showDescMore ? property?.description : truncatedDescription}{" "}
                {isDescriptionTooLong && (
                  <span
                    className="text-blue-600 cursor-pointer hover:underline text-sm"
                    onClick={() => setShowDescMore(!showDescMore)}
                  >
                    {showDescMore ? "Show Less" : "Show More"}
                  </span>
                )}
              </p>
            </div>

            <hr className="block"></hr>
            {/* if we remove this it will remove extra line from mobile but remove one line from laptop view so remove from here but need to add something in mobile view */}
            {/* <div className="flex items-center justify-between gap-4">
              <div className="flex flex-row items-center">
                <TbLamp className="text-[#5f8de9] mr-2 h-6 w-6" />
                <p>Listed By</p>
              </div>
              <p className="text-end">{property?.userType || "NA"}</p>
            </div>
            <hr className="block"></hr> */}
            <div className="lg:flex hidden items-center justify-between gap-4">
              <div className="flex flex-row items-center">
                <MdOutlinePhone className="text-[#503691] mr-2 h-6 w-6" />
                <p>Contact</p>
              </div>

              {!contactInfo ? (
                <button
                  onClick={handleGetContact}
                  className="bg-[#503691] text-white px-4 py-2 rounded-full hover:bg-blue-600"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Get Contact Number"}
                </button>
              ) : (
                <div className="flex items-center justify-between py-2 rounded-lg bg-white text-[#503691]">
                  {/* Contact Name and Number */}
                  <p className="font-medium">
                    {contactInfo?.name || "NA"} - {contactInfo?.number || "NA"}
                  </p>

                  {/* Icons for Phone and WhatsApp */}
                  <div className="flex items-center gap-3">
                    {/* Phone Link */}
                    <a
                      href={`tel:${
                        contactInfo.number?.startsWith("+91")
                          ? contactInfo.number.replace("+91", "").trim()
                          : contactInfo.number || ""
                      }`}
                      className="text-[#503691] hover:underline flex items-center"
                    ></a>

                    {/* WhatsApp Link */}
                    <a
                      href={`https://wa.me/${
                        contactInfo.number?.startsWith("+91")
                          ? contactInfo.number.replace("+91", "").trim()
                          : contactInfo.number || ""
                      }`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:scale-110 transition-transform"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        className="h-8 w-8"
                        fill="#25D366"
                      >
                        <path d="M92.1 254.6c0 24.9 7 49.2 20.2 70.1l3.1 5-13.3 48.6L152 365.2l4.8 2.9c20.2 12 43.4 18.4 67.1 18.4h.1c72.6 0 133.3-59.1 133.3-131.8c0-35.2-15.2-68.3-40.1-93.2c-25-25-58-38.7-93.2-38.7c-72.7 0-131.8 59.1-131.9 131.8zM274.8 330c-12.6 1.9-22.4 .9-47.5-9.9c-36.8-15.9-61.8-51.5-66.9-58.7c-.4-.6-.7-.9-.8-1.1c-2-2.6-16.2-21.5-16.2-41c0-18.4 9-27.9 13.2-32.3c.3-.3 .5-.5 .7-.8c3.6-4 7.9-5 10.6-5c2.6 0 5.3 0 7.6 .1c.3 0 .5 0 .8 0c2.3 0 5.2 0 8.1 6.8c1.2 2.9 3 7.3 4.9 11.8c3.3 8 6.7 16.3 7.3 17.6c1 2 1.7 4.3 .3 6.9c-3.4 6.8-6.9 10.4-9.3 13c-3.1 3.2-4.5 4.7-2.3 8.6c15.3 26.3 30.6 35.4 53.9 47.1c4 2 6.3 1.7 8.6-1c2.3-2.6 9.9-11.6 12.5-15.5c2.6-4 5.3-3.3 8.9-2s23.1 10.9 27.1 12.9c.8 .4 1.5 .7 2.1 1c2.8 1.4 4.7 2.3 5.5 3.6c.9 1.9 .9 9.9-2.4 19.1c-3.3 9.3-19.1 17.7-26.7 18.8zM448 96c0-35.3-28.7-64-64-64H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96zM148.1 393.9L64 416l22.5-82.2c-13.9-24-21.2-51.3-21.2-79.3C65.4 167.1 136.5 96 223.9 96c42.4 0 82.2 16.5 112.2 46.5c29.9 30 47.9 69.8 47.9 112.2c0 87.4-72.7 158.5-160.1 158.5c-26.6 0-52.7-6.7-75.8-19.3z" />
                      </svg>
                    </a>
                  </div>
                </div>
              )}
            </div>
            {/* Remark Section */}
            {contactInfo && (
              <div>
                {" "}
                <hr className="block"></hr>
                <div className="lg:flex hidden items-center justify-between gap-4 mt-4">
                  <div className="flex flex-row items-center">
                    <MdNoteAlt className="text-[#503691] mr-2 h-6 w-6" />
                    <p>Remark</p>
                  </div>
                  <div className="flex items-center justify-between py-2 rounded-lg bg-white text-[#503691]">
                    {isEditing ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={remark}
                          onChange={(e) => setRemark(e.target.value)}
                          className="border p-2 rounded w-full"
                        />
                        <AiOutlineCheck
                          className="text-green-500 cursor-pointer"
                          onClick={handleSaveRemark}
                        />
                        <AiOutlineClose
                          className="text-red-500 cursor-pointer"
                          onClick={handleCancelEdit}
                        />
                      </div>
                    ) : (
                      <div className="flex items-center justify-between gap-2">
                        <p>{remark || "Add a remark"}</p>
                        <button
                          className="text-blue-500 hover:underline"
                          onClick={() => setIsEditing(true)}
                        >
                          Edit
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Show More/Less Button */}
      <div className="flex lg:hidden justify-start cursor-pointer text-md mb-2">
        <p
          onClick={() => setShowMore(!showMore)}
          className="text-blue-800 font-bold"
        >
          {isMobile && showMore ? "Show Less" : "Show More..."}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row lg:hidden justify-between gap-2">
        <div className="grid grid-cols-2 gap-2">
          <div
            className="flex flex-row items-center gap-2 h-fit hover:bg-white bg-[#503691] border border-[#503691] text-white hover:text-[#503691] px-6 py-1.5 rounded-lg cursor-pointer"
            onClick={() => handleShareClick(property)}
          >
            <FaShareAlt className="h-4 w-4" />
            Share
          </div>
          <div
            className={`flex flex-row items-center gap-2 h-fit ${
              isSaved
                ? "bg-white text-[#503691]"
                : "bg-white text-[#503691] hover:bg-[#503691] hover:text-white"
            } border border-[#503691] px-6 py-1.5 rounded-lg cursor-pointer`}
            onClick={handleSaveClick}
          >
            {isSaved ? (
              <FaBookmark className="h-4 w-4" />
            ) : (
              <FaRegBookmark className="h-4 w-4" />
            )}
            {isSaved ? "Unsave" : "Save"}
          </div>
        </div>
      </div>

      <div className="flex lg:hidden items-center justify-between mt-3 gap-4">
        {contactInfo ? (
          <div className="w-full px-2 py-2 rounded-lg mb-2 bg-white border border-[#503691] text-[#503691] flex justify-between items-center">
            {/* Name */}
            <div>
              <p className="font-semibold">{contactInfo?.name || "NA"}</p>
            </div>

            {/* Contact Number with WhatsApp */}
            <div className="flex items-center gap-4">
              {/* Phone Number */}
              <a
                href={`tel:${
                  contactInfo.number?.startsWith("+91")
                    ? contactInfo.number.replace("+91", "").trim()
                    : contactInfo.number || ""
                }`}
                className="text-[#503691] hover:underline flex items-center gap-1"
              >
                <MdOutlinePhone className="text-[#503691] h-5 w-5" />
                <span className="text-sm font-medium">
                  {contactInfo.number || "NA"}
                </span>
              </a>

              {/* WhatsApp Icon */}
              <a
                href={`https://wa.me/${
                  contactInfo.number?.startsWith("+91")
                    ? contactInfo.number.replace("+91", "").trim()
                    : contactInfo.number || ""
                }`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#25D366] hover:text-green-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="h-8 w-8"
                  fill="#25D366"
                >
                  <path d="M92.1 254.6c0 24.9 7 49.2 20.2 70.1l3.1 5-13.3 48.6L152 365.2l4.8 2.9c20.2 12 43.4 18.4 67.1 18.4h.1c72.6 0 133.3-59.1 133.3-131.8c0-35.2-15.2-68.3-40.1-93.2c-25-25-58-38.7-93.2-38.7c-72.7 0-131.8 59.1-131.9 131.8zM274.8 330c-12.6 1.9-22.4 .9-47.5-9.9c-36.8-15.9-61.8-51.5-66.9-58.7c-.4-.6-.7-.9-.8-1.1c-2-2.6-16.2-21.5-16.2-41c0-18.4 9-27.9 13.2-32.3c.3-.3 .5-.5 .7-.8c3.6-4 7.9-5 10.6-5c2.6 0 5.3 0 7.6 .1c.3 0 .5 0 .8 0c2.3 0 5.2 0 8.1 6.8c1.2 2.9 3 7.3 4.9 11.8c3.3 8 6.7 16.3 7.3 17.6c1 2 1.7 4.3 .3 6.9c-3.4 6.8-6.9 10.4-9.3 13c-3.1 3.2-4.5 4.7-2.3 8.6c15.3 26.3 30.6 35.4 53.9 47.1c4 2 6.3 1.7 8.6-1c2.3-2.6 9.9-11.6 12.5-15.5c2.6-4 5.3-3.3 8.9-2s23.1 10.9 27.1 12.9c.8 .4 1.5 .7 2.1 1c2.8 1.4 4.7 2.3 5.5 3.6c.9 1.9 .9 9.9-2.4 19.1c-3.3 9.3-19.1 17.7-26.7 18.8zM448 96c0-35.3-28.7-64-64-64H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96zM148.1 393.9L64 416l22.5-82.2c-13.9-24-21.2-51.3-21.2-79.3C65.4 167.1 136.5 96 223.9 96c42.4 0 82.2 16.5 112.2 46.5c29.9 30 47.9 69.8 47.9 112.2c0 87.4-72.7 158.5-160.1 158.5c-26.6 0-52.7-6.7-75.8-19.3z" />
                </svg>
              </a>
            </div>
          </div>
        ) : (
          <button
            onClick={handleGetContact}
            className="w-full px-2 py-1 rounded-lg mb-2 hover:bg-white bg-[#503691] border border-[#503691] text-white hover:text-[#503691]"
            disabled={loading}
          >
            {loading ? "Loading..." : "Get Contact Number"}
          </button>
        )}
      </div>
      {/* Remark Section for Mobile View */}
      {contactInfo && (
        <div className="lg:hidden">
          {/* <div className="flex  gap-4">
              <div className="flex flex-row items-center">
                <RxDimensions className="text-[#f1d35c] mr-2 h-6 w-6" />
                <p>Sqft</p>
              </div>
              <p className="text-end">{property?.squareFt || "NA"} sqft</p>
            </div> */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-row items-center">
              <MdNoteAlt className="text-[#503691] mr-2 h-5 w-5" />
              <p className="text-sm font-medium text-[#503691]">Remark</p>
            </div>
            <div className="flex flex-col gap-2 bg-white p-3">
              {isEditing ? (
                <div className="flex flex-row gap-2 items-center">
                  <input
                    type="text"
                    value={remark}
                    onChange={(e) => setRemark(e.target.value)}
                    className="border border-gray-300 rounded p-2 w-full text-sm focus:outline-none focus:ring-1 focus:ring-[#503691]"
                    placeholder="Enter your remark here"
                  />
                  <AiOutlineCheck
                    className="text-green-500 cursor-pointer"
                    onClick={handleSaveRemark}
                  />
                  <AiOutlineClose
                    className="text-red-500 cursor-pointer"
                    onClick={handleCancelEdit}
                  />
                  {/* <div className="flex justify-end gap-2">
                    <button
                      className="px-4 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
                      onClick={handleSaveRemark}
                    >
                      Save
                    </button>
                    <button
                      className="px-4 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </button>
                  </div> */}
                </div>
              ) : (
                <div className="flex flex-row gap-2">
                  <p className="text-sm text-gray-600">
                    {remark || "No remarks added yet."}
                  </p>
                  <button
                    className="text-sm text-blue-500 hover:underline self-end"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PropertyCard;
