import React, { useState, useEffect } from 'react';
import TripMap from './TripMap';
import './Trip.css'
import { useFetch } from '../../hooks/request-hook';
import TripOwner from './TripOwner';
import LoadingSpinner from '../../shared/components/LoadingSpinner';
import TripDescription from './TripDescription';

const Trip = (props) => {
  const trip = props.trip;
  const participation = {"open": "nyílt", "invitational": "meghívásos", "approval": "jóváhagyásos"};

  const {isLoading, sendRequest} = useFetch();
  const [applied, setApplied] = useState(false);
  const [role, setRole] = useState(false);
  const wheels = {approved: trip.wheels.filter((wheel) => wheel.approvedAt),
                            completed: trip.wheels.filter((wheel) => wheel.completedAt),
                            applied: trip.wheels.filter((wheel) => !wheel.approvedAt)};

  const handleApply = async () => {
    try {
      await sendRequest(`${process.env.REACT_APP_API_SERVER}/api/wheels/create/${trip._id}`, 'POST', null, {'Authentication': `token ${props.user.spokeToken}`});
    } catch (error) {
      
    }
    setApplied(true);
  };

  useEffect (() => {
    const getRole = async () => {
      try {
        const responseData = await sendRequest(`${process.env.REACT_APP_API_SERVER}/api/trips/${props.trip._id}/role`, 'GET', null, {'Authentication': `token ${props.user.spokeToken}`});
        setRole(responseData.role);        
      } catch (error) {}
    }
    props.user && props.trip && getRole();
  }, [sendRequest, props.trip, props.user]);

  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner />}
      <div className="trip__name"><h2>{trip.name}</h2></div>
      <div className="trip__map">
        <TripMap trip = {trip} />
      </div>
      <div className = "trip__data">
        <div className="trip__data__spotnumber">Pontok: {trip.spots.length}</div>
        <div className="trip__data__participation">Részvétel: {participation[trip.participation]}</div>
        {props.user && !role && !applied &&
          <div className="trip__application">
            <button name = "apply" onClick = {handleApply}>Jelentkezek</button>
          </div>
        }
        <div className="trip__data__participants">
          <div className="trip__data__participants">Résztvevők: {wheels.approved.length}</div>
          <div className="trip__data__riderfinished">Teljesítette: {wheels.completed.length}</div>
        </div>
        {props.user && role === 'creator' &&
          <TripOwner trip = {trip} user = {props.user} applied = {wheels.applied} />}
        <TripDescription descriptio = {trip.description} />
      </div>
    </React.Fragment>
  );

}

export default Trip;