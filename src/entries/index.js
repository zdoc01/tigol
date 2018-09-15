import React from 'react';

const Entries = ({ entries }) => (
  <section>
    <h2>Logged Work</h2>
    <ul id="entries">
      {entries.length ? entries.map((entry, idx) => {
        return <li className="entry" key={`entry-${idx}`}>{entry}</li>;
      }) : 'No entries logged yet...'}
    </ul>
  </section>
);

export default Entries;