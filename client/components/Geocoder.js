import { Component } from 'react';
import PropTypes from 'prop-types';
import { accessToken } from './token';
const MapboxGeocoder = require('mapbox-gl-geocoder');


class Geocoder extends Component {
  componentDidMount() {
    const { map } = this.context;
    const geocoder = new MapboxGeocoder({
      accessToken,
    });
    map.addControl(geocoder);
  }

  render() {
    console.log(this);
    return null;
  }

  static contextTypes = {
    map: PropTypes.object.isRequired,
  };
}

export default Geocoder;
