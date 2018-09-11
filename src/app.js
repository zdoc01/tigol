import React, { Component } from 'react';
import electron from './electron';
import { Link, Route, Switch } from 'react-router-dom';
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

const Dashboard = () => (
  <section>
    <h1>Dashboard</h1>
    <p>This is your dashboard. We'll add more functionality here soon.</p>
  </section>
);

const Welcome = () => (
  <section>
    <h1>Welcome to <span className="app-name">tigol</span>!</h1>
  </section>
);

const NotFound = () => (
  <div>Oops... route not found!</div>
);

const Home = ({ entries }) => (
  <div>
    <div className="sidebar">
      <nav>
        <ul>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/entries">Entries</Link></li>
        </ul>
      </nav>
    </div>
    <main>
      <Route path="/" exact component={Welcome}/>
      <Route path="/dashboard" component={Dashboard}/>
      <Route path="/entries" render={props => (
        <Entries {...props} entries={entries}/>
      )}/>
    </main>
  </div>
);

class Entry extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.setInputRef = this.setInputRef.bind(this);
  }

  setInputRef(node) {
    this.input = node;
  }

  onSubmit(evt) {
    evt.preventDefault();

    if (this.input.value) {
      if (this.props.onAddEntry) {
        this.props.onAddEntry(evt, this.input.value);
      }

      // reset field
      this.input.value = '';
    }
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <fieldset>
          <legend>Whatcha workin' on?</legend>
          <label htmlFor="log-entry">
            <input ref={this.setInputRef} name="log-entry" type="text"/>
          </label>
          <button type="submit">Log it!</button>
        </fieldset>
      </form>
    );
  }
}


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
        <Route path="/entry" exact render={props => (
          <Entry {...props} onAddEntry={this.onAddEntry}/>
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