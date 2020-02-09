import React from 'react';

import { Map, Marker, TileLayer } from "react-leaflet";

const TripMap = (props) => {
  const trip = props.trip;
  return (
  <div className="spot">
    <Map center={[trip.spots[0].location.lat, trip.spots[0].location.lng]} zoom={10}>
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    />
    {trip.spots.map((spot) =>
    <Marker
      key={spot.location.lat + spot.location.lng}
      position={[
        spot.location.lat,
        spot.location.lng
      ]}
    />
    )}

  </Map>
  </div>
  )

}

export default TripMap;