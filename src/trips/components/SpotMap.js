import React, { useEffect, useState } from 'react';
import {useFetch} from '../../hooks/request-hook'
import { Map, Marker, TileLayer } from "react-leaflet";

import './SpotMap.css';

const SpotMap = (props) => {
  
  const {sendRequest} = useFetch();
  const [spotImageUrl, setSpotImageUrl] = useState();

  useEffect (() => {
    const getSpotImageUrl = async () => {
      try {
        const responseData = await sendRequest(`${process.env.REACT_APP_API_SERVER}/api/trips/${props.trip._id}/spotimage/${props.spot._id}`, 'GET', null, {'Authentication': `token ${props.user.spokeToken}`});
        setSpotImageUrl(responseData.url);
      } catch (error) {
        console.log(error);
      }
    };
    getSpotImageUrl();
    
  }, [sendRequest, props.trip, props.spot, props.user, setSpotImageUrl]);

  const spot = props.spot;
  const googleDirectionsLink = `https://www.google.com/maps/dir/?api=1&destination=${spot.location.lat},${spot.location.lng}`
  return (
  <div className="spot">
    {spotImageUrl && 
      <div className="spot__image"> 
        <img src = {spotImageUrl} alt = {props.spot.name}/>
      </div>}
    <div className="spot__map">
      <Map center={[spot.location.lat, spot.location.lng]} zoom={15}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker
          position={[
            spot.location.lat,
            spot.location.lng
          ]}
        />
      </Map>
    </div>
    <div className="spot__directions">
      <button><a href={googleDirectionsLink} target ="_new">Google útvonalterv</a></button>
    </div>
  </div>
  )

}

export default SpotMap;