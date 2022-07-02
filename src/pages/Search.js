import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Search extends React.Component {
  componentDidMount() {
    const { onLoading } = this.props;
    onLoading();
  }

  render() {
    return (
      <div data-testid="page-search">
        <Header { ...this.props } />
        <div>Oi sou o search</div>
      </div>
    );
  }
}

Search.propTypes = {
  onLoading: PropTypes.func.isRequired,
  loadingStatus: PropTypes.bool.isRequired,
};

export default Search;
