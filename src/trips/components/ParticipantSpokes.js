import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import { useFetch } from '../../hooks/request-hook';
import { useState } from 'react';
import LoadingSpinner from '../../shared/components/LoadingSpinner';
import Modal from '../../shared/components/Modal';
import Spoke from '../../wheels/components/Spoke';

const ParticipantSpokes = (props) => {

  const {isLoading, sendRequest} = useFetch();
  const [spokes, setSpokes] = useState();
  const [spot, setSpot] = useState();
  const [spoke, setSpoke] = useState();
  const [spokeModalShow, setSpokeModalShow] = useState();

  useEffect (()=> {
    const getSpokes = async () => {
      let responseData;
      try {
        responseData = await sendRequest(`${process.env.REACT_APP_API_SERVER}/api/spokes/${props.wheel._id}`, 'GET', null, {'Authentication': `token ${props.user.spokeToken}`});
      } catch (error) {
        console.log(error);
      }     
      setSpokes(responseData.spokes);
    };
    getSpokes();
  }, [sendRequest, props.user, props.wheel]);

  const handleSpokeModalClick = (event) => {
    if (event.target.getAttribute('data-spot')) {
      setSpot(JSON.parse(event.target.getAttribute('data-spot')));
      setSpoke(JSON.parse(event.target.getAttribute('data-spoke')));
      setSpokeModalShow(true);
    }
  };

  const hideSpokeModal = () => {
    setSpokeModalShow(false);
  };

  return (
    <React.Fragment>
      {spoke && spokeModalShow &&
        <Modal show = {spokeModalShow} onCancel = {hideSpokeModal} title = {`${spot.name} - látogatás`}>
          <Spoke wheel = {props.wheel} spot = {spot} spoke = {spoke} user = {props.user}/>
        </Modal>
      }
      {isLoading && <LoadingSpinner />}
      {!isLoading && spokes && <div className = 'participant__spokes'>
        {spokes.map ((spoke) => 
        <div className = 'participant__spoke' onClick = {handleSpokeModalClick} key = {spoke._id} data-spot = {JSON.stringify(spoke.spot)} data-spoke = {JSON.stringify(spoke)}>
            {spoke.spot.name} {dayjs(spoke.verifiedAt).format('YYYY.MM.DD. HH:mm')}</div>)}
        </div>
      }
    </React.Fragment>
  );
};

export default ParticipantSpokes;