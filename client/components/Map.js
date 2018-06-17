import React from 'react';
import ReactMapboxGl, { Layer, Feature, Popup } from 'react-mapbox-gl';
import { accessToken } from './token';
import { MapPopup } from './MapPopup';
const MapBoxMap = ReactMapboxGl({ accessToken });

export class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      center: [-73.93, 40.73],
      pinEvent: [],
      zoom: [11],
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { coordinates, event } = nextProps;
    if (event) {
      return {
        ...prevState,
        pinEvent: event,
      };
    }
    if (coordinates.length) {
      return {
        ...prevState,
        center: [Number(coordinates[1]), Number(coordinates[0])],
      };
    }

    return { ...prevState };
  }

  render() {
    const { pinEvent } = this.state;
    const { event, coordinates } = this.props;
    return (
      <MapBoxMap
        style="mapbox://styles/panktip85/cjieyr3ow2qst2rpe3bszy1tn"
        center={this.state.center}
        zoom={this.state.zoom}
        containerStyle={{
          height: '65vh',
          width: '65vw',
        }}
      >
        {event && <MapPopup event={event[0]} />}
        <Layer
          type="symbol"
          layout={{
            'icon-image': 'marker-15',
            'icon-allow-overlap': true,
            'icon-size': 2,
          }}
        >
          {pinEvent &&
            pinEvent.map(evt => (
              <Feature
                coordinates={[Number(evt.longitude), Number(evt.latitude)]}
                key={evt.id}
              />
            ))}
        </Layer>
      </MapBoxMap>
    );
  }
}
