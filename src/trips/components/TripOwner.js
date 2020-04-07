import React, { useEffect } from 'react';
  import { useFetch } from '../../hooks/request-hook';
import { useState } from 'react';
import LoadingSpinner from '../../shared/components/LoadingSpinner';
import Modal from '../../shared/components/Modal';
import TripParticipants from './TripParticipants';

const TripOwner = (props) => {

  const {isLoading, sendRequest} = useFetch();
  const [tripData, setTripData] = useState();
  const [showParticipants, setShowParticipants] = useState(false);

  useEffect (() => {
    const getTripData = async () => {
      try {
        const responseData = await sendRequest(`${process.env.REACT_APP_API_SERVER}/api/trips/${props.trip._id}/creatordata`, 'GET', null, {'Authentication': `token ${props.user.fbToken}`});
        setTripData(responseData);        
      } catch (error) {}
    }
    getTripData();
  }, [sendRequest, props.trip, props.user]);
  
  const handleTripParticipantsClick = () => {
    if (tripData.trip.participants.length) setShowParticipants(true)
  }
  return (
    <React.Fragment>
      <Modal show = {showParticipants}>
        <TripParticipants trip = {props.trip} user = {props.user} />
      </Modal>
      {isLoading && <LoadingSpinner />}
      {!isLoading && tripData && 
        <div className="trip__tripowner_data" onClick = {handleTripParticipantsClick}>
          <div className="tripowner_data__participants">Résztvevők: {tripData.trip.participants.reduce((total, participant) => {return participant.approved ? ++total : total},0)}</div>
          <div className="tripowner_data__riderfinished">Teljesítette: {tripData.ridersFinished.length ? tripData.ridersFinished.map((r) => <div>{!r.fbData.error && r.fbData.name}</div>) : "0"}</div>
          <div className="tripowner_data__toapprove">Jelentkezők : {tripData.trip.participants.reduce((total, participant) => {return !participant.approved ? ++total : total},0)}</div>
        </div>}
    </React.Fragment>
  )

};

export default TripOwner;