import React from 'react';
import Log from './log';
import styles from './index.css';

const Logs = ({ logs = [] }) => (
  <section>
    <h1 className={styles.heading}>Logged Work</h1>
    <ul id="logs">
      {logs.length ? logs.map((log, idx) => {
        return <Log {...log} key={`log-${idx}`}/>;
      }) : 'No work logged yet...'}
    </ul>
  </section>
);

export default Logs;