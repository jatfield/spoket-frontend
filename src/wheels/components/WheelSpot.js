import React from 'react';
import {useFetch} from '../../hooks/request-hook'
import { useState } from 'react';
import ImageUpload from '../../shared/components/ImageUpload';
import Modal from '../../shared/components/Modal';
import LoadingSpinner from '../../shared/components/LoadingSpinner';
import SpotMap from '../../trips/components/SpotMap';
import Spoke from './Spoke';
import { ReactComponent as AddSpokeIcon } from '../../shared/images/add_location_alt-24px.svg';
import { ReactComponent as MissedSpokeIcon } from '../../shared/images/not_listed_location-24px.svg';
import { ReactComponent as CheckedSpokeIcon } from '../../shared/images/where_to_vote-24px.svg';
import { ReactComponent as ShowSpotIcon } from '../../shared/images/map-24px.svg';
import './WheelSpot.css'
import ErrorResponse from '../../shared/components/ErrorResponse';
import { useEffect } from 'react';

const WheelSpot = (props) => {

  const {errorResponse, clearError, isLoading, sendRequest} = useFetch();
  const [spoke, setSpoke] = useState();
  const [imageUploadShow, setImageUploadShow] = useState(false);
  const [upload, setUpload] = useState({});
  const [spokeModalShow, setSpokeModalShow] = useState(false);
  const [clickedSpot, setClickedSpot] = useState();
  const [spotMapModalShow, setSpotMapModalShow] = useState(false);

  useEffect (() => {
    setSpoke(() => !spoke ? props.wheel.spokes.find((spoke) => spoke.spot === props.spot._id) : spoke)
   }, [props.spot._id, props.wheel, spoke]);

  const uploadImg = async (wheel) => {
    if (upload.image) {
    const formData = new FormData();
    
    formData.append('image', upload.image);
    formData.append('spot', JSON.stringify({location: props.spot.location, _id: props.spot._id, wheel}));
      try {
        const responseData = await sendRequest(`${process.env.REACT_APP_API_SERVER}/api/spokes`, 'POST', formData, {'Authentication': `token ${props.user.spokeToken}`});
        if (responseData.gps === "N/A") {
          throw new Error("No GPS");
        }
        setSpoke(responseData.spoke);
        setImageUploadShow(false);
        setSpokeModalShow(true);
      } catch (error) {
        console.log("Sikertelen képfeldolgozás", error);
      }
    }
  };

  const handleImageUploadClick = () => {
    if (imageUploadShow) hideImageUploadModal();
    if (spokeModalShow) hideSpokeModal();
    setImageUploadShow(true);
  };

  const onImageInput = (image) => {
    setUpload({image});
  };

  const handleUploadButton = (event) => {
    event.preventDefault();
    uploadImg(props.wheel._id)
  };

  const hideImageUploadModal = () => {
    setImageUploadShow(false);
  };

  const spotClickHandler = () => {
    if (spotMapModalShow) hideSpotMapModal();
    setClickedSpot(props.spot);
    setSpotMapModalShow(true);
  };

  const hideSpotMapModal = () => {
    setClickedSpot(null);
    setSpotMapModalShow(false);
  };

  const spokeClickHandler = (spot) => {
    if (spokeModalShow) hideSpokeModal();
    setClickedSpot(spot);
    setSpokeModalShow(true);
  };

  const hideSpokeModal = () => {
    setSpokeModalShow(false);
  };

  const errorClickHandler = () => {
    clearError();
  };

  return (
    <React.Fragment>
      <Modal show = {imageUploadShow} onCancel = {hideImageUploadModal} title = {"Látogatás fotójának feltöltése"}>
        <ImageUpload onInput = {onImageInput} onSubmit = {handleUploadButton} />
        {errorResponse && <ErrorResponse errorClickHandler = {errorClickHandler} error = {errorResponse} />}
        {isLoading && <LoadingSpinner />}
      </Modal>
      <Modal show = {spokeModalShow} onCancel = {hideSpokeModal} title = {`${props.spot.name} - látogatás`}>
        <Spoke wheel = {props.wheel} spot = {props.spot} spoke = {spoke} handleImageUploadClick = {handleImageUploadClick} user = {props.user}/>
      </Modal>
      <Modal show = {spotMapModalShow} onCancel = {hideSpotMapModal} title = {props.spot.name} >
        <SpotMap spot = {clickedSpot} user = {props.user} trip = {props.wheel.trip}/>
      </Modal>
      <div className ={`wheel__spot ${spoke && spoke.verifiedAt ? 'spoke--verified' : 'spoke--unverified'}`} key = {props.spot._id}>
        <h3 onClick = {spotClickHandler} className="wheel_spot__name">{props.spot.name}</h3>
        <div className="wheel_spot__icons">
          <ShowSpotIcon onClick = {spotClickHandler} transform = "scale(1.5)" className = "spot_icon--clickable" />
          {spoke ? 
          <div className="wheel_spot__spoke_controls">
            {spoke.verifiedAt ? 
              <CheckedSpokeIcon onClick = {spokeClickHandler} className = {`spot_icon--clickable verified_spoke`} transform = "scale(1.5)"/> :
              <MissedSpokeIcon onClick = {spokeClickHandler} className = {`spot_icon--clickable unverified_spoke`} transform = "scale(1.5)"/>}
          </div> : 
          <AddSpokeIcon onClick = {spokeClickHandler} className = "spot_icon--clickable" transform = "scale(1.5)"/>}
        </div> 
      </div>
    </React.Fragment>
  )

};

export default WheelSpot;