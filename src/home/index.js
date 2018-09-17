import React from 'react';
import { Route } from 'react-router-dom';

import Welcome from '../welcome';
import Dashboard from '../dashboard';
import Logs from '../logs';

import SideBar from './components/sidebar';

import styles from './index.css';

const Home = ({ logs }) => (
  <div className={styles.root}>
    <header className={styles.header}>
      <div className={styles.logo}>tigol</div>
    </header>
    <SideBar className={styles.sidebar}/>
    <main className={styles.main}>
      <Route path="/" exact component={Welcome}/>
      <Route path="/dashboard" component={Dashboard}/>
      <Route path="/logs" render={props => (
        <Logs {...props} logs={logs}/>
      )}/>
    </main>
  </div>
);

export default Home;