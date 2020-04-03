import React from 'react';
import {NavLink} from 'react-router-dom';

const Navigation = (props) => {

  return (
    <div className="navigation__container">
        {props.user && 
      <ul>
          <li>
            <NavLink to="/trips">Kerekek</NavLink>
          </li>
          <li>
            <NavLink to="/wheels">Kalandok</NavLink>
          </li>
      </ul>}
    </div>
  )

};

export default Navigation

