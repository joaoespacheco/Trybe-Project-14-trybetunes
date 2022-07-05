import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

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
    const { name, checked } = target;
    const { album } = this.state;
    const song = album.slice(1).find(({ trackId }) => trackId === Number(name));
    if (checked) {
      this.modifyLoadingAlbum(true);
      await addSong(song);
      this.setState((estadoAnterior) => ({
        favoriteSongs: [...estadoAnterior.favoriteSongs, song],
      }));
      this.modifyLoadingAlbum(false);
    } else {
      this.modifyLoadingAlbum(true);
      await removeSong(song);
      this.setState(({
        favoriteSongs: [...await getFavoriteSongs()],
      }));
      this.modifyLoadingAlbum(false);
    }
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
              <section>
                <div>
                  <img src={ album[0].artworkUrl100 } alt="Capa do Album" />
                  <h3 data-testid="album-name">{album[0].collectionName}</h3>
                  <h3 data-testid="artist-name">{album[0].artistName}</h3>
                </div>
                <MusicCard
                  { ...this.state }
                  albumStatusLoading={ this.modifyLoadingAlbum }
                  favoritesChange={ this.favoritesChange }
                  songs={ album.slice(1) }
                />
              </section>
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
