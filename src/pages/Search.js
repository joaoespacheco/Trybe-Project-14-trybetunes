import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import Albuns from '../components/Albuns';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      statusOfSearch: false,
      loadingSearch: false,
      albumSearch: [],
      artistSearch: '',
    };
  }

  componentDidMount() {
    const { buttonReset } = this.props;
    buttonReset();
  }

  searchRequisition = async () => {
    const { searchInput, modifyState } = this.props;
    this.setState(({ loadingSearch: true }));
    const albuns = await searchAlbumsAPI(searchInput);
    this.setState(({
      loadingSearch: false,
      albumSearch: albuns,
      statusOfSearch: true,
      artistSearch: searchInput,
    }));
    modifyState('searchInput', '');
  };

  searchResponse = (albuns) => {
    if (albuns.length > 0) {
      const { artistSearch } = this.state;
      return (
        <h2>{`Resultado de busca para: ${artistSearch}`}</h2>
      );
    }
    return (
      <h2>Nenhum álbum foi encontrado</h2>
    );
  }

  render() {
    const { searchInput, buttonStatus, onInputChange } = this.props;
    const { statusOfSearch, loadingSearch, albumSearch } = this.state;
    return (
      <div data-testid="page-search">
        <Header { ...this.props } />
        <main className="search-container">
          <div className="search-container-filter">
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
              onClick={ this.searchRequisition }
            >
              Pesquisar
            </button>
          </div>
          {!loadingSearch ? (
            <div className="search-container-albuns">
              { statusOfSearch ? (
                this.searchResponse(albumSearch)
              ) : (
                <h2>Não foram realizadas buscas até o momento</h2>
              )}
              { statusOfSearch ? <Albuns artistAlbuns={ albumSearch } /> : '' }
            </div>
          ) : (
            <Loading />
          )}
        </main>
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
  loadingStatus: PropTypes.bool.isRequired,
  modifyState: PropTypes.func.isRequired,
};

export default Search;
