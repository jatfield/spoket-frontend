import React from 'react';
import { ReactComponent as Denied } from '../../shared/images/not_interested-24px.svg';
import { ReactComponent as Approved } from '../../shared/images/check_circle_outline-24px.svg';

const Participant = (props) => {

  const tickHandler = () => {
    props.approveButtonHandler(props.participant.wheel);
  };

  return (
  <div className="trip_riders__participant">
    {!props.participant.fbData.picture.data.is_silhouette && 
      <div className="participant__image">
        <img src = {props.participant.fbData.picture.data.url} alt = {props.participant.fbData.name}/>
      </div>}
    {props.role === 'applicant' && <div className={props.ticked ? "tile__button--approved" : "tile__button--denied"} onClick = {tickHandler}>
      {props.ticked ? <Approved /> : <Denied /> }
    </div>}
    {props.participant.fbData.name}
  </div>);
};

export default Participant