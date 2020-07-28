import React, { useState } from 'react';
import './Navbar.scss';
import { Link, useHistory, withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
// import LoginModal from '../Login/LoginModal';
import { clearErrors } from '../../actions/authActions';
import { Auth } from '../../types';

interface NavbarProps extends RouteComponentProps {
  auth: Auth,
  clearErrors: Function
}

const Navbar = (props: NavbarProps) => {
  const [searchText, setSearchText] = useState('');
  // const [modalOpen, setModalOpen] = useState(false);
  const history = useHistory();

  const submit = () => {
    history.push(`/users/${searchText}`);
  }

  // const toggleModalOpen = () => {
  //   if (!modalOpen) {
  //     setModalOpen(true);
  //     document.body.style.position = 'fixed';
  //     document.body.style.top = `-${window.scrollY}px`;
  //   } else {
  //     setModalOpen(false);
  //     const scrollY = document.body.style.top;
  //     document.body.style.position = '';
  //     document.body.style.top = '';
  //     window.scrollTo(0, parseInt(scrollY || '0') * -1);
  //   }
  // }

  const emptyErrors = () => {
    props.clearErrors();
  }

  return (
    <div>
      <nav id='navbar'>
        <Link to='/' id='home-button' onClick={emptyErrors}>AMQ Progress Tracker</Link>
        <div id='right-nav'>
          <div id='search'>
            <div className='inline'>Search for user:</div>
            <form
              onSubmit={submit}>
              <input type='text'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value)}
              />
            </form>
          </div>
          {
            props.auth.isAuthenticated
              ? <Link to='/dashboard'>Profile</Link>
              : [<Link to='/register' onClick={emptyErrors} key='registerLink'>Register</Link>,
              <Link to='/login' onClick={emptyErrors} key='loginLink'>Login</Link>]
          }
          {/* <div onClick={toggleModalOpen} id='login-link'>Login</div> */}
        </div>
      </nav>
      {/* <LoginModal isOpen={modalOpen} /> */}
    </div>
  )
}

const mapStateToProps = (state: any) => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { clearErrors }
)(withRouter(Navbar));