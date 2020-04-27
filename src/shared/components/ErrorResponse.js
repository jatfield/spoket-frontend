import React from 'react';

const ErrorResponse = (props) => {

  return (<p onClick = {props.errorClickHandler}>{props.error}</p>)

}

export default ErrorResponse