import React from 'react';
import Geosuggest from 'react-geosuggest';

export class GeoForm extends React.Component {
  /**
   * Render the example app
   */
  render() {
    var fixtures = [
      {
        label: 'Old Elbe Tunnel, Hamburg',
        location: { lat: 53.5459, lng: 9.966576 },
      },
      {
        label: 'Reeperbahn, Hamburg',
        location: { lat: 53.5495629, lng: 9.9625838 },
      },
      {
        label: 'Alster, Hamburg',
        location: { lat: 53.5610398, lng: 10.0259135 },
      },
    ];

    return (
      <div>
        <Geosuggest
          ref={el => (this._geoSuggest = el)}
          placeholder="Start typing!"
          fixtures={fixtures}
          onSuggestSelect={this.onSuggestSelect}
          location={new google.maps.LatLng(53.558572, 9.9278215)}
          radius="20"
        />

        {/* {* Buttons to trigger exposed component functions *} */}
        <button type="button" onClick={() => this._geoSuggest.focus()}>
          Focus
        </button>
        <button
          type="button"
          onClick={() => this._geoSuggest.update('New Zealand')}
        >
          Update
        </button>
        <button type="button" onClick={() => this._geoSuggest.clear()}>
          Clear
        </button>
        <button type="button" onClick={() => this._geoSuggest.selectSuggest()}>
          Search
        </button>
      </div>
    );
  }

  /**
   * When a suggest got selected
   * @param  {Object} suggest The suggest
   */
  onSuggestSelect(suggest) {
    console.log(suggest);
  }
}
