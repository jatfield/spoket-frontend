import React from 'react';
import {useFetch} from '../../hooks/request-hook'
import { useState } from 'react';
import ImageUpload from '../../shared/components/ImageUpload';
import Modal from '../../shared/components/Modal';
import LoadingSpinner from '../../shared/components/LoadingSpinner';
import SpotMap from '../../trips/components/SpotMap';
import Spoke from './Spoke';

const Spot = (props) => {

  const {isLoading, sendRequest} = useFetch();
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
        const responseData = await sendRequest(`${process.env.REACT_APP_API_SERVER}/api/spokes`, 'POST', formData, {'Authentication': `token ${props.user.fbToken} id ${props.user.spoketId}`});
        if (responseData.gps === "N/A") {
          throw new Error("No GPS");
        }
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

  const spotClickHandler = (spot) => {
    if (spotMapModalShow) hideSpotMapModal();
    setClickedSpot(spot);
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

  return (
    <React.Fragment>
      <Modal show = {imageUploadShow} onCancel = {hideImageUploadModal}>
        <ImageUpload onInput = {onImageInput} onSubmit = {handleUploadButton} />
        {isLoading && <LoadingSpinner />}
      </Modal>
      <Modal show = {spokeModalShow} onCancel = {hideSpokeModal}>
        <Spoke wheel = {props.wheel} spot = {props.spot} spoke = {spoke} handleImageUploadClick = {handleImageUploadClick} user = {props.user}/>
      </Modal>
      <Modal show = {spotMapModalShow} onCancel = {hideSpotMapModal} title = {clickedSpot ? clickedSpot.name : ""}>
        <SpotMap spot = {clickedSpot}/>
      </Modal>
      <div className ="wheel__spot" key = {props.spot._id}>
        <h3 onClick = {() => spotClickHandler(props.spot)}>{props.spot.name}</h3>
        {spoke ? spoke.updatedAt : "nincs látogatva"} {spoke && spoke.verifiedAt ? spoke.verifiedAt : "nincs igazolva"}
        <div className="wheel__spot__spoke_open" onClick = {spokeClickHandler}>látogatás</div>
      </div>
    </React.Fragment>
  )

};

export default Spot;