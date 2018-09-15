import React from 'react';
import { Link, Route } from 'react-router-dom';

import Welcome from '../welcome';
import Dashboard from '../dashboard';
import Entries from '../entries';

const Home = ({ entries }) => (
  <div>
    <div className="sidebar">
      <nav>
        <ul>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/logs">Entries</Link></li>
        </ul>
      </nav>
    </div>
    <main>
      <Route path="/" exact component={Welcome}/>
      <Route path="/dashboard" component={Dashboard}/>
      <Route path="/logs" render={props => (
        <Entries {...props} entries={entries}/>
      )}/>
    </main>
  </div>
);

export default Home;