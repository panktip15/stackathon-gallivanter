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
      zoom: [11],
      center: [],
      hoverItem: null,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.submitCoordinates = this.submitCoordinates.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  /*-------------------- EVENT HANDLERS ---------------------*/

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
      let eventData = res.data.events.event;
      eventData = eventData.filter(
        (event, index, self) =>
          index === self.findIndex(e => e.title === event.title)
      );
      this.setState({
        events: { event: eventData },
      });
    } catch (error) {
      console.error(error);
    }
  }

  handleMouseEnter(event) {
    this.setState({
      hoverItem: event,
    });
  }

  handleMouseLeave() {
    this.setState({
      hoverItem: null,
    });
  }

  /*-------------------- RENDER ---------------------*/

  render() {
    return (
      <div>
        <div className="pl-4">
          <form onSubmit={this.onSubmit}>
            <div className="row pb-4">
              <div className="col-sm-3">
                <LocationSearch updateCoordinates={this.submitCoordinates} />
              </div>
              {/*------------------- DATE PICKER ------------------*/}
              <div className="col-sm-4">
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
              {/*------------------- CATEGORY SELECTOR ------------------*/}
              {this.state.categories.category && (
                <div className="col-sm-3">
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
              <div className="col-sm-2">
                {/*------------------- SEARCH BUTTON ------------------*/}
                <button type="submit">
                  <img className="nav-icon search-Button" src="search.png" />
                </button>
              </div>
            </div>
          </form>
          <div className="row">
            <div className="col-sm-8">
              <Map
                event={this.state.events && this.state.events.event}
                {...this.props}
                {...this.state}
                coordinates={this.state.coordinates}
                selectedPin={this.selectedPin}
              />
            </div>
            {/*------------------- EVENT LIST ------------------*/}
            <div className="col-sm-4 pr-4-lg eventList">
              {this.state.events ? (
                this.state.events.event && (
                  <ul className="list-group">
                    {this.state.events.event.map(event => {
                      return (
                        <div key={event.id}>
                          <EventList
                            {...this.state}
                            {...this.props}
                            handleMouseEnter={() =>
                              this.handleMouseEnter(event)
                            }
                            handleMouseLeave={() => this.handleMouseLeave()}
                            event={event}
                          />
                        </div>
                      );
                    })}
                  </ul>
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
