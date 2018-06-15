import 'react-dates/initialize';
import React, { Component } from 'react';
import axios from 'axios';
import EventList from './EventList';
import { DateRangePicker } from 'react-dates';
import { GeoForm } from './GeocoderGoogle';
import Moment from 'react-moment';

export class SearchForm extends Component {
  constructor() {
    super();
    this.state = {
      location: '',
      startDate: null,
      endDate: null,
      events: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  async onSubmit(evt) {
    evt.preventDefault();
    try {
      const { location, startDate, endDate } = this.state;
      let sDate = startDate
        .format()
        .slice(0, 10)
        .split('-')
        .join('');
      let eDate = endDate
        .format()
        .slice(0, 10)
        .split('-')
        .join('');
      let date = `${sDate}00-${eDate}00`;
      const res = await axios.get(`/api/events/${location}/${date}`);
      console.log('response', res);
      this.setState({
        events: res.data.events,
      });
    } catch (error) {
      this.setState({
        errorMessage: `There was a problem creating the todo: ${error.message}`,
      });
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <GeoForm />
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
          {/* <input
            className="form-control form-control-sm"
            type="text"
            name="startDate"
            value={this.state.startDate}
            onChange={this.onChange}
            placeholder="where should we go.."
          />{' '}
          <input
            className="form-control form-control-sm"
            type="text"
            name="endDate"
            value={this.state.endDate}
            onChange={this.onChange}
            placeholder="where should we go.."
          /> */}
          <button
            className="btn btn-primary btn-sm search-Button"
            disabled={!this.state.location}
            type="submit"
          >
            Search
          </button>
          {this.state.events.event && <EventList events={this.state.events} />}
        </form>
      </div>
    );
  }
}
