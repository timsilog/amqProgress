import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import './Register.scss';
import { registerUser, clearErrors } from "../../actions/authActions";
import { AccountError, Auth } from '../../types';
import { AppState } from '../../reducers';

interface RegisterProps extends RouteComponentProps {
  registerUser: Function,
  clearErrors: Function,
  auth: Auth,
  errors: AccountError,
};

const Register = (props: RegisterProps) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [pw2, setPw2] = useState('');

  useEffect(() => {
    if (props.auth.isAuthenticated) {
      props.history.push("/dashboard");
    }
  })

  const onSubmit = (e: any) => {
    e.preventDefault();
    const newUser = {
      username,
      email: email,
      password: pw,
      password2: pw2
    };
    props.registerUser(newUser, props.history);
  };

  const emptyErrors = () => {
    props.clearErrors();
  }

  return (
    <div className='container'>
      <div className='form-container'>
        <div className='header' >
          <div className='title'><b>Register</b> below</div>
          <p className='already'>
            Already have an account? <Link to='/login' onClick={emptyErrors}>Log in</Link>
          </p>
        </div>
        <form noValidate onSubmit={onSubmit}>
          <div className='input-field'>
            <label htmlFor='email'>Email</label>
            <span className="error-text">{props.errors.email}</span>
            <input
              onChange={(e: any) => setEmail(e.target.value)}
              value={email}
              // error={props.errors.email}
              id='email'
              type='email'
              className={props.errors.email ? '' : 'invalid'}
            />
          </div>
          <div className='input-field'>
            <label htmlFor='username'>Username</label>
            <span className="error-text">{props.errors.username}</span>
            <input
              onChange={(e: any) => setUsername(e.target.value)}
              value={username}
              // error={props.errors.username}
              id='username'
              type='text'
              className={props.errors.username ? '' : 'invalid'}
            />
          </div>
          <div className='input-field'>
            <label htmlFor='pw'>Password</label>
            <span className="error-text">{props.errors.password}</span>
            <input
              onChange={(e: any) => setPw(e.target.value)}
              value={pw}
              // error={props.errors.password}
              id='pw'
              type='password'
              className={props.errors.password ? '' : 'invalid'}
            />
          </div>
          <div className='input-field'>
            <label htmlFor='pw2'>Confirm Password</label>
            <span className="error-text">{props.errors.password2}</span>
            <input
              onChange={(e: any) => setPw2(e.target.value)}
              value={pw2}
              // error={props.errors.password2}
              id='pw2'
              type='password'
              className={props.errors.password2 ? '' : 'invalid'}
            />
          </div>
          <button
            type='submit'
            className='submit-button'
          >
            Sign up
                </button>
        </form>
      </div>
    </div>
  );
}

const mapStateToProps = (state: AppState) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser, clearErrors }
)(withRouter(Register));
