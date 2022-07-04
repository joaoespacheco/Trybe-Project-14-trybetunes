import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      album: [],
      loadingAlbum: false,
      favoriteSongs: [],
    };
  }

  componentDidMount() {
    const {
      onLoading,
      match: {
        params: { id },
      },
    } = this.props;
    this.modifyLoadingAlbum(true);
    onLoading(true);
    this.storageGetMusic(id);
    this.storageGetFavorite();
    this.modifyLoadingAlbum(false);
  }

  storageGetMusic = async (id) => {
    const albumData = await getMusics(id);
    this.setState({ album: albumData });
  }

  storageGetFavorite = async () => {
    const favorites = await getFavoriteSongs();
    this.setState({ favoriteSongs: favorites });
  }

  modifyLoadingAlbum = (status) => {
    this.setState({ loadingAlbum: status });
  };

  favoritesChange = async ({ target }) => {
    const { name } = target;
    const { album } = this.state;
    this.modifyLoadingAlbum(true);
    const song = album.slice(1).find(({ trackId }) => trackId === Number(name));
    await addSong(song);
    this.setState((estadoAnterior) => ({
      favoriteSongs: [...estadoAnterior.favoriteSongs, song],
    }));
    this.modifyLoadingAlbum(false);
  };

  render() {
    const { album, loadingAlbum } = this.state;
    return (
      <div data-testid="page-album">
        <Header { ...this.props } />
        {loadingAlbum ? (
          <Loading />
        ) : (
          <section>
            {album.length > 0 ? (
              <MusicCard
                { ...this.state }
                albumStatusLoading={ this.modifyLoadingAlbum }
                favoritesChange={ this.favoritesChange }
              />
            ) : (
              ''
            )}
          </section>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  onLoading: PropTypes.func.isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Album;
