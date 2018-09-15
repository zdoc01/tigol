import React from 'react';

const getTime = (timestamp) => {
  const d = new Date(timestamp);
  const h = d.getHours();
  const m = d.getMinutes();
  const s = d.getSeconds();
  return `${h}:${m}:${s}`;
};

const Log = ({ message, timestamp }) => {
  const time = getTime(timestamp);
  return (
    <li className="log">
      <span className="log--date">[{time}]</span>&nbsp;<span className="log--message">{message}</span>
    </li>
  );
};

export default Log;