import React from 'react';
import { Link, Route } from 'react-router-dom';

import Welcome from '../welcome';
import Dashboard from '../dashboard';
import Logs from '../logs';

const Home = ({ logs }) => (
  <div>
    <div className="sidebar">
      <nav>
        <ul>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/logs">logs</Link></li>
        </ul>
      </nav>
    </div>
    <main>
      <Route path="/" exact component={Welcome}/>
      <Route path="/dashboard" component={Dashboard}/>
      <Route path="/logs" render={props => (
        <Logs {...props} logs={logs}/>
      )}/>
    </main>
  </div>
);

export default Home;