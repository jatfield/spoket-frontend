import React from 'react';
import TripMap from './TripMap';
import './Trip.css'
import { useFetch } from '../../hooks/request-hook';

const Trip = (props) => {

  const {sendRequest} = useFetch();

  const trip = props.trip;
  const userId = props.user ? props.user.spoketId : "";
  const inWheel = !!trip.participants.find((p) => p.rider === userId);
  const participation = {"open": "nyílt", "invitational": "meghívásos", "approval": "jóváhagyásos"}
  
  const handleApply = async () => {
    let responseData;
    try {
      responseData = await sendRequest(`${process.env.REACT_APP_API_SERVER}/api/trips/application/${trip._id}`, 'POST', null, {'Authentication': `token ${props.user.fbToken}`});
      console.log(responseData);
    } catch (error) {
      
    }
  };

  return (
    <React.Fragment>
      <div className = "trip__attributes">
        <div className="trip__attributes__description">{trip.description}</div>
        <div className="trip__attributes__participation">Részvétel: {participation[trip.participation]}</div>
      </div>
      {props.user && 
        <div className="trip__application">
          {!inWheel && <button name = "apply" onClick = {handleApply}>Jelentkezek</button>}
        </div>
      }
      <div className="trip__map">
        <TripMap trip = {trip} />
      </div>
    </React.Fragment>
  );

}

export default Trip;