import React from 'react';
import {NavLink} from 'react-router-dom';

const Navigation = (props) => {

  return (
    <div className="navigation__container">
      <NavLink to="/trips">Túrák</NavLink>
      {props.user && <NavLink to="/wheels">Túráim</NavLink>}
    </div>
  )

};

export default Navigation

