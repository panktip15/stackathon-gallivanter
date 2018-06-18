import React from 'react';
import moment from 'moment';

const EventList = props => {
  const { event, handleMouseEnter, handleMouseLeave } = props;
  const eventDate = moment(event.start_time).format('LLL');

  return (
    <li
      onMouseOver={handleMouseEnter}
      onMouseOut={handleMouseLeave}
      className="list-group-item"
      key={event.id}
    >
      <a href={event.url} className="row">
        {event.image && (
          <div className="col-3">
            <img src={event.image.thumb.url} className="product-detail-image" />
          </div>
        )}
        <div className="col-8">
          <div>{event.title}</div>
          <div className="text-muted">{eventDate}</div>
        </div>
      </a>
    </li>
  );
};

export default EventList;
