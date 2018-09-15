import React from 'react';
import Log from './log';

const Logs = ({ logs = [] }) => (
  <section>
    <h2>Logged Work</h2>
    <ul id="logs">
      {logs.length ? logs.map((log, idx) => {
        return <Log {...log} key={`log-${idx}`}/>;
      }) : 'No work logged yet...'}
    </ul>
  </section>
);

export default Logs;