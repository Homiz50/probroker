// ModalContent.js
import React from "react";
import {} from "@fortawesome/free-regular-svg-icons";
import {
  faCircleQuestion,
  faCrown,
  faSortDown,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Premium.css";

const ModalContent = ({ text, planChangeHandler }) => {
  return (
    <div>
      {/* <p>{text}</p> */}
      <div className="badgeBox">
        <div className="popularBadge">Subscribe to prime</div>
        <div className="downArrow">
          <FontAwesomeIcon icon={faSortDown} />
        </div>
      </div>
      <div className="basicPlanBox" id="kingPlanBoxId">
        {/* <FontAwesomeIcon
          className="crownSection"
          style={{ pointerEvents: "none", color: "#ffc107" }}
          icon={faCrown}
        /> */}
        <div className="cardHeading">
          <span style={{ fontSize: "30px" }}>₹ 3500</span> /{" "}
          <span style={{ fontSize: "15px" }}>6 months validity</span>
        </div>
        <div className="speapretor"></div>
        {/* <div className="cardDescription text-center">
          Unlock more options and flexibility for the best results & search
          experience
        </div> */}
        {/* <div className="priceBox">
          <span style={{ fontSize: "25px" }}>₹</span>
          <span>999</span>
        </div> */}
        <div className="cardFeatures">
          <div
            className="featureTitle text-center1"
            style={{ color: "#ffc107" }}
          >
            Benefits:
          </div>
          <div className="featureContent">
            <div className="d-flex text-center1">
              <svg
                data-v-165629f9
                data-v-9c16c3cc
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 12 24"
                aria-label="check"
                role="presentation"
                className="h-icon-success"
                style={{
                  width: "12px",
                  height: "24px",
                  fill: "#fff",
                  marginRight: "8px",
                }}
              >
                <g data-v-165629f9>
                  <path
                    data-v-165629f9
                    d="M12 8.758a.694.694 0 0 1-.217.515l-5.605 5.485-1.053 1.03A.725.725 0 0 1 4.6 16a.724.724 0 0 1-.527-.212l-1.053-1.03-2.803-2.743A.694.694 0 0 1 0 11.5c0-.202.072-.374.217-.515l1.053-1.03a.725.725 0 0 1 .526-.213c.207 0 .382.071.527.213L4.6 12.19l5.078-4.977c.14-.14.33-.216.527-.212.206 0 .382.07.526.212l1.053 1.03c.142.134.22.321.217.516Z"
                  ></path>
                </g>
              </svg>
              <div className="featureContent-text">Unlimited access </div>
            </div>
          </div>
          <div className="featureContent">
            <div className="d-flex">
              <svg
                data-v-165629f9
                data-v-9c16c3cc
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 12 24"
                aria-label="check"
                role="presentation"
                className="h-icon-success"
                style={{
                  width: "12px",
                  height: "24px",
                  fill: "#fff",
                  marginRight: "8px",
                }}
              >
                <g data-v-165629f9>
                  <path
                    data-v-165629f9
                    d="M12 8.758a.694.694 0 0 1-.217.515l-5.605 5.485-1.053 1.03A.725.725 0 0 1 4.6 16a.724.724 0 0 1-.527-.212l-1.053-1.03-2.803-2.743A.694.694 0 0 1 0 11.5c0-.202.072-.374.217-.515l1.053-1.03a.725.725 0 0 1 .526-.213c.207 0 .382.071.527.213L4.6 12.19l5.078-4.977c.14-.14.33-.216.527-.212.206 0 .382.07.526.212l1.053 1.03c.142.134.22.321.217.516Z"
                  ></path>
                </g>
              </svg>
              <div className="featureContent-text">Priority support</div>
            </div>
          </div>
          <div className="featureContent">
            <div className="d-flex">
              <svg
                data-v-165629f9
                data-v-9c16c3cc
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 12 24"
                aria-label="check"
                role="presentation"
                className="h-icon-success"
                style={{
                  width: "12px",
                  height: "24px",
                  fill: "#fff",
                  marginRight: "8px",
                }}
              >
                <g data-v-165629f9>
                  <path
                    data-v-165629f9
                    d="M12 8.758a.694.694 0 0 1-.217.515l-5.605 5.485-1.053 1.03A.725.725 0 0 1 4.6 16a.724.724 0 0 1-.527-.212l-1.053-1.03-2.803-2.743A.694.694 0 0 1 0 11.5c0-.202.072-.374.217-.515l1.053-1.03a.725.725 0 0 1 .526-.213c.207 0 .382.071.527.213L4.6 12.19l5.078-4.977c.14-.14.33-.216.527-.212.206 0 .382.07.526.212l1.053 1.03c.142.134.22.321.217.516Z"
                  ></path>
                </g>
              </svg>
              <div className="featureContent-text">Daily new leads update</div>
            </div>
          </div>
          <div className="featureContent">
            <div className="d-flex">
              <svg
                data-v-165629f9
                data-v-9c16c3cc
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 12 24"
                aria-label="check"
                role="presentation"
                className="h-icon-success"
                style={{
                  width: "12px",
                  height: "24px",
                  fill: "#fff",
                  marginRight: "8px",
                }}
              >
                <g data-v-165629f9>
                  <path
                    data-v-165629f9
                    d="M12 8.758a.694.694 0 0 1-.217.515l-5.605 5.485-1.053 1.03A.725.725 0 0 1 4.6 16a.724.724 0 0 1-.527-.212l-1.053-1.03-2.803-2.743A.694.694 0 0 1 0 11.5c0-.202.072-.374.217-.515l1.053-1.03a.725.725 0 0 1 .526-.213c.207 0 .382.071.527.213L4.6 12.19l5.078-4.977c.14-.14.33-.216.527-.212.206 0 .382.07.526.212l1.053 1.03c.142.134.22.321.217.516Z"
                  ></path>
                </g>
              </svg>
              <div className="featureContent-text">validity - 6 months </div>
            </div>
          </div>
          {/* Other featureContent elements */}
        </div>
        <Button
          className="continueButton"
          style={{
            backgroundColor: "#ffc107",
            color: "#fff",
            textDecoration: "none",
            fontSize: "20px",
          }}
        >
          <a
            href="https://rzp.io/l/gnUsNqYRxj"
            target="_self"
            rel="noopener noreferrer"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            Continue to pay
          </a>
        </Button>

        {/* <button
          className="continueButton"
          style={{ backgroundColor: "#ffc107" }}
          onClick={() => planChangeHandler(PLANS.KING)}
        >
          Continue
        </button> */}
      </div>
    </div>
  );
};

export default ModalContent;
