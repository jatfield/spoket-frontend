import React from 'react';

import './LoadingSpinner.css';
import logo from '../images/icons8-wheel-96.png'

const LoadingSpinner = () => {
  return (
    <div className = "spinner" >
      <img src = {logo} className = "spinner__image" alt = "logo" />
    </div>
  );
};

export default LoadingSpinner;