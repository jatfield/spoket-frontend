import React, { useEffect, useState } from 'react';

import {useFetch} from '../../hooks/request-hook'
import SpotMap from '../../trips/components/SpotMap';
import Modal from '../../shared/components/Modal';
import ImageUpload from '../../shared/components/ImageUpload';

const Wheel = (props) => {

  const [loadedWheel, setLoadedWheel] = useState();
  const {isLoading, sendRequest} = useFetch();
  const [clickedSpot, setClickedSpot] = useState();
  const [spotModalShow, setSpotModalShow] = useState(false);
  const [upload, setUpload] = useState({});

  useEffect (() => {
    const getWheel = async () => {
      try {
        const responseData = await sendRequest(`${process.env.REACT_APP_API_SERVER}/api/wheels/${props.wId}`);
        setLoadedWheel(responseData.wheel)
      } catch (error) {}
    }
    getWheel();
  }, [sendRequest, setLoadedWheel, props.wId]);

  const spotClickHandler = (spot) => {
    if (spotModalShow) hideSpotModal();
    setClickedSpot(spot);
    setSpotModalShow(true);
  }

  const hideSpotModal = () => {
    setClickedSpot(null)
    setSpotModalShow(false)
  }

  const onImageInput = (id, image) => {
    setUpload({id, image});
  }

  const uploadImg = async (event) => {
    event.preventDefault();
    if (upload.image) {
    const formData = new FormData();
    formData.append('image', upload.image);
    const responseData = await sendRequest(`${process.env.REACT_APP_API_SERVER}/api/spokes`, 'POST', formData);
    console.log(responseData);
    }
    
  }

  return (
    <React.Fragment>
    <Modal show = {spotModalShow} onCancel = {hideSpotModal}>
      <SpotMap spot = {clickedSpot}/>
    </Modal>

    {isLoading && !loadedWheel &&
    <h2>loading...</h2>}
    {!isLoading && loadedWheel &&
    <div className = "trip">
      {loadedWheel.trip.spots.map((spot) => <div className ="trip__point">
        <h2  onClick = {() => spotClickHandler(spot)}>{spot.name}</h2>
        <form>
          <ImageUpload onInput = {onImageInput} id = {spot.id}/>
          <button type = "submit" onClick = {uploadImg}>Feltöltöm!</button>
        </form>
        </div>
      )}
    </div>}
  </React.Fragment>
  );
};

export default Wheel;