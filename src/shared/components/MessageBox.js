import React, { useState, useEffect } from 'react'
import { useFetch } from '../../hooks/request-hook';
import './MessageBox.css';
import Tile from './Tile';
import LoadingSpinner from './LoadingSpinner';

const MessageBox = (props) => {
  const [messages, setMessages] = useState(false);
  const [approved, setApproved] = useState([]);
  const [sent, setSent] = useState(0);
  const {isLoading, sendRequest} = useFetch();

  useEffect (()=> {
    const getMessages = async () => {
      let responseData;
      try {
        responseData = await sendRequest(`${process.env.REACT_APP_API_SERVER}/api/riders/messages`, 'GET', null, {'Authentication': `token ${props.user.fbToken}`});
      } catch (error) {
        console.log(error);
      }     
      setMessages(() => !!responseData.ridersToApprove.length ? {ridersToApprove:responseData.ridersToApprove} : false);
    };
    props.user && getMessages();
  }, [sendRequest, props.user, sent]);

  const tileButtonHandler = (wheelId) => {
    setApproved(() => approved.find((a) => a === wheelId) ? approved.filter((a) => a !== wheelId) : [...approved, wheelId]);
  };

  const handleMessageBoxSubmit = async () => {
    try {
      const decided = [];
      messages.ridersToApprove.map((r) => decided.push(r.wheelId));
      await sendRequest(`${process.env.REACT_APP_API_SERVER}/api/wheels/approval`, 'POST', JSON.stringify({approved, decided}), {'Content-Type':'application/json', 'Authentication': `token ${props.user.fbToken}`});
      setSent((sent) => ++sent);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      {isLoading && !messages && <LoadingSpinner />}
      {!isLoading && !!messages.ridersToApprove && 
        <div className="messagebox">
          {messages.ridersToApprove.map((rider) => 
            <Tile 
              imageUrl = {rider.picture.data.url} 
              imageAlt = {rider.name}
              ticked = {!!approved.find((a) => a === rider.wheelId)} 
              tileButtonHandler = {() => tileButtonHandler(rider.wheelId)}
              key = {rider.wheelId}>
              <div className = "message">
                {rider.name} <br />
                {rider.tripName}
              </div>
            </Tile>
          )}
          <div className="messagebox__submit" onClick = {handleMessageBoxSubmit}>Küldés</div>
        </div>}
    </React.Fragment>
  )
};

export default MessageBox;