import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      album: [],
    };
  }

  async componentDidMount() {
    const {
      onLoading,
      match: {
        params: { id },
      },
    } = this.props;
    onLoading(true);
    const albumData = await getMusics(id);
    this.setState({ album: albumData });
  }

  render() {
    const { album } = this.state;
    return (
      <div data-testid="page-album">
        <Header { ...this.props } />
        <section>
          {album.length > 0 ? <MusicCard { ...this.state } /> : ''}
        </section>
      </div>
    );
  }
}

Album.propTypes = {
  onLoading: PropTypes.func.isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Album;
