import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Albuns extends React.Component {
  render() {
    const { artistAlbuns } = this.props;
    return (
      <section>
        {artistAlbuns.map(
          ({ artistName, collectionId, collectionName, artworkUrl100 }) => (
            <Link
              to={ `/album/${collectionId}` }
              data-testid={ `link-to-album-${collectionId}` }
              key={ collectionId }
            >
              <img src={ artworkUrl100 } alt={ collectionName } />
              <h2>{collectionName}</h2>
              <h3>{artistName}</h3>
            </Link>
          ),
        )}
      </section>
    );
  }
}

Albuns.propTypes = {
  artistAlbuns: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Albuns;
