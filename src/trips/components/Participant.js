import React from 'react';

const Participant = (props) => {
  return <div className="trip_riders__participant">{props.participant.name}</div>
};

export default Participant