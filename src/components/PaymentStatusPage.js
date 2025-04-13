import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "./checkout.css";

const PaymentStatusPage = () => {
  return (
    <div className="checkoutBody">
      <main>
        <div className="checkoutCard">
          <div className="checkoutCard-body">
            <div className="checkoutCard-title">Payment Successful</div>
            <span className="text-center">
              Your payment has been successfully processed. Thank you for
              choosing our services.
            </span>
            {/* <div className="checkoutCard-subtitle">Order Summary</div> */}
            <div className="checkout-card-status-wrapper">
              <FontAwesomeIcon icon={faCircleCheck} size="6x" color="green" />
            </div>
            <div className="checkoutCard-text">
              Please wait for 10 minutes we're adding credits to your account ,
              For instant credits you can contact our team click below button to
              get instant help
            </div>
            <div className="checkoutCard-plan">
              <div className="checkoutCard-plan-img">
                <FontAwesomeIcon icon={faUser} />
              </div>
              <div className="checkoutCard-plan-text">
                <div className="checkoutCard-plan-title">Prime</div>
                <div className="checkoutCard-plan-price">Rs 3500</div>
              </div>
            </div>
            <div className="checkoutCard-payment-button">
              <a href="/">
                <button>See Properties</button>
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PaymentStatusPage;
