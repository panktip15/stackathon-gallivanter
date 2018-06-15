const mapboxgl = require('mapbox-gl');
import { accessToken } from './token';

import React from 'react';
mapboxgl.accessToken = accessToken;

export class Map extends React.Component {
  constructor() {
    super();
    this.state = {
      lng: -73.93,
      lat: 40.73,
      zoom: 12,
    };
  }

  componentDidMount() {
    const { lng, lat, zoom } = this.state;

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/panktip85/cjieyr3ow2qst2rpe3bszy1tn',
      center: [lng, lat],
      zoom,
    });

    map.on('move', () => {
      const { lng, lat } = map.getCenter();

      this.setState({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: map.getZoom().toFixed(2),
      });
    });
  }

  render() {
    const { lng, lat, zoom } = this.state;

    return (
      <div>
        <div id="map" ref={el => (this.mapContainer = el)} />
      </div>
    );
  }
}
