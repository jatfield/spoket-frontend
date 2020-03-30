import React, { useEffect, useState } from 'react';

import {useFetch} from '../../hooks/request-hook'
import SpotMap from '../../trips/components/SpotMap';
import Modal from '../../shared/components/Modal';
import SpokeMap from '../components/SpokeMap';
import { NavLink } from 'react-router-dom';

import './Wheels.css'
import Spots from '../components/Spots';

const Wheels = (props) => {

  const [loadedWheels, setLoadedWheels] = useState();
  const {isLoading, sendRequest} = useFetch();
  const [clickedSpot, setClickedSpot] = useState();
  const [spotModalShow, setSpotModalShow] = useState(false);
  const [spokeModalShow, setSpokeModalShow] = useState(false);
  const [upload, setUpload] = useState({});
  const [imageData, setImageData] = useState({});

  useEffect (() => {
    const getWheel = async () => {
      try {
        const responseData = await sendRequest(`${process.env.REACT_APP_API_SERVER}/api/wheels/rider`, 'GET', null, {'Authentication': `token ${props.user.fbToken}`});
        setLoadedWheels(responseData.wheels)
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

  const onImageInput = (spot, image) => {
    setUpload({spot, image});
  }

  const uploadImg = async (wheel) => {
    if (upload.image) {
    const formData = new FormData();
    
    formData.append('image', upload.image);
    formData.append('spot', JSON.stringify({location: upload.spot.location, _id: upload.spot._id, wheel}));
      try {
        const responseData = await sendRequest(`${process.env.REACT_APP_API_SERVER}/api/spokes`, 'POST', formData, {'Authentication': `token ${props.user.fbToken}`});
        if (responseData.gps === "N/A") {
          throw new Error("No GPS");
        }
        setImageData({spoke: responseData.spoke, distance: responseData.distance});
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
        <SpokeMap spokeData = {imageData} spotData = {upload.spot}/>
      </Modal>
      {isLoading && !loadedWheels &&
      <h2>loading...</h2>}
      {!isLoading && !loadedWheels &&
      <div>
        <h2>Fel kéne venni egy túrát!</h2>
        <NavLink to = '/trips'>Túralista</NavLink>
      </div>}
      {!isLoading && loadedWheels &&
      <div className = "wheels">
        {loadedWheels.map((wheel) => 
        <div className="wheel" key = {wheel._id} >
          <div className="wheel__tripdata">
            {wheel.trip.name}
          </div>
          <div className="wheels__spots">
            <Spots wheel = {wheel} spotClickHandler = {spotClickHandler} onImageInput = {onImageInput} uploadImg = {uploadImg} />
          </div>
        </div>
        )}
      </div>}
    </React.Fragment>
  );
};

export default Wheels;