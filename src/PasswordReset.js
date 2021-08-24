import React, { useState } from 'react';
import { useFetch } from './hooks/request-hook';
import {useLocation} from "react-router-dom";
import LoadingSpinner from './shared/components/LoadingSpinner';
import ErrorResponse from './shared/components/ErrorResponse';
import './PasswordReset.css';

const PasswordReset = ()  => {
    
  const {errorResponse, clearError, sendRequest, isLoading} = useFetch();
  const token = new URLSearchParams(useLocation().search).get("token");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [matchingPasswords, setMatchingPasswords] = useState(true);
  const [changeSuccessful, setChangeSuccessful] = useState(false);

    const handlePasswordInput = (event) => {
        setPassword(event.target.value);
    };

    const handlePasswordConfirmationInput = (event) => {
        setPasswordConfirmation(event.target.value);
    };

    const handlePasswordConfirmed = () => {
        setMatchingPasswords(password === passwordConfirmation)
    }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (matchingPasswords) {
      clearError()
      try {
        await sendRequest(`${process.env.REACT_APP_API_SERVER}/api/riders/setpassword`, 'PUT', JSON.stringify({password}), {'Content-Type':'application/json', 'Authentication': `token ${token}`});
        setChangeSuccessful(true);
      } catch (error) {
        console.log(error); 
      }
    }
  };
    

    return (
      <form><h2>Jelszóváltoztatás</h2>
      
      {errorResponse && 
        <ErrorResponse errorClickHandler = {clearError} error = {errorResponse === "Password change too frequent" ? "Túl sűrű jelszómódosítás, próbálja később!" : errorResponse}>
        </ErrorResponse>}
        <input type = "password" placeholder ="Új jelszó" value = {password} onChange = {handlePasswordInput}></input><br />
        <input type = "password" placeholder ="Új jelszó megerősítése" value = {passwordConfirmation} onChange = {handlePasswordConfirmationInput} onBlur = {handlePasswordConfirmed}></input><br />
        {!matchingPasswords && <h3 className = "red">Eltérő jelszók!</h3>}
        {changeSuccessful && <h3 className = "red">Sikeres jelszóváltoztatás</h3>}
        {isLoading && <LoadingSpinner />}
        <button onClick = {handleSubmit}>Küldés</button>
      </form>
    )
};

export default PasswordReset;