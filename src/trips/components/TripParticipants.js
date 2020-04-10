import React, { useEffect } from 'react';
import { useFetch } from '../../hooks/request-hook';
import { useState } from 'react';
import LoadingSpinner from '../../shared/components/LoadingSpinner';
import Participant from './Participant';

const TripParticipants = (props) => {

  const {isLoading, sendRequest} = useFetch();
  const [riders, setRiders] = useState({applicants: [], participants: []});
  const [approved, setApproved] = useState([]);

  useEffect (()=> {
    const getRiders = async () => {
      let responseData;
      try {
        responseData = await sendRequest(`${process.env.REACT_APP_API_SERVER}/api/trips/${props.trip._id}/participants`, 'GET', null, {'Authentication': `token ${props.user.fbToken} id ${props.user.spoketId}`});
      } catch (error) {
        console.log(error);
      }     
      setRiders(responseData.riders);
    };
    getRiders();
  }, [sendRequest, props.user, props.trip]);

  const approveButtonHandler = (riderId) => {
    setApproved(() => approved.find((a) => a === riderId) ? approved.filter((a) => a !== riderId) : [...approved, riderId]);
  };

  const handleMessageBoxSubmit = async () => {
    try {
      const decided = [];
      riders.applicants.map((r) => decided.push(r._id));
      const responseData = await sendRequest(`${process.env.REACT_APP_API_SERVER}/api/wheels/approval`, 'POST', JSON.stringify({approved, decided}), {'Content-Type':'application/json', 'Authentication': `token ${props.user.fbToken}`});
      setRiders(() => {
        const newApplicants = riders.applicants.filter((a) => responseData.applicants.indexOf(a._id) === -1);
        const newParticipants = riders.participants.filter((a) => responseData.participants.indexOf(a._id) === -1);
        return {applicants: newApplicants, participants: newParticipants}
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner />}
      {!isLoading && riders && <div className="trip_riders">
        {riders.applicants.length && <div className = "riders"></div>}
        <div className="trip_riders__participants">{riders.participants.map((p) => <Participant participant = {p} key = {p._id}/> )}</div>
      </div>} 
    </React.Fragment>)

};

export default TripParticipants;