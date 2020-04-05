import React from 'react';
import ReactDOM from 'react-dom';

import './Modal.css';

const Modal = (props) => {

  const content = (
    <React.Fragment>
      <div className = "modal__container" >
        {props.title && <h2 onClick = {props.onCancel}>{props.title}</h2>}
        <div className = "modal__body">
          {props.body || props.children}
        </div>
      </div>
      <div className="modal__backdrop" onClick = {props.onCancel}></div>
    </React.Fragment>
  )
  return props.show && ReactDOM.createPortal(content, document.getElementById('modal-hook'))
};

export default Modal;