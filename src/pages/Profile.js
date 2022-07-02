import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Profile extends React.Component {
  componentDidMount() {
    const { onLoading } = this.props;
    onLoading();
  }

  render() {
    return (
      <div data-testid="page-profile">
        <Header { ...this.props } />
      </div>
    );
  }
}

Profile.propTypes = {
  onLoading: PropTypes.func.isRequired,
};

export default Profile;
