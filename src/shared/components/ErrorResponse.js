import React from 'react';
import './ErrorResponse.css'

const ErrorResponse = (props) => {

  return (<p className = "error_response" onClick = {props.errorClickHandler}><span className= "error_response__title">Hiba:</span> {props.error}</p>)

}

export default ErrorResponse