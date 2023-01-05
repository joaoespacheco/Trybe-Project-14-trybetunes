import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from '../components/Loading';

const IMAGEM_GENERICA = 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/2048px-Circle-icons-profile.svg.png';

class ProfileEdit extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      description: '',
      image: '',
      loadingEdit: false,
      statusOfButton: true,
      redirectStatus: false,
    };
  }

  componentDidMount() {
    const { onLoading } = this.props;
    onLoading(true);
    this.getStorageUser();
  }

  getStorageUser = async () => {
    this.modifyLoadingEdit(true);
    const storageUser = await getUser();
    const { name, email, description, image } = storageUser;
    this.setState(({
      name,
      email,
      description,
      image,
    }), () => this.modifyButtonStatus());
    this.modifyLoadingEdit(false);
  };

  handleChanger = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.modifyButtonStatus());
  };

  modifyButtonStatus = () => {
    const checkInputs = this.checkInputElements();
    if (checkInputs) {
      this.setState({ statusOfButton: false });
    } else {
      this.setState({ statusOfButton: true });
    }
  };

  checkInputElements = () => {
    const { name, email, description, image } = this.state;
    const userInfos = [name, email, description, image];
    const verifyKeyEmpty = userInfos.every((chave) => chave !== '');
    const verifyEmailFormat = this.emailVerify(email);
    return verifyKeyEmpty && verifyEmailFormat;
  };

  emailVerify = (email) => {
    const regexElement = /\S+@\S+\.\S+/;
    return regexElement.test(email);
  };

  modifyLoadingEdit = (status) => {
    this.setState({ loadingEdit: status });
  };

  saveOnStorage = async () => {
    const { name, email, description, image } = this.state;
    this.modifyLoadingEdit(true);
    await updateUser({ name, email, description, image });
    this.setState(({ redirectStatus: true }));
  };

  render() {
    const {
      name,
      email,
      description,
      image,
      statusOfButton,
      loadingEdit,
      redirectStatus,
    } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header { ...this.props } />
        <main className="profile-edit-container">
          {loadingEdit ? (
            <Loading />
          ) : (
            <div className="profile-edit-content">
              <div className="profile-edit-content-image">
                <img src={ image || IMAGEM_GENERICA } alt="Foto de perfil" />
              </div>
              <div className="profile-edit-content-form">
                <label htmlFor="image-input">
                  <p>Imagem:</p>
                  <input
                    name="image"
                    value={ image }
                    id="image-input"
                    type="url"
                    data-testid="edit-input-image"
                    placeholder="Digite a url da sua imagem..."
                    onChange={ this.handleChanger }
                  />
                </label>
                <label htmlFor="name-input">
                  <p>Nome:</p>
                  <input
                    name="name"
                    value={ name }
                    id="name-input"
                    type="text"
                    data-testid="edit-input-name"
                    placeholder="Digite seu nome..."
                    onChange={ this.handleChanger }
                  />
                </label>
                <label htmlFor="email-input">
                  <p>Email:</p>
                  <input
                    name="email"
                    value={ email }
                    id="email-input"
                    type="email"
                    placeholder="Digite seu email..."
                    data-testid="edit-input-email"
                    onChange={ this.handleChanger }
                  />
                </label>
                <label htmlFor="description-input">
                  <p>Descrição:</p>
                  <textarea
                    name="description"
                    value={ description }
                    id="description-input"
                    type="text"
                    placeholder="Digite uma breve descrição sobre você..."
                    data-testid="edit-input-description"
                    onChange={ this.handleChanger }
                  />
                </label>
                <button
                  data-testid="edit-button-save"
                  type="button"
                  disabled={ statusOfButton }
                  onClick={ this.saveOnStorage }
                >
                  Salvar
                </button>
              </div>
            </div>
          )}
        </main>
        {redirectStatus && <Redirect to="/profile" />}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  onLoading: PropTypes.func.isRequired,
};

export default ProfileEdit;
