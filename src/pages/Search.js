import React from 'react';
import PropTypes from 'prop-types';

class Search extends React.Component {
  componentDidMount() {
    const { onLoading } = this.props;
    onLoading();
  }

  render() {
    return (
      <div data-testid="page-search">Oi eu sou a Search</div>
    );
  }
}

Search.propTypes = {
  onLoading: PropTypes.func.isRequired,
};

export default Search;
