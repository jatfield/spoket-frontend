import React from 'react';

import { Map, Marker, TileLayer } from "react-leaflet";

import './SpotMap.css';

const SpotMap = (props) => {
  const spot = props.spot;
  const googleDirectionsLink = `https://www.google.com/maps/dir/?api=1&destination=${spot.location.lat},${spot.location.lng}`
  return (
  <div className="spot">
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
    <a href={googleDirectionsLink} target ="_new">Google útvonalterv</a>
  </div>
  )

}

export default SpotMap;