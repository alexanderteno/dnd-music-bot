import React, { Component } from 'react';
import './Dashboard.scss';

class Dashboard extends Component {

  componentDidMount() {
    document.title = "Dashboard"
  }

  render() {
    return (
      <div className="dashboard page">
        <div className="songs">
          
        </div>
      </div>
    );
  }
}

export default Dashboard;