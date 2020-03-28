import React, { useState } from 'react';
import TripMap from './TripMap';
import './Trip.css'
import { useFetch } from '../../hooks/request-hook';

const Trip = (props) => {

  const {sendRequest} = useFetch();
  const [applied, setApplied] = useState(false)

  const trip = props.trip;
  const userId = props.user ? props.user.spoketId : "";
  let inWheel = !!trip.participants.find((p) => p.rider === userId);
  const participation = {"open": "nyílt", "invitational": "meghívásos", "approval": "jóváhagyásos"}
  
  const handleApply = async () => {
    try {
      await sendRequest(`${process.env.REACT_APP_API_SERVER}/api/trips/application/${trip._id}`, 'POST', null, {'Authentication': `token ${props.user.fbToken}`});
    } catch (error) {
      
    }
    setApplied(true);
  };

  return (
    <React.Fragment>
      <div className = "trip__attributes">
        <div className="trip__attributes__description">{trip.description}</div>
        <div className="trip__attributes__participation">Részvétel: {participation[trip.participation]}</div>
      </div>
      {props.user && !inWheel && !applied &&
        <div className="trip__application">
          <button name = "apply" onClick = {handleApply}>Jelentkezek</button>
        </div>
      }
      <div className="trip__map">
        <TripMap trip = {trip} />
      </div>
    </React.Fragment>
  );

}

export default Trip;