import React from 'react';
import { Route, Router, Switch } from 'react-router';
import applicationHistory from '../History';
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
          {/* <Route path="/login" exact={true} component={LoginPage} /> */}
          <Route path="/" exact={true} component={Dashboard} />
          <Route path="/songs" exact={true} component={Songs} />
        </Switch>
      </div>
    </div>
  </Router>
);