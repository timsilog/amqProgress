import React, { useState } from 'react';
import './Navbar.scss';
import { useHistory } from 'react-router-dom';

const Navbar = () => {
  const [searchText, setSearchText] = useState('');
  const history = useHistory();
  console.log(history);

  const submit = e => {
    // e.preventDefault();
    history.push(`/amqprogress/${searchText}`);
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

export default Navbar;