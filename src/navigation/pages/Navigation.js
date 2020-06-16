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
      <Modal show = {showLogin} onCancel = {hideLoginModal} title = "Azonosítás">
        <p>Az alkalmazás Facebook bejelentkezést használ, személyes adatot nem tárol. 
          <hr />
          Megőrzésre kerülő adatok: opcionálisan megadható becenév, motortípus, valamint feltöltött képek és azok metaadatai, továbbá az alkalmazás használata során keletkezett adatok.
          <hr />
          Az alkalmazásban tárolt adatok az alkalmazás Facebook profilról való leválasztása esetén törlésre kerülnek.
          <hr />
          <NavLink to="/pp" onClick = {hideLoginModal}>Részletes adatvédelmi és felhasználási információk</NavLink>
        </p>
        <Auth user = {props.user} login = {props.login} logout = {props.logout} onComplete = {hideLoginModal} />
      </Modal>
      <div className="navigation__container">
        <ul>
          {props.user && 
          <React.Fragment>
            <li>
              <NavLink to="/trips" activeClassName = "navlink--current">Kalandok</NavLink>
            </li>
            <li>
              <NavLink to="/wheels" activeClassName = "navlink--current">Kerekek</NavLink>
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

