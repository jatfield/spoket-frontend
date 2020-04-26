import React from 'react';
import { ReactComponent as Denied } from '../../shared/images/not_interested-24px.svg';
import { ReactComponent as Approved } from '../../shared/images/check_circle_outline-24px.svg';
import './Participant.css'
import silhouette from '../../shared/images/sports_motorsports-24px.svg'

const Participant = (props) => {

  const tickHandler = () => {
    props.approveButtonHandler(props.participant.wheel);
  };

  return (
  <div className="trip_riders__participant">
    <div className="participant__image">
      <img src = {props.participant.fbData.picture.data.is_silhouette ? silhouette : props.participant.fbData.picture.data.url} alt = {props.participant.fbData.name}/>
    </div>
    <div className="participant__name">
      {props.participant.fbData.name}
    </div>
    {props.role === 'applicant' && <div className={props.ticked ? "participant__button participant__button--approved" : "participant__button participant__button--denied"} onClick = {tickHandler}>
      {props.ticked ? <Approved /> : <Denied /> }
    </div>}
  </div>);
};

export default Participant