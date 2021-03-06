import React from 'react';

import { useFetch } from '../../hooks/request-hook';
import FacebookButton from './FacebookButton';

const Auth = (props) => {

  const {errorResponse, sendRequest} = useFetch();

  const handleFacebookLogin = async (fbId, expiresIn, fbToken) => {
    let responseData;
    try {
      responseData = await sendRequest(`${process.env.REACT_APP_API_SERVER}/api/riders/login`, 'GET', null, {'Authentication': `token ${fbToken}`});
    } catch (error) {
      console.log(error); 
    }
    const fbExpiry = new Date(Date.now() + expiresIn * 1000);
    const expiry = new Date(Date.now() + 24 * 3600 * 1000) < fbExpiry ? new Date(Date.now() + 24 * 3600 * 1000) : fbExpiry;
    
    if (errorResponse) {
      alert(errorResponse)
    } else {
      console.log(responseData)
      props.login(true, fbId, expiry, fbToken, responseData.token, responseData.rider._id, responseData.rider.email);
      props.onComplete();
    }
  };

  const handleFacebookLogout = () => {
    props.logout();
    props.onComplete();
  };

  return (
    <FacebookButton 
      login = {handleFacebookLogin}
      logout = {handleFacebookLogout} 
      user = {props.user}
    />
  )
};

export default Auth;