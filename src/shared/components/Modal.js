import React from 'react';
import ReactDOM from 'react-dom';

import './Modal.css';

const Modal = (props) => {

  const content = (
    <React.Fragment>
      <div className = "modal__container" >
        <div className="modal__header" onClick = {props.onCancel}>
          <div className="modal__header__title">{props.title && <h3>{props.title}</h3>}</div>
          <div className="modal__header__close">x</div>
        </div>
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