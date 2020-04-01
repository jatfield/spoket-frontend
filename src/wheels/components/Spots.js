import React from 'react';
import Spot from './Spot';

const Spots = (props) => {
  return (
    <React.Fragment>
    <div className="wheel__spots">
      {props.wheel.trip.spots.map((spot) => 
        <Spot key = {spot._id} spot = {spot} wheel = {props.wheel} user = {props.user}/>)}
    </div>

    </React.Fragment>
  )
};

export default Spots;