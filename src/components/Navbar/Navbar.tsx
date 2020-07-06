import React, { useState } from 'react';
import './Navbar.scss';
import { Link, useHistory, withRouter } from 'react-router-dom';

const Navbar = () => {
  const [searchText, setSearchText] = useState('');
  const history = useHistory();

  const submit = () => {
    history.push(`/${searchText}`);
  }

  return (
    <nav id='navbar'>
      <Link to='/' id='home'>AMQ Progress Tracker</Link>
      <div id='search'>
        <div className='inline'>Search for user:</div>
        <form
          onSubmit={submit}>
          <input type='text'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value)}
          />
        </form>
      </div>
    </nav>
  )
}

export default withRouter(Navbar);