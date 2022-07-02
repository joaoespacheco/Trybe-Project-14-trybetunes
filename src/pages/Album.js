import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Album extends React.Component {
  componentDidMount() {
    const { onLoading } = this.props;
    onLoading(true);
  }

  render() {
    return (
      <div data-testid="page-album">
        <Header { ...this.props } />
      </div>
    );
  }
}

Album.propTypes = {
  onLoading: PropTypes.func.isRequired,
};

export default Album;
