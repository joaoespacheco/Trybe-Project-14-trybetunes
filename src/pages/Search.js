import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      valueOfSearch: '',
      statusOfButton: true,
    };

    this.handleChanger = this.handleChanger.bind(this);
  }

  componentDidMount() {
    const { onLoading } = this.props;
    onLoading();
  }

  handleChanger({ target }) {
    const numberMaxOfCharacters = 2;
    const { name, value } = target;
    if (name === 'valueOfSearch') {
      this.setState({
        statusOfButton: numberMaxOfCharacters > value.length,
      });
    }
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { statusOfButton, valueOfSearch } = this.state;
    return (
      <div data-testid="page-search">
        <Header { ...this.props } />
        <div>
          <label htmlFor="input-search">
            <input
              name="valueOfSearch"
              type="text"
              value={ valueOfSearch }
              data-testid="search-artist-input"
              placeholder="Nome do Artista"
              onChange={ this.handleChanger }
            />
          </label>
          <button
            data-testid="search-artist-button"
            disabled={ statusOfButton }
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
  onLoading: PropTypes.func.isRequired,
  loadingStatus: PropTypes.bool.isRequired,
};

export default Search;
