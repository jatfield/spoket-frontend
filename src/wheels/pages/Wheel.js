import React, { useEffect, useState } from 'react';

import {useFetch} from '../../hooks/request-hook'
import SpotMap from '../../trips/components/SpotMap';
import Modal from '../../shared/components/Modal';
import ImageUpload from '../../shared/components/ImageUpload';
import SpokeMap from '../components/SpokeMap';

const Wheel = (props) => {

  const [loadedWheel, setLoadedWheel] = useState();
  const {isLoading, sendRequest} = useFetch();
  const [clickedSpot, setClickedSpot] = useState();
  const [spotModalShow, setSpotModalShow] = useState(false);
  const [spokeModalShow, setSpokeModalShow] = useState(false);
  const [upload, setUpload] = useState({});
  const [imageData, setImageData] = useState({});

  useEffect (() => {
    const getWheel = async () => {
      try {
        const responseData = await sendRequest(`${process.env.REACT_APP_API_SERVER}/api/wheels/rider/${props.user.spoketId}`);
        setLoadedWheel(responseData.wheel)
      } catch (error) {}
    }
    getWheel();
  }, [sendRequest, props.user]);

  const spotClickHandler = (spot) => {
    if (spotModalShow) hideSpotModal();
    setClickedSpot(spot);
    setSpotModalShow(true);
  }

  const hideSpotModal = () => {
    setClickedSpot(null)
    setSpotModalShow(false)
  }

  const hideSpokeModal = () => {
    setSpokeModalShow(false)
  }

  const onImageInput = (spotLocation, image) => {
    setUpload({spotLocation, image});
  }

  const uploadImg = async (event) => {
    event.preventDefault();
    if (upload.image) {
    const formData = new FormData();
    
    formData.append('image', upload.image);
    formData.append('spotLocation', JSON.stringify(upload.spotLocation))
      try {
        const responseData = await sendRequest(`${process.env.REACT_APP_API_SERVER}/api/spokes`, 'POST', formData);
        if (responseData.gps === "N/A") {
          throw new Error("No GPS");
        }
        setImageData({lat: responseData.lat, lng: responseData.lng, distance: responseData.distance});
        setSpokeModalShow(true);
      } catch (error) {
        console.log("Sikertelen képfeldolgozás", error);
      }
    }
  }

  return (
    <React.Fragment>
    <Modal show = {spotModalShow} onCancel = {hideSpotModal}>
      <SpotMap spot = {clickedSpot}/>
    </Modal>
    <Modal show = {spokeModalShow} onCancel = {hideSpokeModal}>
      <SpokeMap spokeData = {imageData} spotData = {upload.spotLocation}/>
    </Modal>
    {isLoading && !loadedWheel &&
    <h2>loading...</h2>}
    {!isLoading && !loadedWheel &&
    <h2>Fel kéne venni egy túrát!</h2>}
    {!isLoading && loadedWheel &&
    <div className = "trip">
      {loadedWheel.trip.spots.map((spot) => <div className ="trip__point" key = {spot._id}>
        <h2  onClick = {() => spotClickHandler(spot)}>{spot.name}</h2>
        <form>
          <ImageUpload onInput = {onImageInput} spotLocation = {spot.location}/>
          <button type = "submit" onClick = {uploadImg}>Feltöltöm!</button>
        </form>
        </div>
      )}
    </div>}
    
  </React.Fragment>
  );
};

export default Wheel;