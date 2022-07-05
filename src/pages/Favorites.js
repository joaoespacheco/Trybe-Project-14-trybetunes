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
    this.modifyLoadingFavorites(false);
  }

  storageGetFavorite = async () => {
    const favorites = await getFavoriteSongs();
    this.setState({ favoriteSongs: favorites });
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
        {loadingFavorites ? (
          <Loading />
        ) : (
          <section>
            <h2>Músicas Favoritas:</h2>
            {favoriteSongs.length > 0 ? (
              <MusicCard
                { ...this.state }
                albumStatusLoading={ this.modifyLoadingAlbum }
                favoritesChange={ this.favoritesChange }
                songs={ favoriteSongs }
              />
            ) : (
              <h3>Não há músicas favoritas</h3>
            )}
          </section>
        )}
      </div>
    );
  }
}

Favorites.propTypes = {
  onLoading: PropTypes.func.isRequired,
};

export default Favorites;
