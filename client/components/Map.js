import React, { Component } from 'react';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import { accessToken } from './token';
import Geocoder from './Geocoder';
const MapBoxMap = ReactMapboxGl({ accessToken });

export const Map = () => (
  <MapBoxMap
    style="mapbox://styles/panktip85/cjieyr3ow2qst2rpe3bszy1tn"
    center={[-73.93, 40.73]}
    containerStyle={{
      height: '100vh',
      width: '100vw',
    }}
  >
    <Geocoder />
    {/* {console.log(map)} */}
    {/* <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
      <Feature coordinates={[40.73, -73.93]} />
    </Layer> */}
  </MapBoxMap>
);
