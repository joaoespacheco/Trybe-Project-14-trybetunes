import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { songs, favoritesChange, favoriteSongs } = this.props;
    return (
      <div>
        {songs.map(({ trackName, previewUrl, trackId }) => (
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
                id={ trackId }
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
    );
  }
}

MusicCard.propTypes = {
  songs: PropTypes.arrayOf(PropTypes.object).isRequired,
  favoritesChange: PropTypes.func.isRequired,
  favoriteSongs: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MusicCard;
