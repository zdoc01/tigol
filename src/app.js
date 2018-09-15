import React, { Component } from 'react';
import electron from './electron';
import { Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';

import Home from './home';
import LogWork from './log-work';
import NotFound from './not-found';

import getLogs from './utils/get-logs';

const ipcRenderer = electron.ipcRenderer;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      logs: getLogs()
    };

    // sent from `main` process
    ipcRenderer.on('log:add', (evt) => {
      // new entry was added to local storage, so
      // we just need to fetch it and re-render the list
      this.setState({ logs: getLogs() });
    });

    this.onAddLog = this.onAddLog.bind(this);
  }

  onAddLog(evt, entry) {
    const logs = [...this.state.logs, entry];
    
    localStorage.setItem('logs', JSON.stringify(logs));
    this.setState({ logs });
    
    // Send message to `main` that new entry was logged
    // `main` will close the Entry window when it receives the message
    ipcRenderer.send('log:add');
  }

  render() {
    return (
      <Switch>
        <Route path="/log" exact render={props => (
          <LogWork {...props} onAddLog={this.onAddLog}/>
        )}/>
        <Route path="/" render={props => (
          <Home {...props} logs={this.state.logs}/>
        )}/>
        <Route component={NotFound}/>
      </Switch>
    );
  }
}

export default hot(module)(App);