import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { album, favoritesChange, favoriteSongs } = this.props;
    const { artworkUrl100, artistName, collectionName } = album[0];
    return (
      <section>
        <div>
          <img src={ artworkUrl100 } alt="Capa do Album" />
          <h3 data-testid="album-name">{collectionName}</h3>
          <h3 data-testid="artist-name">{artistName}</h3>
        </div>
        <div>
          {album.slice(1).map(({ trackName, previewUrl, trackId }) => (
            <div key={ trackId }>
              <p>{trackName}</p>
              <audio data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                <code>audio</code>
                .
              </audio>
              <label htmlFor={ trackId }>
                Favorita
                <input
                  data-testid={ `checkbox-music-${trackId}` }
                  name={ trackId }
                  type="checkbox"
                  onChange={ (event) => favoritesChange(event) }
                  checked={ favoriteSongs.some(
                    (song) => Number(song.trackId) === trackId,
                  ) }
                />
              </label>
            </div>
          ))}
        </div>
      </section>
    );
  }
}

MusicCard.propTypes = {
  album: PropTypes.arrayOf(PropTypes.object).isRequired,
  favoritesChange: PropTypes.func.isRequired,
  favoriteSongs: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MusicCard;
