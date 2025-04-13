import React, { useState } from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css"; // Ensure to import styles

const CustomRangeSlider = ({ min = 0, max = 10000, step = 100, rangeValues,setRangeValues, onChange }) => {
  
    const handleInput = (values) => {
      let [newMin, newMax] = values;
  
      // Ensure the minimum 50 difference rule
      if (newMax - newMin < step) {
        if (newMax <= rangeValues[0]) {
          newMax = newMin + step;
        } else {
          newMin = newMax - step;
        }
      }
  
      // Additional constraints
      if (newMin <= min) {
        newMin = min;
        newMax = Math.max(newMax, step); // max should be at least 50 if min is 0
      }
  
      if (newMax >= max) {
        newMax = max;
        newMin = Math.min(newMin, max-step); // min should be at most 250 if max is 300
      }
  
      setRangeValues([newMin, newMax]);
       // Call the onChange handler if provided
       if (onChange) {
        onChange([newMin, newMax]);
      }
    };

  return (
    <div>
    <div className="flex flex-row justify-between text-sm mb-2">
      <p>Min Sqft: {rangeValues[0]}</p>
      <p>Max Sqft: {rangeValues[1]}</p>
    </div>
      <RangeSlider
        min={min}
        max={max}
        value={rangeValues}
        onInput={handleInput}
      />
    </div>
  );
};

export default CustomRangeSlider;