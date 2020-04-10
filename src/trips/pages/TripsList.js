import React, { useEffect, useState } from 'react';

import {useFetch} from '../../hooks/request-hook'
import './TripsList.css'
import Trip from '../components/Trip';
import LoadingSpinner from '../../shared/components/LoadingSpinner';

const TripsList = (props) => {
  const {isLoading, sendRequest} = useFetch();
  const [loadedTrips, setLoadedTrips] = useState();
  const [approvals, setApprovals] = useState(0);

  useEffect (() => {
    const getTrips = async () => {
      try {
        const responseData = await sendRequest(`${process.env.REACT_APP_API_SERVER}/api/trips/`);
        setLoadedTrips(responseData.trips)
      } catch (error) {}
    }
    getTrips();
  }, [sendRequest, approvals]);
 
  const approvalSent = () => {
    setApprovals(approvals + 1)
  }

  return (
    <React.Fragment>
      {isLoading && !loadedTrips && <LoadingSpinner />}
      {!isLoading && loadedTrips &&<div className = "trips">
        {loadedTrips.map((trip) => 
          <div className = "trips__trip" key = {trip._id}>
            <Trip trip = {trip} user = {props.user} approvalSent = {approvalSent}/>
          </div>)}
      </div>}
    </React.Fragment>
  )

};

export default TripsList;