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
        const responseData = await sendRequest(`${process.env.REACT_APP_API_SERVER}/api/trips/${props.trip._id}/creatordata`, 'GET', null, {'Authentication': `token ${props.user.fbToken} id ${props.user.spoketId}`});
        setTripData(responseData);        
      } catch (error) {}
    }
    getTripData();
  }, [sendRequest, props.trip, props.user]);
  
  const handleTripParticipantsClick = () => {
    if (tripData.trip.wheels.length) setShowParticipants(true)
  };
  
  const hideParticipants = () => {
    setShowParticipants(false);
  };

  return (
    <React.Fragment>
      <Modal show = {showParticipants} onCancel = {hideParticipants}>
        <TripParticipants trip = {props.trip} user = {props.user}/>
      </Modal>
      {isLoading && <LoadingSpinner />}
      {!isLoading && tripData && 
        <div className="trip__tripowner_data" onClick = {handleTripParticipantsClick}>
          <div className="tripowner_data__participants">Résztvevők: {tripData.trip.wheels.reduce((total, wheel) => {return wheel.approvedAt ? ++total : total},0)}</div>
          <div className="tripowner_data__riderfinished">Teljesítette: {tripData.trip.wheels.reduce((total, wheel) => {return wheel.completedAt ? ++total : total},0)}</div>
          <div className="tripowner_data__toapprove">Jelentkezők : {tripData.trip.wheels.reduce((total, wheel) => {return !wheel.approvedAt ? ++total : total},0)}</div>
        </div>}
    </React.Fragment>
  )

};

export default TripOwner;