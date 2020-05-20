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
    setShowLogin(true);
  };

  return (
    <React.Fragment>
      <Modal show = {showLogin} onCancel = {hideLoginModal} title = "Hitelesítés">
        <p>Az alkalmazás Facebook bejelentkezést használ. Személyes adatot nem tárolunk. <br />
          Amit igen: feltöltött képek és azok metaadatai, továbbá az alkalmazás használata során keletkezett adatok (kerekek, látogatások).<br />
          Az alkalmazásban tárolt adatok az alkalmazás <a href = "https://www.facebook.com/settings?tab=applications" target ="_blank">Facebook profilodról való leválasztása</a> esetén törlésre kerülnek.
        </p>
        <Auth user = {props.user} login = {props.login} logout = {props.logout} onComplete = {hideLoginModal} />
      </Modal>
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
          <li onClick = {handleLoginModal}>
            {props.user ? "Kijelentkezés" : "Bejelentkezés"}
          </li>
        </ul>
      </div>
    </React.Fragment>
  )

};

export default Navigation

