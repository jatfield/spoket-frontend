import React, { useState } from 'react';

import { useFetch } from '../../hooks/request-hook';
import ErrorResponse from './ErrorResponse';
import LoadingSpinner from './LoadingSpinner';

const Auth = (props) => {

  const {errorResponse, clearError, sendRequest, isLoading} = useFetch();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loginMode, setLoginMode] = useState(true);
  const [mailSuccess, setMailSuccess] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault()
    let responseData;
    if (password && email) {
      try {
        responseData = await sendRequest(`${process.env.REACT_APP_API_SERVER}/api/riders/login`, 'POST', JSON.stringify({email, password}), {'Content-Type': 'application/json'});
        props.login(true, responseData.token, responseData.rider._id, responseData.rider.email);
        props.onComplete();
      } catch (error) {
        console.log(error); 
      }
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  };
  
  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handlePasswordRequest = async (event) => {
    event.preventDefault()
    if (email) {
      clearError()
      try {
        const responseData = await sendRequest(`${process.env.REACT_APP_API_SERVER}/api/riders/getresettoken/${email}`, 'GET');  
        setMailSuccess(responseData.mailSuccess);
      } catch (error) {
        console.log(error); 
      }
    }
  };

  const handleLoginModeClick = () => {
    clearError()
    setLoginMode(!loginMode)
  };

  return (
    <form>
      {errorResponse &&
        <ErrorResponse errorClickHandler = {clearError} error = {errorResponse}>
        </ErrorResponse>}
      <label>E-mail cím</label><br />
      <input type= "email" name = "email" onChange = {handleEmailChange} value = {email}></input><br />
      {loginMode && <label>Jelszó</label>}<br />
      {loginMode && <input type= "password" name = "password" onChange = {handlePasswordChange} value = {password}></input>}
      {loginMode ? <button onClick = {handleLogin}>Bejelentkezés</button> : <button onClick = {handlePasswordRequest}>Küldés</button> }<br/>
      <span className = "login_mode_switch" onClick = {handleLoginModeClick}>{loginMode ? `Jelszóvisszaállítás` : `Bejelentkezés`}</span>
      {isLoading && <LoadingSpinner />}
      {mailSuccess && <p className = "red">Jelszóvisszaállító e-mail elküldve</p>}
    </form>
  )
};

export default Auth;