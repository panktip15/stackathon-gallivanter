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
      coordinates: [],
      startDate: null,
      endDate: null,
      events: {},
      categories: [],
      category: {},
      hoveredItem: '',
      zoom: [11],
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.submitCoordinates = this.submitCoordinates.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
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
      console.error(error);
    }
  }

  onMouseEnter(key) {
    const selectedEvent = this.props.events.event.filter(e => e.id === key);
    this.setState({
      hoveredItem: selectedEvent,
      center: [Number(selectedEvent.longitude), Number(selectedEvent.latitude)],
      zoom: [14],
    });
  }

  onMouseLeave() {
    this.setState({
      hoveredItem: '',
      center: [Number(coordinates[1]), Number(coordinates[0])],
      zoom: [11],
    });
  }

  render() {
    const { hoveredItem, selectedEvent, zoom } = this.props;
    return (
      <div>
        <div className="pl-4">
          <form onSubmit={this.onSubmit}>
            <div className="row">
              <div className="col-3">
                <LocationSearch updateCoordinates={this.submitCoordinates} />
              </div>
              <div className="col-4">
                <DateRangePicker
                  startDate={this.state.startDate}
                  startDateId="your_unique_start_date_id"
                  endDate={this.state.endDate}
                  endDateId="your_unique_end_date_id"
                  onDatesChange={({ startDate, endDate }) =>
                    this.setState({ startDate, endDate })
                  }
                  focusedInput={this.state.focusedInput}
                  onFocusChange={focusedInput =>
                    this.setState({ focusedInput })
                  }
                />
              </div>
              {this.state.categories.category && (
                <div className="col-3">
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
              <div className="col-2">
                <button type="submit">
                  <img className="btn-light nav-icon" src="search.png" />
                </button>
              </div>
            </div>
          </form>
          <div className="row">
            <div className="col-8 pt-4">
              <Map
                event={this.state.events && this.state.events.event}
                coordinates={this.state.coordinates}
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
                zoom={zoom}
                selectedPin={selectedEvent}
              />
            </div>
            <div className="col-4">
              {this.state.events ? (
                this.state.events.event && (
                  <EventList events={this.state.events} />
                )
              ) : (
                <div className="alert alert-warning" role="alert">
                  No events found
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
