import React, { useEffect, useState } from 'react';

import {useFetch} from '../../hooks/request-hook'
import SpotMap from '../../trips/components/SpotMap';
import Modal from '../../shared/components/Modal';
import { NavLink } from 'react-router-dom';

import Spokes from '../components/Spokes';
import TripMap from '../../trips/components/TripMap';
import './Wheels.css';

const Wheels = (props) => {

  const [loadedWheels, setLoadedWheels] = useState();
  const [expandedWheels, setExpandedWheels] = useState([]);
  const {isLoading, sendRequest} = useFetch();
  const [clickedSpot, setClickedSpot] = useState();
  const [spotModalShow, setSpotModalShow] = useState(false);

  useEffect (() => {
    const getWheel = async () => {
      try {
        const responseData = await sendRequest(`${process.env.REACT_APP_API_SERVER}/api/wheels/rider`, 'GET', null, {'Authentication': `token ${props.user.fbToken}`});
        setLoadedWheels(responseData.wheels)
      } catch (error) {}
    }
    getWheel();
  }, [sendRequest, props.user]);

  const handleWheelClick = (wheel) => {
    expandedWheels.find(w => w === wheel) ? setExpandedWheels(expandedWheels.filter((w) => w !== wheel)) : setExpandedWheels([...expandedWheels, wheel]);
  }

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
      {isLoading && !loadedWheels &&
      <h2>loading...</h2>}
      {!isLoading && !loadedWheels &&
      <div>
        <h2>Fel kéne venni egy túrát!</h2>
        <NavLink to = '/trips'>Túralista</NavLink>
      </div>}
      {!isLoading && loadedWheels &&
      <div className = "wheels">
        {loadedWheels.map((wheel) => 
        <div className="wheel" key = {wheel._id} >
          <div className="wheel__tripdata">
            <h2 onClick = {() => handleWheelClick(wheel._id)}>{wheel.trip.name}</h2>
            <div className="wheel__tripdata__map"><TripMap trip = {wheel.trip} /></div>
          </div>
          {expandedWheels.find(w => w === wheel._id) && 
            <Spokes wheel = {wheel} spotClickHandler = {spotClickHandler} user = {props.user}/>}
        </div>
        )}
      </div>}
    </React.Fragment>
  );
};

export default Wheels;