import 'react-dates/initialize';
import React, { Component } from 'react';
import LocationSearch from './LocationSearch';
import axios from 'axios';
import EventList from './EventList';
import { DateRangePicker } from 'react-dates';

export class SearchForm extends Component {
  constructor() {
    super();
    this.state = {
      coordinates: [],
      startDate: null,
      endDate: null,
      events: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.submitCoordinates = this.submitCoordinates.bind(this);
  }

  onChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  submitCoordinates(coordinates) {
    this.setState({ coordinates });
  }

  async onSubmit(evt) {
    evt.preventDefault();
    try {
      const { coordinates, startDate, endDate } = this.state;
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
      // let lat = coordinates[0].toFixed(6);
      // let lan = coordinates[1].toFixed(6);
      // let location = `${lat},${lan}`;
      let location = coordinates.join(',');
      const res = await axios.get(`/api/events/${location}/${date}`);
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
          <LocationSearch updateCoordinates={this.submitCoordinates} />
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
            // disabled={!this.state.coodinates.length}
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
