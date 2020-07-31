import React from 'react';
import Modal from '../Modal/Modal';
import './LoginModal.scss';

type LoginProps = {
  isOpen: boolean
}

const Login = (props: LoginProps) => {
  return (
    <Modal isOpen={props.isOpen}>
      <div className='login-container'>
        hello world
      </div>
    </Modal>
  )
}

export default Login;