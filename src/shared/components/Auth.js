import React, { useEffect } from 'react';

import FacebookLogin from 'react-facebook-login';

const Auth = (props) => {

  const responseFacebook = (response) => {
    if (response.expiresIn > 0) {
      console.log(response.expiresIn);
      
      const expiry = new Date(new Date().getTime() + (response.expiresIn * 1000));
      props.login(true, response.id, expiry, "spoketId");
    }
  };

console.log(props.user);

  return (
    props.user.isLoggedIn ? 
    <div onClick = {() => props.logout()}>Logout</div> :
    <FacebookLogin
    appId = {process.env.REACT_APP_FB_APPID}
    fields = "name,email,picture"
    callback = {responseFacebook} 
    icon="fa-facebook"
    textButton= "Bejelentkezés" />
 )
};

export default Auth;