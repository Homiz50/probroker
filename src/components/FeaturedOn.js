import React from "react";
import "./FeaturedOn.css"; // Assuming you are using a separate CSS file

const FeaturedOn = () => {
  // const mediaSources = [
  //   { name: "Bombay Times", image: "./image/bombay-time.png" },
  //   { name: "Google News", image: "./image/google-news.png" },
  //   { name: "Daily Hunt", image: "./image/aily-hunt.png" },
  //   { name: "Ahmedabad Mirror", image: "./image/ISN.png" },
  //   { name: "Indian Startup News", image: "./image/ahmedabad-mirro.png" },
  //   { name: "Investopedia", image: "./image/investopedia.png" },
  // ];

  return (
    <div className="featured-on-section">
      {/* <h2 className="featured-title">Featured on</h2>
      <div className="featured-grid">
        {mediaSources.map((source, index) => (
          <div key={index} className="featured-item">
            <p className="featured-name">{source.name}</p>
            <img
              src={source.image}
              alt={source.name}
              className="featured-image"
            />
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default FeaturedOn;
