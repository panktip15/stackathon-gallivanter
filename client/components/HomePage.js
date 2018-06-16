import 'react-dates/initialize';
import React, { Component } from 'react';
import LocationSearch from './LocationSearch';
import axios from 'axios';
import EventList from './EventList';
import { DateRangePicker } from 'react-dates';
import { Map } from './Map';

export class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      coordinates: {},
      startDate: null,
      endDate: null,
      events: {},
      categories: [],
      category: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.submitCoordinates = this.submitCoordinates.bind(this);
  }

  async componentDidMount() {
    const { data } = await axios.get('/api/events/categories');
    this.setState({
      categories: data,
    });
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
      const { coordinates, startDate, endDate, category } = this.state;
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
      let location = coordinates.join(',');
      const res = await axios.get(
        `/api/events/${location}/${date}/${category}`
      );
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
      <div className="row">
        <div className="col-8">
          <Map
            events={this.state.events}
            coordinates={this.state.coordinates}
          />
        </div>
        <div className="col-4">
          <form onSubmit={this.onSubmit}>
            <LocationSearch updateCoordinates={this.submitCoordinates} />
            <DateRangePicker
              startDate={this.state.startDate}
              startDateId="your_unique_start_date_id"
              endDate={this.state.endDate}
              endDateId="your_unique_end_date_id"
              onDatesChange={({ startDate, endDate }) =>
                this.setState({ startDate, endDate })
              }
              focusedInput={this.state.focusedInput}
              onFocusChange={focusedInput => this.setState({ focusedInput })}
            />
            {this.state.categories.category && (
              <div>
                <select
                  className="form-control"
                  onChange={this.onChange}
                  name="category"
                >
                  <option value="">Category</option>
                  {this.state.categories.category.map(choice => (
                    <option value={choice.id} key={choice.id}>
                      {choice.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <button
              className="btn btn-primary btn-sm search-Button"
              // disabled={!this.state.coodinates.length}
              type="submit"
            >
              Search
            </button>
            {this.state.events.event && (
              <EventList events={this.state.events} />
            )}
          </form>
        </div>
      </div>
    );
  }
}
