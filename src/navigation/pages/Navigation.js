import React from 'react';
import {NavLink} from 'react-router-dom';
import './Navigation.css'
import Auth from '../../shared/components/Auth';

const Navigation = (props) => {

  return (
    <div className="navigation__container">
      <ul>
        {props.user && 
        <React.Fragment>
          <li>
            <NavLink to="/trips">Kalandok</NavLink>
          </li>
          <li>
            <NavLink to="/wheels">Kerekek</NavLink>
          </li>
        </React.Fragment>}
        <li>
        <Auth user = {props.user} login = {props.login} logout = {props.logout} /></li>
      </ul>
    </div>
  )

};

export default Navigation

