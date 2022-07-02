import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Favorites extends React.Component {
  componentDidMount() {
    const { onLoading } = this.props;
    onLoading();
  }

  render() {
    return (
      <div data-testid="page-favorites">
        <Header { ...this.props } />
      </div>
    );
  }
}

Favorites.propTypes = {
  onLoading: PropTypes.func.isRequired,
};

export default Favorites;
