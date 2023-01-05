import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Albuns extends React.Component {
  render() {
    const { artistAlbuns } = this.props;
    return (
      <section className="cards-container">
        {artistAlbuns.map(
          ({ artistName, collectionId, collectionName, artworkUrl100 }) => (
            <Link
              className="cards-container-content"
              to={ `/album/${collectionId}` }
              data-testid={ `link-to-album-${collectionId}` }
              key={ collectionId }
            >
              <div className="cards-content">
                <div className="cards-content-image">
                  <img src={ artworkUrl100 } alt={ collectionName } />
                </div>
                <div className="cards-content-informations">
                  <h2>{collectionName}</h2>
                  <h3>{artistName}</h3>
                </div>
              </div>
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
