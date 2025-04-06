import React from "react";

const AboutUs = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">About Us</h1>
        <div className="space-y-4 text-gray-700">
          <p>
            Welcome to PRObroker, a product of Vocal Connect Pvt Ltd. We are a
            technology-driven platform dedicated to simplifying property
            transactions by bridging the gap between property owners and brokers
            in Ahmedabad and Gandhinagar.
          </p>

          <div className="space-y-4">
            <p>
              <strong className="text-xl">Our Mission</strong>
              <br />
              Our mission is to empower brokers with reliable, verified property
              data while providing property owners with a trusted medium to
              connect with professionals. We aim to revolutionize the real
              estate industry by fostering transparency, efficiency, and ease of
              access to property information.
            </p>
          </div>
          <div className="space-y-4">
            <p>
              <strong className="text-xl">Who We Are</strong>
              <br />
              Vocal Connect Pvt Ltd, the parent company of PRObroker, is
              committed to creating innovative solutions that address real-world
              problems. PRObroker was conceptualized to tackle the challenges
              brokers face in finding genuine property leads while ensuring
              property owners have a seamless way to list their properties.
            </p>
          </div>
          <div className="space-y-4">
            <p>
              <strong className="text-xl">What We Offer</strong>
              <br />
              <ul className="list-disc pl-10 mt-1 space-y-1">
                <li>
                  <b>Verified Property Data:</b>
                  We provide brokers with access to an extensive database of
                  verified property listings.{" "}
                </li>
                <li>
                  <b>AI-Driven Platform:</b> Leveraging technology, we ensure
                  accurate, up-to-date property information.
                </li>
                <li>
                  <b>No Middlemen:</b> We eliminate unnecessary brokerage and
                  ensure direct connections between property owners and brokers.
                </li>
                <li>
                  <b>Custom Solutions:</b> Designed to cater to both individual
                  brokers and agencies.
                </li>
              </ul>
            </p>
          </div>

          <div className="space-y-4">
            <p>
              <strong className="text-xl">Why Choose Us</strong>
              <br />
              <ul className="list-disc pl-10 mt-1 space-y-1">
                <li>
                  <b>Reliable Data:</b>
                  All property details are verified by our dedicated team.
                </li>
                <li>
                  <b>User-Friendly Platform:</b>
                  Easy-to-navigate interface designed for efficiency.
                </li>
                <li>
                  <b>Transparency:</b>
                  Clear and honest practices to ensure trust and credibility.
                </li>
              </ul>
            </p>
          </div>
          <div className="space-y-4">
            <p>
              <strong className="text-xl">Our Vision</strong>
              <br />
              To become the leading platform for brokers and property owners in
              India, enabling seamless property transactions and fostering
              growth in the real estate sector.
              <br />
              <br />
              For more information, feel free to reach out to us via our Contact
              Us page.
            </p>
          </div>
          <div className="space-y-4">
            <p>
              <strong className="text-xl">Contact Us</strong>
              <br />
              We’re here to help! For any inquiries, support, or feedback, feel
              free to reach out to us. Our team is dedicated to assisting you
              promptly and effectively.{" "}
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

export default AboutUs;
