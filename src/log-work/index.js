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
      if (this.props.onSubmit) {
        this.props.onSubmit(evt, this.input.value);
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

export default LogWork;