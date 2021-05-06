import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import UserPage from './components/UserPage/UserPage';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import MediaPlayer from './components/MediaPlayer/MediaPlayer';
import Register from './components/Register/Register';
import LoginPage from './components/Login/LoginPage';
import './App.scss';
import { Provider } from 'react-redux';
import store from './store';
import '../node_modules/materialize-css/dist/css/materialize.min.css';
import '../node_modules/materialize-css/dist/js/materialize.min.js';

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Dashboard from "./components/Dashboard/Dashboard";
import UserSearch from './components/UserSearch/UserSearch';

interface MyToken {
  name: string;
  exp: number;
}

// Check for token to keep user logged in
if (localStorage.jwtToken && localStorage.jwtToken !== 'undefined') {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded: MyToken = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}
const App = () => {
  return (
    <Provider store={store}>
      <Router basename='/'>
        <Navbar />
        <Switch>
          <Route path='/' exact render={() => <Home />} />
          <Route path='/users/progress/:username' render={props => <UserPage key={props.match.params.username}></UserPage>} />
          <Route exact path='/users/search' render={() => <UserSearch query=''></UserSearch>} />
          <Route path='/users/search/:query' render={props => <UserSearch query={props.match.params.query}></UserSearch>} />
          <Route path='/register' render={() => <Register />} />
          <Route path='/login' render={() => <LoginPage />} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
        </Switch>
        {/* <MediaPlayer /> */}
      </Router>
    </Provider>
  );
}

export default App;
