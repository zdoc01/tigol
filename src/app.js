import React, { Component } from 'react';
import electron from './electron';
import { hot } from 'react-hot-loader';

const ipcRenderer = electron.ipcRenderer;

const getEntries = () => {
  let entries;
  try {
    entries = JSON.parse(localStorage.getItem('entries')) || [];
  } catch(e) {
    entries = [];
  }
  return entries;
};

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      entries: getEntries()
    };

    // sent from `main` process
    ipcRenderer.on('log:entry:new', (evt) => {
      // new entry was added to local storage, so
      // we just need to fetch it and re-render the list
      this.setState({ entries: getEntries() });
    });
  }

  render() {
    return (
      <main>
        <h1>Welcome to <span className="app-name">tigol</span>!</h1>

        <section>
          <h2>Logged Work</h2>
          <ul id="entries">
            {this.state.entries.map(entry => {
              return <li className="entry">{entry}</li>;
            })}
          </ul>
        </section>
      </main>
    );
  }
}

export default hot(module)(App);