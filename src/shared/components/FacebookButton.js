import React, { useEffect, useState } from 'react';

const FacebookButton = (props) => {
//fbready to custom hook
  const [fbReady, setFbReady] = useState(false);

  const faceBookLogin = () => {
    window.FB.login((response) => {         
      response.status === "connected" && props.login(response.authResponse.userID, response.authResponse.expiresIn, response.authResponse.accessToken);
    });
  };

  const faceBookLogout = () => {
    window.FB.logout((response) => {
      props.logout();
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
        response.status !== "connected" && props.logout();        
      });    
    }
  }, [fbReady, props]);

  return (
    <React.Fragment>
      {(props.user) &&
        <div onClick = {faceBookLogout}>Kijelentkezés</div>}
      {(!props.user) &&
        <div onClick = {faceBookLogin}>Bejelentkezés</div>}
    </React.Fragment>
  )
}

export default FacebookButton;