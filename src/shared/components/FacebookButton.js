import React, { useEffect, useState } from 'react';

const FacebookButton = (props) => {
//fbready to custom hook
  const [fbStatus, setFbStatus] = useState("");
  const [fbReady, setFbReady] = useState(false);

  const logout = props.logout;

  const faceBookLogin = () => {
    window.FB.login((response) => {
      setFbStatus(response.status);      
      response.status === "connected" && props.login(response.authResponse.userID, response.authResponse.expiresIn, response.authResponse.accessToken);
    });
  };

  const faceBookLogout = () => {
    window.FB.logout((response) => {
      setFbStatus(response.status);      
      logout();
    });
  };

  useEffect(() => {
    document.addEventListener('FBObjectReady', setFbReady(true));
    return () => {
      document.removeEventListener('FBObjectReady', setFbReady(false));
    };
  }, []);

  useEffect(() => {
    if (fbReady && window.FB) {
      window.FB.getLoginStatus((response) => {
        response.status !== "connected" && logout();
        setFbStatus(response.status);
      });    
    }
  }, [fbReady, logout]);

  return (
    <React.Fragment>
      {(fbStatus === "connected" && props.user.isLoggedIn) &&
        <div onClick = {faceBookLogout}>Kijelentkezés</div>}
      {(fbStatus !== "connected" || !props.user.isLoggedIn) &&
        <div onClick = {faceBookLogin}>Bejelentkezés</div>}
    </React.Fragment>
  )
}

export default FacebookButton;