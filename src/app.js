import React, { Component } from 'react';
import electron from './electron';
import { Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';

import Home from './home';
import LogWork from './log-work';
import NotFound from './not-found';

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

    this.onAddEntry = this.onAddEntry.bind(this);
  }

  onAddEntry(evt, entry) {
    const entries = [...this.state.entries, entry];
    
    localStorage.setItem('entries', JSON.stringify(entries));
    this.setState({ entries });
    
    // Send message to `main` that new entry was logged
    // `main` will close the Entry window when it receives the message
    ipcRenderer.send('log:entry:new');
  }

  render() {
    return (
      <Switch>
        <Route path="/log" exact render={props => (
          <LogWork {...props} onAddEntry={this.onAddEntry}/>
        )}/>
        <Route path="/" render={props => (
          <Home {...props} entries={this.state.entries}/>
        )}/>
        <Route component={NotFound}/>
      </Switch>
    );
  }
}

export default hot(module)(App);