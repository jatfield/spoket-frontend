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
      <Modal show = {showParticipants} onCancel = {hideParticipants} title = "Résztvevők és jelentkezők">
        <TripParticipants trip = {props.trip} user = {props.user} approvalSent = {props.approvalSent} />
      </Modal>
      <div className="trip__tripowner_data" onClick = {handleTripParticipantsClick}>
        <div className="tripowner_data__toapprove">Jelentkezők : {props.applied.length}</div>
      </div>
    </React.Fragment>
  )

};

export default TripOwner;