import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Search extends React.Component {
  componentDidMount() {
    const { onLoading, buttonReset } = this.props;
    onLoading(true);
    buttonReset();
  }

  render() {
    const { searchInput, buttonStatus, onInputChange } = this.props;
    return (
      <div data-testid="page-search">
        <Header { ...this.props } />
        <div>
          <label htmlFor="input-search">
            <input
              name="searchInput"
              type="text"
              value={ searchInput }
              data-testid="search-artist-input"
              placeholder="Nome do Artista"
              onChange={ onInputChange }
            />
          </label>
          <button
            data-testid="search-artist-button"
            disabled={ buttonStatus }
            type="button"
          >
            Pesquisar
          </button>
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  searchInput: PropTypes.string.isRequired,
  buttonStatus: PropTypes.bool.isRequired,
  onLoading: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  buttonReset: PropTypes.func.isRequired,
};

export default Search;
