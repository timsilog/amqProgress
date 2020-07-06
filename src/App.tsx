import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import UserPage from './components/UserPage/UserPage';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import './App.scss';

const App = () => {
  return (
    <div>
      <Router basename='/'>
        <Navbar />
        <Switch>
          <Route path='/' exact render={() => <Home />} />
          <Route path='/:username' render={props => <UserPage key={props.match.params.username}></UserPage>} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
