import React from 'react';
import { NavLink } from 'react-router-dom';

const TripOwner = (props) => {

  return (
    <React.Fragment>
      <div className="trip__tripowner_data">
        <div className="tripowner_data__toapprove">Jelentkezők : {props.applied.length}</div>
      </div>
      <NavLink to = {`/tripadmin/${props.trip._id}`}><button>Kaland kezelése</button></NavLink>
    </React.Fragment>
  )

};

export default TripOwner;