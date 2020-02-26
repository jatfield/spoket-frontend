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
      setMessages(responseData.ridersToApprove);
    };
    props.user && getMessages();
  }, [sendRequest, props.user, sent]);

  const tileButtonHandler = (wheelId) => {
    setApproved(() => approved.find((a) => a === wheelId) ? approved.filter((a) => a !== wheelId) : [...approved, wheelId]);
    console.log(approved);
  };

  const handleMessageBoxSubmit = async () => {
    try {
      await sendRequest(`${process.env.REACT_APP_API_SERVER}/api/wheels/approval`, 'POST', JSON.stringify({approved}), {'Content-Type':'application/json', 'Authentication': `token ${props.user.fbToken}`});
      setSent((sent) => ++sent);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      {isLoading && !messages && <LoadingSpinner />}
      {!isLoading && !!messages.length && 
        <div className="messagebox">
        {messages.map((message) => 
          <Tile 
            imageUrl = {message.picture.data.url} 
            imageAlt = {message.name}
            ticked = {!!approved.find((a) => a === message.wheelId)} 
            tileButtonHandler = {() => tileButtonHandler(message.wheelId)}
            key = {message.wheelId}>
            <div className = "message">
              {message.name}
              {message.tripName}
            </div>
          </Tile>
          )}
          <div className="messagebox__submit" onClick = {handleMessageBoxSubmit}>Küldés</div>
        </div>}
      
    </React.Fragment>
  )
};

export default MessageBox;