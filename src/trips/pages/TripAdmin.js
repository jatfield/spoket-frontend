import React from 'react';
import { useState } from 'react';
import TripParticipants from '../components/TripParticipants';
import { useEffect } from 'react';
import { useFetch } from '../../hooks/request-hook';
import LoadingSpinner from '../../shared/components/LoadingSpinner';
import { useParams } from 'react-router-dom';
import SpotList from '../components/SpotList';
import './TripAdmin.css'

const TripAdmin = (props) => {
  const {isLoading, sendRequest} = useFetch();
  const [participantsOpen, setParticipantsOpen] = useState(false);
  const [spotsOpen, setSpotsOpen] = useState(false);
  const [trip, setTrip] = useState();

  const tripId = useParams().tripId;

  useEffect(() => {
    const getTrip = async () => {
      try {
        const responseData = await sendRequest(`${process.env.REACT_APP_API_SERVER}/api/trips/${tripId}`, 'GET', null, {'Authentication': `token ${props.user.spokeToken}`});
        setTrip(responseData.trip)
      } catch (error) {}
    }
    getTrip();
  }, [sendRequest, tripId, props.user]);

  const handleParticipantsClick = () => {
    participantsOpen ? setParticipantsOpen(false) : setParticipantsOpen(true);
  };
  const handleSpotsClick = () => {
    spotsOpen ? setSpotsOpen(false) : setSpotsOpen(true);
  };

  return (
    <React.Fragment>
      {isLoading && !trip && <LoadingSpinner />}
      {!isLoading && trip && 
      <div className = "tripadmin">
        <h1>{trip.name}</h1>
        <h2 onClick = {handleParticipantsClick}>Résztvevők</h2>
        {participantsOpen && <TripParticipants trip = {trip} user = {props.user} ></TripParticipants>}
        <h2 onClick = {handleSpotsClick}>Pontok</h2>
        {spotsOpen && <SpotList trip = {trip} />}
      </div>}
    </React.Fragment>
  )
};

export default TripAdmin;