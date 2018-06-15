import React, { Component } from 'react';
// import Calendar from 'react-calendar';

export class SearchForm extends Component {
  constructor() {
    super();
    this.state = {
      location: '',
      // start: new Date(),
      // end: new Date(),
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange = evt =>
    this.setState({
      [evt.target.name]: evt.target.value,
    });

  onSubmit = evt => {
    evt.preventDefault();
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input
            className="form-control form-control-sm"
            type="text"
            name="location"
            value={this.state.location}
            onChange={this.onChange}
            placeholder="where should we go.."
          />
          {/* <Calendar
            name="start"
            onChange={this.onChange}
            value={this.state.start}
          />
          <Calendar
            name="end"
            onChange={this.onChange}
            value={this.state.end}
          /> */}
          <button
            className="btn btn-primary btn-sm search-Button"
            disabled={!this.state.location}
            type="submit"
          >
            Search
          </button>
        </form>
      </div>
    );
  }
}
