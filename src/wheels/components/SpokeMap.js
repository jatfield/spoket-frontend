import React, { useRef, useEffect } from 'react';

import { Map, Marker, Polyline, TileLayer } from "react-leaflet";

import './SpokeMap.css';

const SpokeMap = (props) => {
  console.log(props);
  const spotCoords = {lat: props.spotData.location.lat, lng: props.spotData.location.lng};
  const spokeCoords = {lat: props.spokeData.spoke.location.lat, lng: props.spokeData.spoke.location.lng};
  const mapRef = useRef();

  useEffect (() => {
    console.log(mapRef.current);
    
  }, [mapRef])

  return (
  <div className="spot">lat: {spokeCoords.lat}, long: {spokeCoords.lng}, távolság: {props.spokeData.distance}
    <Map ref = {mapRef} center={[spokeCoords.lat, spokeCoords.lng]} zoom={15}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker
        key={spokeCoords.lat + spokeCoords.lng}
        position={[
          spokeCoords.lat,
          spokeCoords.lng
        ]}
      />
      <Marker
        key={spotCoords.lat + spotCoords.lng}
        position={[
          spotCoords.lat,
          spotCoords.lng
        ]}
      />
      <Polyline positions = {[[spotCoords.lat, spotCoords.lng],[spokeCoords.lat, spokeCoords.lng]]}/>
    </Map>
  </div>
  )

}

export default SpokeMap;