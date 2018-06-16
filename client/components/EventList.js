import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const EventList = props => {
  const { events } = props;
  return (
    <ul className="list-group">
      {events.event.map(event => {
        return (
          <li className="list-group-item" key={event.id}>
            <a href={event.url} className="row">
              {event.image && (
                <img
                  src={event.image.thumb.url}
                  className="product-detail-image col-3"
                />
              )}
              <div className="col-8">{event.title}</div>
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default EventList;
