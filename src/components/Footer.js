import React from "react";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faPhoneAlt,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <img
            src="./image/Group 427319319.png"
            alt="Probroker"
            className="footer-logo"
          />
          <p className="tagline">
            #1 B2B platform for brokers in <br />
            Ahmedabad {" "}
          </p>
          <div className="social-icons">
            <a href="#">
              <img src="./image/face book.png" alt="Facebook" />
            </a>
            <a href="https://www.instagram.com/probroker.in/">
              <img src="./image/twitter.png" alt="Twitter" />
            </a>
            <a href="">
              <img src="./image/instagram.png" alt="Instagram" />
            </a>
            <a href="https://www.youtube.com/@probroker.in_official">
              <img src="./image/youtub.png" alt="YouTube" />
            </a>
          </div>
        </div>

        <div className="footer-middle">
         <h3 className=" w-[28%] ">Contact</h3>
          <div className="icon-set">
            <FontAwesomeIcon className="icons" icon={faMapMarkerAlt} />
            <p className="middle-text">
              A-10, KCG campus, university area opp Ld college, Navrangpura
              380009
            </p>
          </div>
          <div className="icon-set">
            <FontAwesomeIcon className="icons1" icon={faPhoneAlt} />
            <p className="middle-text">+91-8141817353</p>
          </div>
          <div className="icon-set">
            <FontAwesomeIcon className="icons2" icon={faClock} />
            <p className="middle-text"> Working Hours: 10pm To 7pm</p>
          </div>
        </div>

        <div className="footer-useful-links">
          <h3 className="font-bold border-b border-white w-[45%]">
            Useful Links
          </h3>
          <ul className="useful-links-list">
            <li>
              <a href="/about-us">About Us</a>
            </li>
            <li>
              <a href="/disclaimer">Disclaimer</a>
            </li>
            <li>
              <a href="/privacy-policy">Privacy Policy</a>
            </li>
            <li>
              <a href="/terms-and-condition">Terms and Condition</a>
            </li>
            <li>
              <a href="/contact-us">Contact Us</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-wave">
          <p>© 2025 All rights reserved - Vocal Connect Pvt Ltd.</p>
          <img src="./image/Frame 28.png" alt="Footer Image" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;

// import React from "react";
// import "./Footer.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faMapMarkerAlt,
//   faPhoneAlt,
//   faClock,
// } from "@fortawesome/free-solid-svg-icons";

// const Footer = () => {
//   return (
//     <footer className="footer">
//       <div className="footer-container">
//         <div className="footer-left">
//           <img
//             src="./image/Group 427319319.png"
//             alt="Probroker"
//             className="footer-logo"
//           />
//           <p className="tagline">
//             #1 B2C platform for brokers in <br />
//             Ahmedabad & Gandhinagar{" "}
//           </p>
//           <div className="social-icons">
//             <a href="#">
//               <img src="./image/face book.png" alt="Facebook" />
//             </a>
//             <a href="https://www.instagram.com/probroker.in/">
//               <img src="./image/twitter.png" alt="Twitter" />
//             </a>
//             <a href="">
//               <img src="./image/instagram.png" alt="Instagram" />
//             </a>
//             <a href="https://www.youtube.com/@probroker.in_official">
//               <img src="./image/youtub.png" alt="YouTube" />
//             </a>
//           </div>
//         </div>
//         <div className="footer-middle">
//           <h3>Contact</h3>
//           <div className="icon-set">
//             <FontAwesomeIcon className="icons" icon={faMapMarkerAlt} />
//             <p className="middle-text">
//               A-10, KCG campus, university area opp ld college, Navrangpura
//               380009
//             </p>
//           </div>
//           <div className="icon-set">
//             <FontAwesomeIcon className="icons1" icon={faPhoneAlt} />
//             <p className="middle-text">8141817353 , 9316066832</p>
//           </div>
//           <div className="icon-set">
//             <FontAwesomeIcon className="icons1" icon={faClock} />
//             <p className="middle-text"> Working Hours: 12pm To 7pm</p>
//           </div>
//         </div>
//         <div className="footer-right">
//           <p>
//             {/* <ul> */}
//             Now available in Ahmedabad & Gandhinagar
//             {/* </ul> */}
//           </p>
//           {/* <div className="footer-image">
//             <img src="./image/Apartment (traced).png" alt="Footer Image" />
//           </div> */}
//         </div>
//       </div>
//       <div className="footer-bottom">
//         <div className="footer-wave">
//           <p>© 2024 All rights reserved - PRObroker Ventures</p>
//           <img src="./image/Frame 28.png" alt="Footer Image" />
//           {/* <p>© 2023 All rights reserved - Vocal Connect Pvt Ltd</p> */}
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
