import React, { Component } from 'react';

class LogWork extends Component {
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
      if (this.props.onAddLog) {
        const data = {
          message: this.input.value,
          timestamp: +new Date()
        };
        this.props.onAddLog(evt, data);
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
          <label htmlFor="log-message">
            <input ref={this.setInputRef} name="log-message" type="text"/>
          </label>
          <button type="submit">Log it!</button>
        </fieldset>
      </form>
    );
  }
}

export default LogWork;