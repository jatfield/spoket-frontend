import React from 'react';

import { useFetch } from '../../hooks/request-hook';
import FacebookButton from './FacebookButton';

const Auth = (props) => {

  const {sendRequest} = useFetch();


  const handleFacebookLogin = async (fbId, expiresIn, fbToken) => {
    let responseData;
    try {
      responseData = await sendRequest(`${process.env.REACT_APP_API_SERVER}/api/riders/${fbId}`);
      //if not exist, register
    } catch (error) {
      console.log(error); 
    }
    const expiry = new Date(new Date().getTime() + (expiresIn * 1000));
    props.login(true, fbId, expiry, fbToken, responseData.spoketId);
    console.log(props.user);
  };

  const handleFacebookLogout = () => {
    props.logout()
  };

  return (
    <FacebookButton 
      login = {handleFacebookLogin}
      logout = {handleFacebookLogout} />
  )
};

export default Auth;