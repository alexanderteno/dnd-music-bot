import React, { useState } from 'react';
import { Route, Router, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import applicationHistory from '../History';
import LoginPage from './LoginPage/LoginPage';
import PrivateRoute from './Utilities/PrivateRoute';
import Dashboard from './Dashboard/Dashboard';
import Songs from './Songs/Songs';
import Icon from './General/Icon';
import ChannelSwitcher from './ChannelSwitcher/ChannelSwitcher';
import './App.scss';
import PlayerService from '../../services/WebApi/PlayerService';

const NAV_OPTOINS = [
  ['/', 'Dashboard'],
  ['/login', 'Login'],
  ['/songs', 'Songs'],
]

const Navigation = () => {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <div className="navigation">
      <div className="title-bar" onClick={() => setCollapsed(!collapsed)}>
        <Icon>{collapsed ? 'close' : 'menu'}</Icon>
        <div className="title">{document.title}</div>
      </div>
      {
        collapsed && (
          <div className="nav-options">
            {
              NAV_OPTOINS.map(([path, label]: [string, string]) => (
                <Link key={path} to={path} className={"nav-option" + (window.location.pathname === path ? ' active' : '')}>{label}</Link>
              ))
            }
          </div>
        )
      }
    </div>
  )
}

const getStatus = () => {
  PlayerService.getStatus()
    .then((result: any) => {
      console.log({result});
    })
}

export const App = () => (
  <Router history={applicationHistory.history}>
    <div className="app">
      <Navigation />
      <div className="fixed">
        <button onClick={getStatus}>Get Player Status</button>
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