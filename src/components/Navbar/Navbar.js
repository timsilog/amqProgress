import React, { useState } from 'react';
import './Navbar.scss';
import { useHistory, withRouter } from 'react-router-dom';

const Navbar = () => {
  const [searchText, setSearchText] = useState('');
  const history = useHistory();

  const submit = e => {
    history.push(`/${searchText}`);
  }

  return (
    <nav id='navbar'>
      Search for user:
      <form
        onChange={e => setSearchText(e.target.value)}
        onSubmit={submit}>
        <input type='text' />
      </form>
    </nav>
  )
}

export default withRouter(Navbar);