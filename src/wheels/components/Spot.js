import React from 'react';
import {useFetch} from '../../hooks/request-hook'
import { useState } from 'react';
import ImageUpload from '../../shared/components/ImageUpload';
import Modal from '../../shared/components/Modal';
import LoadingSpinner from '../../shared/components/LoadingSpinner';
import SpotMap from '../../trips/components/SpotMap';
import Spoke from './Spoke';
import dayjs from 'dayjs';
import { ReactComponent as AddSpokeIcon } from '../../shared/images/add_location-24px.svg';
import { ReactComponent as EditSpokeIcon } from '../../shared/images/edit_location-24px.svg';
import { ReactComponent as UnVerifiedSpokeState } from '../../shared/images/not_listed_location-24px.svg';
import { ReactComponent as VerifiedSpokeState } from '../../shared/images/place-24px.svg';
import { ReactComponent as ShowSpotIcon } from '../../shared/images/map-24px.svg';
import './Spot.css'
import ErrorResponse from '../../shared/components/ErrorResponse';

const Spot = (props) => {

  const {errorResponse, clearError, isLoading, sendRequest} = useFetch();
  const [spoke, setSpoke] = useState(() => {
    const spoke = props.wheel.spokes.find((spoke) => spoke.spot === props.spot._id);
    return(spoke)
  });
  const [imageUploadShow, setImageUploadShow] = useState(false);
  const [upload, setUpload] = useState({});
  const [spokeModalShow, setSpokeModalShow] = useState(false);
  const [clickedSpot, setClickedSpot] = useState();
  const [spotMapModalShow, setSpotMapModalShow] = useState(false);


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
        responseData.spoke.visit = responseData.spoke.updatedAt && `Látogatás rögzítve: ${dayjs(responseData.spoke.updatedAt).format('YYYY.MM.DD HH:mm')}`;
        responseData.spoke.verification = responseData.spoke.verifiedAt && `Látogatás igazolva: ${dayjs(spoke.verifiedAt).format('YYYY.MM.DD HH:mm')}`;
        
        setSpoke(responseData.spoke);
        setImageUploadShow(false);
      } catch (error) {
        console.log("Sikertelen képfeldolgozás", error);
      }
    }
  };

  const handleImageUploadClick = () => {
    if (imageUploadShow) hideImageUploadModal();
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
      <Modal show = {imageUploadShow} onCancel = {hideImageUploadModal}>
        <ImageUpload onInput = {onImageInput} onSubmit = {handleUploadButton} />
        {errorResponse && <ErrorResponse errorClickHandler = {errorClickHandler} error = {errorResponse} />}
        {isLoading && <LoadingSpinner />}
      </Modal>
      <Modal show = {spokeModalShow} onCancel = {hideSpokeModal}>
        <Spoke wheel = {props.wheel} spot = {props.spot} spoke = {spoke} handleImageUploadClick = {handleImageUploadClick} user = {props.user}/>
      </Modal>
      <Modal show = {spotMapModalShow} onCancel = {hideSpotMapModal} title = {clickedSpot ? clickedSpot.name : ""}>
        <SpotMap spot = {clickedSpot}/>
      </Modal>
      <div className ="wheel__spot" key = {props.spot._id}>
        <h3 onClick = {spotClickHandler} className="wheel_spot__name">{props.spot.name}</h3>
        <div className="wheel_spot__icons">
          <ShowSpotIcon onClick = {spotClickHandler} transform = "scale(1.5)" className = "spot_icon--clickable" />
          {spoke ? 
          <div className="wheel_spot__spoke_controls">
            {<EditSpokeIcon onClick = {spokeClickHandler} className = "spot_icon--clickable" transform = "scale(1.5)"/>}{spoke.visit}
            {spoke.verifiedAt ? <VerifiedSpokeState className = "verified_spoke_state_icon" transform = "scale(1.5)"/> : <UnVerifiedSpokeState className = "unverified_spoke_state_icon" transform = "scale(1.5)"/> }{spoke.verification}
          </div> : 
          <AddSpokeIcon onClick = {spokeClickHandler} className = "spot_icon--clickable" transform = "scale(1.5)"/>}
        </div> 
      </div>
    </React.Fragment>
  )

};

export default Spot;