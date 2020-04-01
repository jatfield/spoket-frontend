import React from 'react';

import { useFetch } from '../../hooks/request-hook';
import FacebookButton from './FacebookButton';

const Auth = (props) => {

  const {sendRequest} = useFetch();

  const handleFacebookLogin = async (fbId, expiresIn, fbToken) => {
    let responseData;
    try {
      responseData = await sendRequest(`${process.env.REACT_APP_API_SERVER}/api/riders/byfb`, 'GET', null, {'Authentication': `token ${fbToken}`});
    } catch (error) {
      console.log(error); 
    }
    props.login(true, fbId, new Date(Date.now() + expiresIn * 1000), fbToken, responseData.rider._id);
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