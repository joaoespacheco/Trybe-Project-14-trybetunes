import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

const IMAGEM_GENERICA = 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/2048px-Circle-icons-profile.svg.png';

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
        <main className="profile-container">
          {loadingProfile ? (
            <Loading />
          ) : (
            <div className="profile-container-content">
              <div className="profile-image-content">
                <img
                  src={ image || IMAGEM_GENERICA }
                  alt="Foto do usúario"
                  data-testid="profile-image"
                />
              </div>
              <div className="profile-informations-content">
                <div>
                  <h3>
                    {`Nome: ${name}`}
                  </h3>
                  <h3>
                    {`Email: ${email || 'email não cadastrado'}`}
                  </h3>
                  <div>
                    <p>Sobre mim:</p>
                    <h4>{description || 'Não há descrição sobre você'}</h4>
                  </div>
                </div>
                <Link to="/profile/edit">
                  <div className="profile-edit">Editar perfil</div>
                </Link>
              </div>
            </div>
          )}
        </main>
      </div>
    );
  }
}

Profile.propTypes = {
  onLoading: PropTypes.func.isRequired,
};

export default Profile;
