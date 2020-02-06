import React, { useEffect, useState } from 'react';

import {useFetch} from '../../hooks/request-hook'
import SpotMap from '../components/SpotMap';
import Modal from '../../shared/components/Modal';
import TripMap from '../components/TripMap';

const Trip = () => {
  const {isLoading, sendRequest} = useFetch();
  const [loadedTrip, setLoadedTrip] = useState();
  const [clickedSpot, setClickedSpot] = useState();
  const [spotModalShow, setSpotModalShow] = useState(false);

  useEffect (() => {
    const getTrip = async () => {
      try {
        const responseData = await sendRequest(`${process.env.REACT_APP_API_SERVER}/api/trips/first`);
        setLoadedTrip(responseData.trip)
      } catch (error) {}
    }
    getTrip();
  }, [sendRequest, setLoadedTrip]);

  const spotClickHandler = (spot) => {
    if (spotModalShow) hideSpotModal();
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
      {isLoading && !loadedTrip &&
      <h2>loading...</h2>}
      {!isLoading && loadedTrip &&
      <div className = "trip">
        <TripMap trip = {loadedTrip} />
        {loadedTrip.spots.map((spot) => <div className ="trip__point" onClick = {() => spotClickHandler(spot)}>
          <h2>{spot.name}</h2>
          </div>)}
      </div>}
    </React.Fragment>
  );
};

export default Trip;