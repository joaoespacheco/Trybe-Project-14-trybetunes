import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { songs, favoritesChange, favoriteSongs } = this.props;
    return (
      <div className="album-content-cards">
        {songs.map(({ trackName, previewUrl, trackId }) => (
          <div key={ trackId }>
            <div>
              <p>{trackName}</p>
              <label htmlFor={ trackId }>
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
                <p>Favoritar</p>
              </label>
            </div>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              <code>audio</code>
              .
            </audio>
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
