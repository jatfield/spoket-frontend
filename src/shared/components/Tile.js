import React from 'react';

import './Tile.css'

const Tile = (props) => {
  return (
  <div className="tile">
    {props.imageUrl && 
      <div className="tile__image">
        <img src = {props.imageUrl} alt = {props.imageAlt}/>
      </div>}
    <div className="tile__body">{props.children}</div> 
    <div className={props.ticked ? "tile__button--active" : "tile__button"} onClick = {props.tileButtonHandler}>√</div>
  </div>
  )
};

export default Tile;