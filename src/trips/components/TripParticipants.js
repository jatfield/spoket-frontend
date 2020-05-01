import React, { useEffect } from 'react';
import { useFetch } from '../../hooks/request-hook';
import { useState } from 'react';
import LoadingSpinner from '../../shared/components/LoadingSpinner';
import Participant from './Participant';
import './TripParticipants.css'

const TripParticipants = (props) => {

  const {isLoading, sendRequest} = useFetch();
  const [riders, setRiders] = useState({applicants: [], participants: []});
  const [approved, setApproved] = useState([]);

  useEffect (()=> {
    const getRiders = async () => {
      let responseData;
      try {
        responseData = await sendRequest(`${process.env.REACT_APP_API_SERVER}/api/trips/${props.trip._id}/participants`, 'GET', null, {'Authentication': `token ${props.user.spokeToken}`});
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

  const handleApprovalSubmit = async (e) => {
    e.preventDefault();
    try {
      const decided = [];
      riders.applicants.map((r) => decided.push(r.wheel));
      await sendRequest(`${process.env.REACT_APP_API_SERVER}/api/wheels/approval`, 'POST', JSON.stringify({trip: props.trip, approved, decided}), {'Content-Type':'application/json', 'Authentication': `token ${props.user.spokeToken}`});
      props.approvalSent();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner />}
      {!isLoading && riders && <div className="trip_riders">
        <div className="trip_riders__participants">
          <h4>Résztvevők:</h4>
          {riders.participants.map((p) => <Participant participant = {p} key = {p._id}  role = 'participant'/> )}
        </div>
        {riders.applicants.length > 0 && <div className="trip_riders__applicants">
          <h4>Jelentkezők:</h4>
          {riders.applicants.length && riders.applicants.map((p) => 
            <Participant 
              participant = {p} 
              key = {p._id} 
              approveButtonHandler = {approveButtonHandler} 
              role = 'applicant'
              ticked = {!!approved.find((a) => a === p.wheel)}  /> )}
          <div className="applicants__send">
            <button onClick = {handleApprovalSubmit}>Küldés</button>
          </div>
        </div>}
      </div>} 
    </React.Fragment>)

};

export default TripParticipants;