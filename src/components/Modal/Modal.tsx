import React from 'react';
import './Modal.scss';

// ts type would use FunctionComponent<proptype>
const Modal = (props: any) => {
  return (
    <div className={`modal${props.isOpen ? '' : ' hidden'}`}>
      {props.children}
    </div>
  )
}

export default Modal;