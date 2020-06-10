import React from 'react';
import WheelSpot from './WheelSpot';

const WheelSpots = (props) => {
  return (
    <div className="wheel__spots">
      {props.spots.map((spot) => 
        <WheelSpot key = {spot._id} spot = {spot} wheel = {props.wheel} user = {props.user}/>)}
    </div>
  )
};

export default WheelSpots;