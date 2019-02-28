import React, { Component } from 'react';
import Song from './Song/Song';
import './Dashboard.scss';

class Dashboard extends Component {

  componentDidMount() {
    document.title = "Dashboard"
  }

  render() {
    return (
      <div className="dashboard page">
        <div className="songs">
          <Song {...require('./mockSong.json')} />
        </div>
      </div>
    );
  }
}

export default Dashboard;