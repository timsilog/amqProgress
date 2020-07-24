import React, { useState } from 'react';
import './Navbar.scss';
import { Link, useHistory, withRouter } from 'react-router-dom';
import LoginModal from '../Login/LoginModal';
import { clearErrors } from '../../actions/authActions';

const Navbar = () => {
  const [searchText, setSearchText] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const history = useHistory();

  const submit = () => {
    history.push(`/users/${searchText}`);
  }

  const toggleModalOpen = () => {
    if (!modalOpen) {
      setModalOpen(true);
      document.body.style.position = 'fixed';
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      setModalOpen(false);
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
  }

  return (
    <div>
      <nav id='navbar'>
        <Link to='/' id='home-button'>AMQ Progress Tracker</Link>
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
          <Link to='/register'>Register</Link>
          <Link to='/login'>Login</Link>
          {/* <div onClick={toggleModalOpen} id='login-link'>Login</div> */}
        </div>
      </nav>
      {/* <LoginModal isOpen={modalOpen} /> */}
    </div>
  )
}

export default withRouter(Navbar);