import * as React from 'react';
import { Popup } from 'react-mapbox-gl';
import { css, StyleSheet } from 'aphrodite/no-important';

export const MapPopup = props => {
  const { event } = props;
  const styles = StyleSheet.create({
    container: {
      maxWidth: 200,
      minWidth: 120,
      borderRadius: 5,
    },
    image: {
      margin: 'auto',
      display: 'block',
      borderRadius: 5,
    },
    footer: {
      padding: '8px 12px',
      fontFamily: 'Fjalla One',
    },
  });
  return (
    <Popup
      coordinates={[Number(event.longitude), Number(event.latitude)]}
      anchor="bottom"
      offset={[0, -15]}
    >
      <div className={css(styles.container)}>
        {event.image && (
          <img className={css(styles.image)} src={event.image.medium.url} />
        )}
        <div className={css(styles.footer)}>
          <h1 style={{ fontSize: 15 }}>{event.title}</h1>
        </div>
      </div>
    </Popup>
  );
};
