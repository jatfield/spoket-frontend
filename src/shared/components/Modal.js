import React from 'react';
import ReactDOM from 'react-dom';

import './Modal.css';

const Modal = (props) => {

  const content = (
    <div className = "modal" >
      <h2 onClick = {props.onCancel}>Tralala</h2>
      <div className = "modal__body">
        {props.body || props.children}
      </div>
    </div>
  )
  return props.show && ReactDOM.createPortal(content, document.getElementById('modal-hook'))
}

export default Modal;