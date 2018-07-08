import * as React from 'react';
import { Route, Router, Switch } from 'react-router';
import LoginPage from './LoginPage/LoginPage';
import { Link } from 'react-router-dom';
import applicationHistory from '../History';
import PrivateRoute from './Utilities/PrivateRoute';
import Dashboard from './Dashboard/Dashboard';

export const App = () => (
  <Router history={applicationHistory.history}>
    <div className="app">
      <div className="navigation"><Link to={'/login'}>Login</Link></div>
      <Switch>
        <Route path="/login" exact={true} component={LoginPage}/>
        <PrivateRoute path="/" exact={true} component={Dashboard}/>
      </Switch>
    </div>
  </Router>
);