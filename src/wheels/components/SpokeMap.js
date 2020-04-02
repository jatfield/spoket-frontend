import React, { useRef, useEffect } from 'react';

import { Map, Marker, Polyline, TileLayer } from "react-leaflet";

import './SpokeMap.css';

const SpokeMap = (props) => {
  const spotCoords = {lat: props.spot.location.lat, lng: props.spot.location.lng};
  const spokeCoords = {lat: props.spoke.location.lat, lng: props.spoke.location.lng};
  const mapRef = useRef();

  useEffect (() => {
    //console.log(mapRef.current);
    
  }, [mapRef])

  return (
  <div className="spoke__map">
    lat: {spokeCoords.lat}, long: {spokeCoords.lng} {props.spoke.distance && `távolság: ${props.spoke.distance}`}, {props.spoke.verifiedAt ? 'kép elfogadva' : 'kép túl nagy távolságra készült'}
    <Map ref = {mapRef} center={[(spokeCoords.lat + spotCoords.lat) / 2, (spokeCoords.lng + spotCoords.lng) / 2]} zoom={700000 / props.spoke.distance}>
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