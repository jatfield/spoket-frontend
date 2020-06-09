import React from 'react';
import { ReactComponent as Denied } from '../../shared/images/not_interested-24px.svg';
import { ReactComponent as Approved } from '../../shared/images/check_circle_outline-24px.svg';
import dayjs from 'dayjs';
import './Participant.css'
import silhouette from '../../shared/images/sports_motorsports-24px.svg'
import ParticipantSpokes from './ParticipantSpokes';
import { useState } from 'react';

const Participant = (props) => {

  const [spokesOpen, setSpokesOpen] = useState(false);

  const tickHandler = () => {
    props.approveButtonHandler(props.participant.wheel);
  };

  const handleSpokesOpen = () => {
    spokesOpen ? setSpokesOpen(false) : setSpokesOpen(true);
  }

  return (
  <div className="trip_riders__participant">
    <div className="participant__image">
    {props.participant.fbData.picture ? <img src = {props.participant.fbData.picture.data.is_silhouette ? silhouette : props.participant.fbData.picture.data.url} alt = {props.participant.fbData.name}/> : <p>Nem engedélyezett adatlekérés</p>}
    </div>
    {props.participant.fbData && <div className="participant__name">
      {props.participant.fbData.name} ({props.participant.fbData.email})
    </div>}
    <div className="participant__applied_at">
      {dayjs(props.participant.wheel.createdAt).format('YYYY.MM.DD. HH:mm')}
    </div>
    {props.participant.wheel.spokes && 
    <div className="participant__spokes">
      <h3 onClick = {handleSpokesOpen}>{props.participant.wheel.spokes.length}/{props.trip.spots.length}</h3>
      {spokesOpen && <ParticipantSpokes wheel = {props.participant.wheel} user = {props.user} />}
    </div>}
    {props.role === 'applicant' && <div onClick = {tickHandler}>
      {props.ticked ? <Approved className= "participant__button participant__button--approved"/> : <Denied className = "participant__button participant__button--denied"/> }
    </div>}
  </div>);
};

export default Participant