import * as React from 'react';
import './Dashboard.scss';
import Catalogs from './Catalogs/Catalogs';

const Dashboard = () => (
  <div className="dashboard page">
    <h1>Dashboard</h1>
    <Catalogs/>
  </div>
);

export default Dashboard;