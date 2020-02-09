import React from 'react';

import { Map, Marker, TileLayer } from "react-leaflet";

import './SpotMap.css';

const SpotMap = (props) => {
  const spot = props.spot;
  return (
  <div className="spot">{`lat: ${spot.location.lat}, long: ${spot.location.lng}`}
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
  )

}

export default SpotMap;