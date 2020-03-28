import React from 'react';

import { useFetch } from '../../hooks/request-hook';
import FacebookButton from './FacebookButton';

const Auth = (props) => {

  const {sendRequest} = useFetch();

  const handleFacebookLogin = async (fbId, expiresIn, fbToken) => {
    let responseData;
    try {
      responseData = await sendRequest(`${process.env.REACT_APP_API_SERVER}/api/riders/byfb/${fbToken}`);
    } catch (error) {
      console.log(error); 
    }
    const expiry = new Date(new Date().getTime() + (expiresIn * 1000));
    console.log(expiry);
    
    props.login(true, fbId, expiry, fbToken, responseData.rider._id);
  };

  const handleFacebookLogout = () => {
    props.logout()
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