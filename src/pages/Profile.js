import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      userInfos: {},
      loadingProfile: false,
    };
  }

  componentDidMount() {
    const { onLoading } = this.props;
    onLoading(true);
    this.getStorageUser();
  }

  getStorageUser = async () => {
    this.modifyLoadingProfile(true);
    const storageUser = await getUser();
    this.setState({ userInfos: storageUser });
    this.modifyLoadingProfile(false);
  };

  modifyLoadingProfile = (status) => {
    this.setState({ loadingProfile: status });
  };

  render() {
    const { loadingProfile, userInfos } = this.state;
    const { name, email, description, image } = userInfos;
    return (
      <div data-testid="page-profile">
        <Header { ...this.props } />
        {loadingProfile ? (
          <Loading />
        ) : (
          <section>
            <img
              src={ image }
              alt="Foto do usúario"
              data-testid="profile-image"
            />
            <h3>
              {name}
            </h3>
            <h3>
              {email}
            </h3>
            <h4>
              {description}
            </h4>
            <Link
              to="/profile/edit"
            >
              Editar perfil
            </Link>
          </section>
        )}
      </div>
    );
  }
}

Profile.propTypes = {
  onLoading: PropTypes.func.isRequired,
};

export default Profile;
