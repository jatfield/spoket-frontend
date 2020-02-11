import React, { useEffect, useState } from 'react';

const FacebookButton = (props) => {
//fbready to custom hook
  const [fbStatus, setFbStatus] = useState();
  const [fbReady, setFbReady] = useState(false);

  useEffect(() => {
    document.addEventListener('FBObjectReady', setFbReady(true));
    return () => {
      document.removeEventListener('FBObjectReady', setFbReady(false));
    };
  }, []);

  useEffect(() => {
    if (fbReady) {
    window.FB.getLoginStatus((response) => {
      setFbStatus(response.status);      
    });    

    }
  }, [fbReady]);

  const faceBookLogin = () => {
    window.FB.login((response) => {
      setFbStatus(response.status);      
      props.login(response.authResponse.userID, response.authResponse.expiresIn, response.authResponse.accessToken);
    });
  };
  const faceBookLogout = () => {
    window.FB.logout((response) => {
      setFbStatus(response.status);      
      props.logout();
    });
  };

  return (
    fbReady && fbStatus !== 'connected' ?
    <div onClick = {faceBookLogin}>Bejelentkezés</div>
    :
    <div onClick = {faceBookLogout}>Kijelentkezés</div>
  )
}

export default FacebookButton;