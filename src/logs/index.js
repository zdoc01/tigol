import React from 'react';

const Logs = ({ logs = [] }) => (
  <section>
    <h2>Logged Work</h2>
    <ul id="logs">
      {logs.length ? logs.map((entry, idx) => {
        return <li className="log" key={`log-${idx}`}>{entry}</li>;
      }) : 'No work logged yet...'}
    </ul>
  </section>
);

export default Logs;