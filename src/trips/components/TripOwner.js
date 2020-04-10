import React from 'react';
import { useState } from 'react';
import Modal from '../../shared/components/Modal';
import TripParticipants from './TripParticipants';

const TripOwner = (props) => {

  const [showParticipants, setShowParticipants] = useState(false);
  
  const handleTripParticipantsClick = () => {
    if (props.trip.wheels.length) setShowParticipants(true)
  };
  
  const hideParticipants = () => {
    setShowParticipants(false);
  };

  return (
    <React.Fragment>
      <Modal show = {showParticipants} onCancel = {hideParticipants}>
        <TripParticipants trip = {props.trip} user = {props.user}/>
      </Modal>
      <div className="trip__tripowner_data" onClick = {handleTripParticipantsClick}>
        <div className="tripowner_data__toapprove">Jelentkezők : {props.trip.wheels.reduce((total, wheel) => {return !wheel.approvedAt ? ++total : total},0)}</div>
      </div>
    </React.Fragment>
  )

};

export default TripOwner;