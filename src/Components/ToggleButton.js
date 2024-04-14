// ToggleButton.js

import React, { useState } from 'react';
import './toggle.css';

const ToggleButton = () => {
  const [showOnlyVeg, setShowOnlyVeg] = useState(false);
  const toggleHandler = () => {
    setShowOnlyVeg(prevState => !prevState);
  };

  return (
    <div className={`toggle-container ${showOnlyVeg ? '' : ''}`}>
      <input type="check" id="toggle" className="toggle-checkbox" onChange={toggleHandler} />
      <label htmlFor="toggle" className="toggle-label"></label>
    </div>
  );
};

export default ToggleButton;
