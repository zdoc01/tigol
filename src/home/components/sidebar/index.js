import React from 'react';
import { Link } from 'react-router-dom';
import styles from './index.css';

const SideBar = ({ className }) => (
  <div className={`${className} ${styles.root}`}>
    <nav>
      <ul className={styles.list}>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/logs">Logs</Link></li>
      </ul>
    </nav>
  </div>
);

export default SideBar;