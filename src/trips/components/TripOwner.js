import React, { useEffect } from 'react';
  import { useFetch } from '../../hooks/request-hook';
import { useState } from 'react';

const TripOwner = (props) => {

  const {isLoading, sendRequest} = useFetch();
  const [tripData, setTripData] = useState();

  useEffect (() => {
    const getTrips = async () => {
      try {
        const responseData = await sendRequest(`${process.env.REACT_APP_API_SERVER}/api/trips/${props.trip._id}/participants`, 'GET', null, {'Authentication': `token ${props.user.fbToken}`});
        setTripData(responseData);
        console.log(responseData);
        
      } catch (error) {}
    }
    getTrips();
  }, [sendRequest, props.trip, props.user]);
  

  return (
    <div className="trip__owner">
      Résztvevők: {tripData && tripData.trip.participants.length} <br />
      Teljesítette: {tripData && tripData.ridersFinished.map((r) => <div>{!r.fbData.error && r.fbData.name}</div>)}
    </div>
  )

};

export default TripOwner;