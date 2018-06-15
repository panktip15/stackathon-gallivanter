import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Map } from './Map';
import { SearchForm } from './SearchForm';

/**
 * COMPONENT
 */
export const UserHome = () => {
  return (
    <div>
      {/* <h3>Welcome, {email}</h3> */}
      <div className="row">
        <div className="col-8">
          <Map />
        </div>
        <div className="col-4">
          <SearchForm />
        </div>
      </div>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
  };
};

export default connect(mapState)(UserHome);

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string,
};
