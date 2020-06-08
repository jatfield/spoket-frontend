import React, { useEffect, useState } from 'react';

const FacebookButton = (props) => {
//fbready to custom hook
  const [fbReady, setFbReady] = useState(false);

  const faceBookLogin = () => {
    window.FB.login((response) => {         
      response.status === "connected" && props.login(response.authResponse.userID, response.authResponse.expiresIn, response.authResponse.accessToken);
    }, {scope: 'email'});
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
      window.FB.getLoginStatus();    
    }
  }, [fbReady, props]);

  return (
    <React.Fragment>
      {(props.user) &&
        <button onClick = {faceBookLogout}>Kijelentkezés</button>}
      {(!props.user) &&
        <button onClick = {faceBookLogin}>Bejelentkezés</button>}
    </React.Fragment>
  )
}

export default FacebookButton;