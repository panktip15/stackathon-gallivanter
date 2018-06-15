import React, { Component } from 'react';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import { accessToken } from './token';
const MapBoxMap = ReactMapboxGl({ accessToken });

export const Map = () => (
  <MapBoxMap
    style="mapbox://styles/panktip85/cjieyr3ow2qst2rpe3bszy1tn"
    center={[-73.93, 40.73]}
    containerStyle={{
      height: '65vh',
      width: '65vw',
    }}
  >
    {/* <Layer type="symbol" id="someId" layout={{ 'icon-image': 'nature' }}>
      {monumentIds.map(k => (
        <Feature
          onClick={onMonumentClick.bind(null, k)}
          coordinates={monuments[k].latlng}
          key={k}
        />
      ))}
    </Layer> */}
  </MapBoxMap>
);
