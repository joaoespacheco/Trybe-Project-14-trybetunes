import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';

class Favorites extends React.Component {
  constructor() {
    super();

    this.state = {
      favoriteSongs: [],
      loadingFavorites: false,
    };
  }

  componentDidMount() {
    const { onLoading } = this.props;
    onLoading(true);
    this.modifyLoadingFavorites(true);
    this.storageGetFavorite();
  }

  storageGetFavorite = async () => {
    const favorites = await getFavoriteSongs();
    this.setState({ favoriteSongs: favorites }, () => this.modifyLoadingFavorites(false));
  };

  modifyLoadingFavorites = (status) => {
    this.setState({ loadingFavorites: status });
  };

  favoritesChange = async ({ target }) => {
    const { name } = target;
    const { favoriteSongs } = this.state;
    this.modifyLoadingFavorites(true);
    const song = favoriteSongs.find(({ trackId }) => trackId === Number(name));
    await removeSong(song);
    this.setState({
      favoriteSongs: [...(await getFavoriteSongs())],
    });
    this.modifyLoadingFavorites(false);
  };

  render() {
    const { favoriteSongs, loadingFavorites } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header { ...this.props } />
        <main className="favorites-container">
          <h1>Músicas Favoritas</h1>
          {loadingFavorites ? (
            <Loading />
          ) : (
            <section>
              {favoriteSongs.length > 0 ? (
                <MusicCard
                  { ...this.state }
                  albumStatusLoading={ this.modifyLoadingAlbum }
                  favoritesChange={ this.favoritesChange }
                  songs={ favoriteSongs }
                />
              ) : (
                <p>Não há músicas favoritas</p>
              )}
            </section>
          )}
        </main>
      </div>
    );
  }
}

Favorites.propTypes = {
  onLoading: PropTypes.func.isRequired,
};

export default Favorites;
