import React from 'react';

import { MapContainer, Marker, Polyline, TileLayer } from "react-leaflet";
import './TripMap.css'

const TripMap = (props) => {
  const trip = props.trip;
  return (
    <MapContainer center={[trip.origin.lat, trip.origin.lng]} zoom={12} maxZoom = {12} zoomControl = {false} attributionControl = {false} >
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    />
    {trip.spots.map((spot) =>
      <Marker  key={`${spot.location.lat}${spot.location.lng}`}
        position={[
          spot.location.lat,
          spot.location.lng
        ]} />
    )} 
    {trip.spots.map((spot) =>
      <Polyline key={`${spot.location.lat}${spot.location.lng}${trip.origin.lng}`} 
        positions = {[[spot.location.lat, spot.location.lng],[trip.origin.lat, trip.origin.lng]]} 
        weight = {2} color = 'black' opacity = '0.3'/>
    )}
    <Marker
      position={[
        trip.origin.lat,
        trip.origin.lng
      ]} />
  </MapContainer>
  )
};

export default TripMap;