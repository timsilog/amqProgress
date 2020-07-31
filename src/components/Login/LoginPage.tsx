import React, { useState, useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import '../Register/Register.scss';
import { AccountError, Auth } from '../../types';
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import { StaticContext } from 'react-router';
import { AppState } from '../../reducers';
import './LoginPage.scss';

interface LocationState {
  justRegistered?: boolean
}

interface LoginProps extends RouteComponentProps<{}, StaticContext, LocationState> {
  loginUser: Function,
  auth: Auth,
  errors: AccountError,
}

const LoginPage = (props: LoginProps) => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [pw, setPw] = useState('');
  // const [errors, setErrors] = useState<AccountError>({});

  useEffect(() => {
    if (props.auth.isAuthenticated) {
      props.history.push("/dashboard"); // push user to dashboard when they login
    }
  }, [props.auth, props.history])

  // useEffect(() => {
  //   setErrors(props.errors);
  // }, [props.errors])

  const onSubmit = (e: any) => {
    e.preventDefault();
    const userData = {
      emailOrUsername,
      password: pw,
    };
    props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in props.history as a parameter
  };

  return (
    <div className='container'>
      <div className='form-container'>
        {props.location.state && props.location.state.justRegistered
          ? <div className='blue'>Account successfully created!</div> : ''}
        <div className='header' >
          <div className='title'><b>Login</b></div>
        </div>
        <form noValidate onSubmit={onSubmit}>
          <div className='input-field'>
            <label htmlFor='emailOrUsername'>Email or Username</label>
            <span className="error-text">
              {props.errors.emailOrUsername}
              {props.errors.accountNotFound}
            </span>
            <input
              onChange={(e: any) => setEmailOrUsername(e.target.value)}
              value={emailOrUsername}
              // error={props.errors.email}
              id='emailOrUsername'
              type='username'
              className={props.errors.emailOrUsername || props.errors.accountNotFound ? 'invalid' : ''}
            />
          </div>
          <div className='input-field'>
            <label htmlFor='pw'>Password</label>
            <span className="error-text">
              {props.errors.password}
              {props.errors.passwordIncorrect}
            </span>
            <input
              onChange={(e: any) => setPw(e.target.value)}
              value={pw}
              // error={props.errors.password}
              id='pw'
              type='password'
              className={props.errors.password || props.errors.passwordIncorrect ? 'invalid' : ''}
            />
          </div>
          <button
            type='submit'
            className='submit-button'
          >
            Login
                  </button>
        </form>
      </div>
    </div>
  );
}

// export default LoginPage;

const mapStateToProps = (state: AppState) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(withRouter(LoginPage));