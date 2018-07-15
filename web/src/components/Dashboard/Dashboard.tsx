import * as React from 'react';
import Song from './Song/Song';
import './Dashboard.scss';

const Dashboard = () => (
  <div className="dashboard page">
    <h1>Dashboard</h1>
    <div className="songs">
      <Song {...require('./mockSong.json')}/>
    </div>
  </div>
);

export default Dashboard;