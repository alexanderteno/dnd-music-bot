import React, { useState } from 'react';
import { Route, Router, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import applicationHistory from '../History';
import LoginPage from './LoginPage/LoginPage';
import PrivateRoute from './Utilities/PrivateRoute';
import Dashboard from './Dashboard/Dashboard';
import Songs from './Songs/Songs';
import ChannelSwitcher from './ChannelSwitcher/ChannelSwitcher';
import VolumeSlider from './VolumeSlider/VolumeSlider';
import Navigation from './Navigation/Navigation';
import './App.scss';

export const App = () => (
  <Router history={applicationHistory.history}>
    <div className="app">
      <Navigation />
      <div className="fixed">
        <VolumeSlider />
        <ChannelSwitcher />
      </div>
      <div className="content">
        <Switch>
          <Route path="/login" exact={true} component={LoginPage} />
          <PrivateRoute path="/" exact={true} component={Dashboard} />
          <PrivateRoute path="/songs" exact={true} component={Songs} />
        </Switch>
      </div>
    </div>
  </Router>
);