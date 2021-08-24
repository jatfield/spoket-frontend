import React from 'react';
import {NavLink} from 'react-router-dom';
import './Navigation.css'
import Auth from '../../shared/components/Auth';
import Modal from '../../shared/components/Modal';
import { useState } from 'react';

const Navigation = (props) => {
  const [showLogin, setShowLogin] = useState(false);

  const hideLoginModal = () => {
    setShowLogin(false)
  };

  const handleLoginModal = () => {
    if (props.user) {
      props.logout()
    } else {
      setShowLogin(true);
    }
  };

  return (
    <React.Fragment>
      <Modal show = {showLogin} onCancel = {hideLoginModal} title = "Azonosítás">
        <Auth user = {props.user} login = {props.login} onComplete = {hideLoginModal} />
        <p>
          <NavLink to="/pp" onClick = {hideLoginModal}>Részletes adatvédelmi és felhasználási információk</NavLink>
        </p>
      </Modal>
      <div className="navigation__container">
        <ul>
          {props.user && 
          <React.Fragment>
            <li>
              <NavLink to="/trips" activeClassName = "navlink--current">Túrák</NavLink>
            </li>
            <li>
              <NavLink to="/wheels" activeClassName = "navlink--current">Nevezések</NavLink>
            </li>
          </React.Fragment>}
          <li onClick = {handleLoginModal}>
            {props.user ? "Kijelentkezés" : "Bejelentkezés"}
          </li>
        </ul> 
      </div>
    </React.Fragment>
  )

};

export default Navigation

