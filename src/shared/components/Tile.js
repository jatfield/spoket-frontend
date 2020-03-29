import React from 'react';
import { ReactComponent as Denied } from '../images/not_interested-24px.svg';
import { ReactComponent as Approved } from '../images/check_circle_outline-24px.svg';

import './Tile.css'

const Tile = (props) => {
  return (
    <div className="tile">
      {props.imageUrl && 
        <div className="tile__image">
          <img src = {props.imageUrl} alt = {props.imageAlt}/>
        </div>}
      <div className="tile__body">{props.children}</div> 
      <div className={props.ticked ? "tile__button--approved" : "tile__button--denied"} onClick = {props.tileButtonHandler}>
        {props.ticked ? <Approved /> : <Denied /> }
      </div>
    </div>
  )
};

export default Tile;