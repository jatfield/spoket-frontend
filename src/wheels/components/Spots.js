import React from 'react';
import ImageUpload from '../../shared/components/ImageUpload';

const Spokes = (props) => {

  const handleUploadButton = (event) => {
    event.preventDefault();
    props.uploadImg(props.wheel._id)
  };

  return (
      props.wheel.trip.spots.map((spot) => 
        <div className ="trip__point" key = {spot._id}>
          <h2 onClick = {() => props.spotClickHandler(spot)}>{spot.name}</h2>
          <form>
            <ImageUpload onInput = {props.onImageInput} spot = {spot}/>
            <button type = "submit" onClick = {handleUploadButton}>Feltöltöm!</button>
          </form>
        </div>)
  )
};

export default Spokes;