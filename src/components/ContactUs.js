import React from "react";

const ContactUs = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">
          Contact Us
        </h1>

        <div className="space-y-4">
          <p>
            <br />
            We’re here to help! For any inquiries, support, or feedback, feel
            free to reach out to us. Our team is dedicated to assisting you
            promptly and effectively. <br />
            <br />
            <strong className="text-xl">Contact Information</strong>
            <ul className="list-disc pl-10 mt-1 space-y-1">
              <li>
                <b>Email: </b>
                contact@probroker.in
              </li>
              <li>
                <b>Phone:</b> 9316066832
              </li>
              <li>
                <b>Address:</b> A-10, KCG Campus, University Area, Opp L.D
                College of Engineering, Navrangpura, Ahmedabad 380009
              </li>
            </ul>
            <br />
            <strong className="text-xl">Office Hours</strong>
            <ul className="list-disc pl-10 mt-1 space-y-1">
              <li>
                <b>Monday to Friday:</b>
                9:00 AM - 6:00 PM
              </li>
              <li>
                <b>Saturday:</b>10:00 AM - 2:00 PM
              </li>
              <li>
                <b>Sunday:</b> Closed
              </li>
            </ul>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
