import React, { useState } from 'react';
import Modal from '../../shared/components/Modal';
import SpotMap from './SpotMap';
import TripMap from './TripMap';
import './Trip.css'

const Trip = (props) => {

  const [clickedSpot, setClickedSpot] = useState();
  const [spotModalShow, setSpotModalShow] = useState(false);
  const trip = props.trip;

  let inWheel;

  if (trip.participants.find((p) => p.rider === props.user.spoketId)) inWheel = true

  const spotClickHandler = (spot) => {
    if (spotModalShow) {
      hideSpotModal();
      return;
    }
    setClickedSpot(spot);
    setSpotModalShow(true);
  }
  const hideSpotModal = () => {
    setClickedSpot(null)
    setSpotModalShow(false)
  }

  return (
    <React.Fragment>
      <Modal show = {spotModalShow} onCancel = {hideSpotModal}>
        <SpotMap spot = {clickedSpot}/>
      </Modal>
      <div className = "trip__attributes">
        <div className="trip__attributes__description">{trip.description}</div>
        <div className="trip__attributes__participation">{trip.participation}</div>
        {inWheel ? "Ugrás a lapjára" : <button name = "apply">Jelentkezek</button>}
      </div>
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