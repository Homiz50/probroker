import React, { useState } from "react";
import axios from "axios";

const SuggestionModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    suggestion: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace with your API endpoint
      await axios.post(
        `https://auth.probroker.in/cjidnvij/ceksfbuebijn/user/fkjdbv/submit-suggestion/eijfbidb`,
        formData
      );
      alert("Thank you for your suggestion!");
      onClose();
    } catch (error) {
      console.error("Error submitting suggestion:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-lg max-w-md w-full relative">
        {/* Close Icon */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-black-2000 hover:text-gray-2000"
          aria-label="Close"
        >
          &times;
        </button>

        <h2 className="text-lg font-bold mb-4">Submit a Suggestion</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full p-2 mb-2 border rounded"
            required
          />
          <input
            type="tel"
            name="number"
            value={formData.number}
            onChange={handleChange}
            placeholder="Your Number"
            className="w-full p-2 mb-2 border rounded"
            required
          />
          <textarea
            name="suggestion"
            value={formData.suggestion}
            onChange={handleChange}
            placeholder="Your Suggestion"
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 bg-gray-500 text-white rounded"
            >
              Close
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SuggestionModal;
