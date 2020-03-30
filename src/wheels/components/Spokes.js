import React from 'react';
import ImageUpload from '../../shared/components/ImageUpload';
import Modal from '../../shared/components/Modal';
import SpokeMap from '../components/SpokeMap';
import { useState } from 'react';
import {useFetch} from '../../hooks/request-hook'
import LoadingSpinner from '../../shared/components/LoadingSpinner';

const Spokes = (props) => {

  const [imageUploadShow, setImageUploadShow] = useState(false);
  const [spokeToUpload, setSpokeToUpload] = useState();
  const [spokeModalShow, setSpokeModalShow] = useState(false);
  const [upload, setUpload] = useState({});
  const {isLoading, sendRequest} = useFetch();
  const [imageData, setImageData] = useState({});

  const hideSpokeModal = () => {
    setSpokeModalShow(false);
    setSpokeToUpload(null);
    setImageUploadShow(false);
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
  };

  const handleUploadButton = (event) => {
    event.preventDefault();
    uploadImg(props.wheel._id)
  };

  const handleImageUploadClick = (spoke) => {
    if (imageUploadShow) hideImageUploadModal();
    setSpokeToUpload(spoke);
    setImageUploadShow(true);
  }

  const hideImageUploadModal = () => {
    setSpokeToUpload(null);
    setImageUploadShow(false);
  }

  return (
    <React.Fragment>
      <Modal show = {imageUploadShow} onCancel = {hideImageUploadModal}>
        <ImageUpload onInput = {onImageInput} onSubmit = {handleUploadButton} spot = {spokeToUpload}/>
        {isLoading && <LoadingSpinner />}
      </Modal>
      <Modal show = {spokeModalShow} onCancel = {hideSpokeModal}>
        <SpokeMap spokeData = {imageData} spotData = {upload.spot}/>
      </Modal>
    <div className="wheels__spots">
      {props.wheel.trip.spots.map((spot) => 
        <div className ="trip__point" key = {spot._id}>
          <h2 onClick = {() => props.spotClickHandler(spot)}>{spot.name}</h2>
          <p onClick = {() => handleImageUploadClick(spot)}>Feltöltöm a küllőüt!</p>
        </div>)}
    </div>

    </React.Fragment>
  )
};

export default Spokes;