import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class ProfileEdit extends React.Component {
  componentDidMount() {
    const { onLoading } = this.props;
    onLoading();
  }

  render() {
    return (
      <div data-testid="page-profile-edit">
        <Header { ...this.props } />
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  onLoading: PropTypes.func.isRequired,
};

export default ProfileEdit;
