import React, { useEffect, useState } from 'react';

import {useFetch} from '../../hooks/request-hook'
import { NavLink } from 'react-router-dom';

import WheelSpots from '../components/WheelSpots';
import TripMap from '../../trips/components/TripMap';
import './Wheels.css';
import { ReactComponent as ExpandButton } from '../../shared/images/expand_more-24px.svg';
import { ReactComponent as ShrinkButton } from '../../shared/images/expand_less-24px.svg';
import { ReactComponent as AddSpokeIcon } from '../../shared/images/add_location_alt-24px.svg';
import { ReactComponent as MissedSpokeIcon } from '../../shared/images/not_listed_location-24px.svg';
import { ReactComponent as CheckedSpokeIcon } from '../../shared/images/where_to_vote-24px.svg';
import { ReactComponent as ShowSpotIcon } from '../../shared/images/map-24px.svg';
import LoadingSpinner from '../../shared/components/LoadingSpinner';

const Wheels = (props) => {

  const [loadedWheels, setLoadedWheels] = useState();
  const [expandedWheels, setExpandedWheels] = useState([]);
  const {isLoading, sendRequest} = useFetch();

  useEffect (() => {
    const getWheel = async () => {
      try {
        const responseData = await sendRequest(`${process.env.REACT_APP_API_SERVER}/api/wheels/rider`, 'GET', null, {'Authentication': `token ${props.user.spokeToken}`});
        setLoadedWheels(responseData.wheels);
      } catch (error) {}
    };
    
    getWheel();
  }, [sendRequest, props.user]);

  const handleWheelClick = (wheel) => {
    expandedWheels.find(w => w === wheel) ? setExpandedWheels(expandedWheels.filter((w) => w !== wheel)) : setExpandedWheels([...expandedWheels, wheel]);
  };

  return (
    <React.Fragment>
      {isLoading && !loadedWheels && <LoadingSpinner />}
      {!isLoading && loadedWheels && !loadedWheels.length && 
      <div>
        <NavLink to = '/trips'>Túralista</NavLink>
      </div>}
      {!isLoading && loadedWheels &&
      <div className = "wheels">
        {loadedWheels.map((wheel) => 
        <div className="wheel" key = {wheel._id} >
          <h2 onClick = {() => handleWheelClick(wheel._id)}>{wheel.trip.name} {expandedWheels.find(w => w === wheel._id) ?  <ShrinkButton  className = "wheel__open" transform = "scale(1.5)"/> : <ExpandButton className = "wheel__open" transform = "scale(1.5)"/>}</h2>
          <div className="wheel__tripdata">
            <div className="wheel__tripdata__map"><TripMap trip = {wheel.trip} /></div>
          </div>
          {expandedWheels.find(w => w === wheel._id) && 
            <WheelSpots wheel = {wheel} spots = {wheel.trip.spots} user = {props.user}/>}
          {expandedWheels.find(w => w === wheel._id) && 
            <div className="wheel__results">
              <h3>Teljesített pontok: </h3>
              {wheel.trip.spots.length}/{wheel.spokes.filter((s) => s.verifiedAt).length}
              <h3>Meglátogatott pontok: </h3>
              {wheel.spokes.length}
              <h3>Jelmagyarázat: </h3>
              <ShowSpotIcon />Pontot mutat<br />
              <AddSpokeIcon />Látogatás <br />
              <MissedSpokeIcon />Hibás kép<br />
              <CheckedSpokeIcon />Elfogadott<br />
            </div>}
        </div>
        )}
      </div>}
    </React.Fragment>
  );
};

export default Wheels;