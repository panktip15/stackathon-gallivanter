import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const EventList = props => {
  const { events } = props;
  return (
    <div className="row">
      {events.event.map(event => {
        return (
          <div key={event.id}>
            <a href={event.url}>
              {event.image && (
                <img
                  src={event.image.thumb.url}
                  className="product-detail-image"
                />
              )}
              {event.title}
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default EventList;
