import React, { useState, useEffect } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { AmqUser } from '../../types';
import './UserSearch.scss';
import Loader from 'react-loader-spinner';

const url = `https://serene-temple-88689.herokuapp.com`

interface UserSearchProps extends RouteComponentProps {
  query: string
}

const UserSearch = (props: UserSearchProps) => {
  const [query, setQuery] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<AmqUser[]>([]);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (query !== props.query) {
      getUsers();
    }
  });

  const getUsers = () => {
    fetch(`${url}/users?username=${props.query}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.users.length === 1) {
          props.history.push(`/users/progress/${data.users[0].username}`)
        } else {
          setIsLoading(false);
          setQuery(props.query);
          setSearchResults(data.users);
        }
      })
      .catch(err => {
        console.log('error');
        console.log(err);
        setError(err);
      })
  }

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.history.push(`/users/search/${search}`);
  }

  const goToUser = async (e: any) => {
    props.history.push(`/users/progress/${e.currentTarget.dataset.user}`)
  }

  if (isLoading) {
    return (
      <div id='loader'>
        <Loader type="Hearts" color="#E06E77" height={100} width={100} />
          Getting Users
      </div>
    )
  } else {
    return (
      <div className='container overwrite-height'>
        <div id='user-search-container'>
          <h1>Browse Users</h1>
          <form onSubmit={handleSearchSubmit}>
            <input id='user-search-input'
              type='text'
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
              value={search}
            />
            <input type='submit' value='Search' />
          </form>
          <table>
            <tbody>
              <tr className='gray'><td>USER</td></tr>
              {searchResults.map(user =>
                <tr
                  key={user.username}
                  data-user={user.username}
                  className='user-row'
                  onClick={goToUser}>
                  <td>{user.displayName ? user.displayName : user.username}</td>
                </tr>)}
            </tbody>
          </table>
        </div >
      </div>
    )
  }
}

export default withRouter(UserSearch);