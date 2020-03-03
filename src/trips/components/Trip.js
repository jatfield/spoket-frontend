import React, { useState } from 'react';
import Modal from '../../shared/components/Modal';
import SpotMap from './SpotMap';
import TripMap from './TripMap';
import './Trip.css'
import { useFetch } from '../../hooks/request-hook';

const Trip = (props) => {

  const [clickedSpot, setClickedSpot] = useState();
  const [spotModalShow, setSpotModalShow] = useState(false);
  const {sendRequest} = useFetch();

  const trip = props.trip;
  let inWheel = !!trip.participants.find((p) => p.rider === props.user.spoketId);
  
  const spotClickHandler = (spot) => {
    if (spotModalShow && clickedSpot === spot) {
      hideSpotModal();
      return;
    } else if (spotModalShow && clickedSpot !== spot) {
      setClickedSpot(spot)
    } else {
    setClickedSpot(spot);
    setSpotModalShow(true);
    }
  };

  const hideSpotModal = () => {
    setClickedSpot(null)
    setSpotModalShow(false)
  };

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
      <Modal show = {spotModalShow} onCancel = {hideSpotModal}>
        <SpotMap spot = {clickedSpot}/>
      </Modal>
      <div className = "trip__attributes">
        <div className="trip__attributes__description">{trip.description}</div>
        <div className="trip__attributes__participation">{trip.participation}</div>
      </div>
      {props.user.isLoggedIn && 
        <div className="trip__application">
          {inWheel ? "Ugrás a lapjára" : <button name = "apply" onClick = {handleApply}>Jelentkezek</button>}
        </div>
      }
      <div className="trip__map">
        <TripMap trip = {trip} />
      </div>
      {trip.spots.map((spot) => 
        <div className ="trip__point" onClick = {() => spotClickHandler(spot)} key = {spot._id}>
          {spot.name}
        </div>)}
    </React.Fragment>
  );

}

export default Trip;