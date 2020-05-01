import React, { useRef, useEffect } from 'react';

import { Map, Marker, Polyline, TileLayer } from "react-leaflet";

import './SpokeMap.css';

const SpokeMap = (props) => {
  const spotCoords = {lat: props.spot.location.lat, lng: props.spot.location.lng};
  const spokeCoords = {lat: props.spoke.location.lat, lng: props.spoke.location.lng};
  const mapRef = useRef();

  const zoomLevel = props.spoke.distance > 1000 ? Math.floor(8 + 70000 / props.spoke.distance) : 14;

  useEffect (() => {
    //console.log(mapRef.current);
  }, [mapRef])

  return (
  <div className="spoke__map">
    <Map ref = {mapRef} center={[(spokeCoords.lat + spotCoords.lat) / 2, (spokeCoords.lng + spotCoords.lng) / 2]} zoom={zoomLevel}>
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
      {!props.verified && <Marker
        key={spotCoords.lat + spotCoords.lng}
        position={[
          spotCoords.lat,
          spotCoords.lng
        ]}
      />}
      {!props.verified && <Polyline positions = {[[spotCoords.lat, spotCoords.lng],[spokeCoords.lat, spokeCoords.lng]]}/>}
    </Map>
  </div>
  )

}

export default SpokeMap;