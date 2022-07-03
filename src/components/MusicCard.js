import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { album } = this.props;
    const { artworkUrl100, artistName, collectionName } = album[0];
    return (
      <section>
        <div>
          <img src={ artworkUrl100 } alt="Capa do Album" />
          <h3 data-testid="album-name">{collectionName}</h3>
          <h3 data-testid="artist-name">{artistName}</h3>
        </div>
        <div>
          {album.slice(1).map(({ trackName, previewUrl }, index) => (
            <div key={ trackName + index }>
              <p>{trackName}</p>
              <audio data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                {' '}
                <code>audio</code>
                .
              </audio>
            </div>
          ))}
        </div>
      </section>
    );
  }
}

MusicCard.propTypes = {
  album: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MusicCard;
