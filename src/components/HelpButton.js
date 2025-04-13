import React from "react";
import "./HelpButton.css";

const HelpButton = () => {
  return (
    <div className="help-button">
      <a
        href="https://api.whatsapp.com/send?phone=+918141817353&text=Hii"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="help-icon">
          <img src="./image/image 43.png" alt="WhatsApp Icon" />
          <span>Help</span>
        </div>
      </a>
    </div>
  );
};

export default HelpButton;
