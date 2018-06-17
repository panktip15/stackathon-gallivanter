import React from 'react';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import { accessToken } from './token';
import { MapPopup } from './MapPopup';
const MapBoxMap = ReactMapboxGl({ accessToken });

export class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      center: [-73.93, 40.73],
      pinEvent: [],
      zoom: [12],
      selectedPin: null,
    };
    this.onPinCLick = this.onPinCLick.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { coordinates, event } = nextProps;
    if (event) {
      return {
        ...prevState,
        pinEvent: event,
        zoom: [14],
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

  onPinCLick(event) {
    this.setState({
      selectedPin: event,
      center: [Number(event.longitude), Number(event.latitude)],
    });
    setTimeout(() => {
      this.setState({ selectedPin: null });
    }, 5000);
  }

  render() {
    const { pinEvent } = this.state;
    return (
      <MapBoxMap
        style="mapbox://styles/panktip85/cjieyr3ow2qst2rpe3bszy1tn"
        center={this.state.center}
        zoom={this.state.zoom}
        containerStyle={{
          height: '70vh',
          width: '65vw',
        }}
      >
        {this.state.selectedPin && <MapPopup event={this.state.selectedPin} />}
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
                onClick={this.onPinCLick.bind(null, evt)}
              />
            ))}
        </Layer>
      </MapBoxMap>
    );
  }
}
