import 'react-dates/initialize';
import React, { Component } from 'react';
import { DateRangePicker } from 'react-dates';
import momentPropTypes from 'react-moment-proptypes';
import Moment from 'react-moment';

export class SearchForm extends Component {
  constructor() {
    super();
    this.state = {
      location: '',
      startDate: momentPropTypes.Moment,
      endDate: momentPropTypes.Moment,
      focusedInput: this.startDate,
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
          <DateRangePicker
            startDate={this.state.startDate} // momentPropTypes.momentObj or null,
            startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
            endDate={this.state.endDate} // momentPropTypes.momentObj or null,
            endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
            onDatesChange={({ startDate, endDate }) =>
              this.setState({ startDate, endDate })
            } // PropTypes.func.isRequired,
            focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
            onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
          />
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
