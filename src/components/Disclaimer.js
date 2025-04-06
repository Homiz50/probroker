import React from "react";

const Disclaimer = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">
          Disclaimer
        </h1>
        <div className="space-y-4 text-gray-700">
          <p>
            <b>Effective Date:</b> July, 01, 2024 <br /> <br />
            PRObroker, a product of Vocal Connect Pvt Ltd ("we," "our," or
            "us"), provides property-related data and services to brokers and
            property owners. While we strive to ensure the accuracy and
            reliability of the information available on our platform, we make no
            guarantees, representations, or warranties, expressed or implied,
            regarding the following:
          </p>
          <div className="space-y-4">
            <p>
              <ol className="list-decimal pl-10 space-y-2">
                <li>
                  <b>Accuracy of Data</b>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>
                      Property data displayed on PRObroker is collected from
                      publicly available sources or provided by users. Although
                      we verify details to the best of our ability, we cannot
                      guarantee the absolute accuracy, completeness, or
                      timeliness of the data.
                    </li>
                    <li>
                      Users are advised to independently verify property
                      information before making any decisions or commitments.
                    </li>
                  </ul>
                </li>
                <li>
                  <b>No Endorsement or Guarantee</b>
                </li>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>
                    PRObroker does not endorse or guarantee any property,
                    broker, or transaction conducted through the platform. All
                    transactions are carried out at the sole discretion and risk
                    of the parties involved.
                  </li>
                  <li>
                    We do not mediate disputes between users, property owners,
                    or brokers.
                  </li>
                </ul>
                <li>
                  <b>Limitation of Liability</b>
                </li>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>
                    PRObroker and Vocal Connect Pvt Ltd shall not be held liable
                    for any direct, indirect, incidental, consequential, or
                    punitive damages arising out of:
                  </li>
                  <ul className="pl-5 mt-1 space-y-2">
                    <li className="relative">
                      <span className="absolute left-0 -ml-4 h-2 w-2 bg-gray-500 rounded-full mt-1"></span>
                      Errors or omissions in property data.
                    </li>
                    <li className="relative">
                      <span className="absolute left-0 -ml-4 h-2 w-2 bg-gray-500 rounded-full mt-1"></span>
                      Reliance on any information provided on the platform.
                    </li>
                    <li className="relative">
                      <span className="absolute left-0 -ml-4 h-2 w-2 bg-gray-500 rounded-full mt-1"></span>
                      Use or inability to use the platform.
                    </li>
                  </ul>
                </ul>
                <li>
                  <b>User Responsibility</b>
                </li>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>
                    Users are responsible for ensuring that their use of the
                    platform complies with applicable laws and regulations.
                  </li>
                  <li>
                    Any reliance on data or information from PRObroker is solely
                    at the user's own risk.
                  </li>
                </ul>
                <li>
                  <b>No Professional Advice</b>
                </li>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>
                    The information provided on PRObroker does not constitute
                    legal, financial, or real estate advice. Users should seek
                    independent professional advice as needed before engaging in
                    transactions.
                  </li>
                </ul>
                <li>
                  <b>External Links</b>
                </li>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>
                    PRObroker may include links to third-party websites for
                    informational purposes. We are not responsible for the
                    content, accuracy, or privacy practices of such external
                    websites.
                  </li>
                </ul>
                <li>
                  <b>Service Availability</b>
                </li>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>
                    We strive to maintain uninterrupted access to the platform.
                    However, we do not guarantee continuous, error-free, or
                    secure access and are not responsible for interruptions or
                    delays caused by technical issues or external factors.
                  </li>
                </ul>
                <li>
                  <b>Changes to the Platform</b>
                </li>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>
                    PRObroker reserves the right to modify, update, or
                    discontinue any part of the platform or its services without
                    prior notice.
                  </li>
                </ul>
              </ol>
            </p>
          </div>
          <div>
            <p>
              <strong className="text-xl">Governing Law</strong>
              <br />
              This Disclaimer is governed by the laws of India. Any disputes
              shall be resolved in the courts of Ahmedabad, Gujarat.
            </p>
            <p>
              <strong className="text-xl">Contact Us</strong>
              <br />
              For any concerns or queries, please contact us at:
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
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;
