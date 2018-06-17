import React from 'react';
import moment from 'moment';

const EventList = props => {
  const { events } = props;
  const eventDate = moment(event.start_time).format('LLL');
  return (
    <ul className="list-group">
      {events.event.map(event => {
        return (
          <li className="list-group-item" key={event.id}>
            <a href={event.url} className="row">
              {event.image && (
                <div className="col-3">
                  <img
                    src={event.image.thumb.url}
                    className="product-detail-image"
                  />
                </div>
              )}
              <div className="col-8">
                <div>{event.title}</div>
                <div className="text-muted">{eventDate}</div>
              </div>
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default EventList;
