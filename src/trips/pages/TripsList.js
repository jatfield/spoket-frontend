import React, { useEffect, useState } from 'react';

import {useFetch} from '../../hooks/request-hook'
import './TripsList.css'
import Trip from '../components/Trip';

const TripsList = (props) => {
  const {isLoading, sendRequest} = useFetch();
  const [loadedTrips, setLoadedTrips] = useState();

  useEffect (() => {
    const getTrips = async () => {
      try {
        const responseData = await sendRequest(`${process.env.REACT_APP_API_SERVER}/api/trips/`);
        setLoadedTrips(responseData.trips)
      } catch (error) {}
    }
    getTrips();
  }, [sendRequest]);

  return (
    <React.Fragment>
      {isLoading && !loadedTrips && <div>Loading...</div>}
      {!isLoading && loadedTrips &&<div className = "trips">
        {loadedTrips.map((trip) => 
          <div className = "trips__trip" key = {trip._id}>
            <h2>{trip.name}</h2>
            <Trip trip = {trip} user = {props.user}/>
          </div>)}
      </div>}
    </React.Fragment>
  )

};

export default TripsList;