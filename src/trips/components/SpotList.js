import React from 'react';

import './SpotList.css'
import Spot from './Spot';

const SpotList = (props) => {
  return (
    <div className = "spotlist">
      {props.trip.spots.map((spot) => <Spot spot = {spot} key = {spot._id}></Spot>)}
    </div>
  );
};

export default SpotList;