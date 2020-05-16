import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UserPage from './components/UserPage/UserPage';
import Navbar from './components/Navbar/Navbar';
import './App.scss';

const App = () => {
  return (
    <div>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/amqprogress' exact render={() => <div>Home page</div>} />
          <Route path='/amqprogress/:username' component={UserPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
