import React, { useState } from 'react';
import './Navbar.scss';
import { useHistory, withRouter } from 'react-router-dom';

const Navbar = () => {
  const [searchText, setSearchText] = useState('');
  const history = useHistory();

  const submit = () => {
    history.push(`/${searchText}`);
  }

  return (
    <nav id='navbar'>
      Search for user:
      <form
        onSubmit={submit}>
        <input type='text'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value)}
        />
      </form>
    </nav>
  )
}

export default withRouter(Navbar);