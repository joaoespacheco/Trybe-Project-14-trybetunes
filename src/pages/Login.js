import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      redirectStatus: false,
    };
  }

  loginOn = async () => {
    const { onLoading, loginInput } = this.props;
    onLoading();
    await createUser({ name: loginInput });
    this.setState(({ redirectStatus: true }));
  }

  render() {
    const { loginInput, loginButtonStatus,
      onInputChange, loadingStatus } = this.props;
    const { redirectStatus } = this.state;
    if (!loadingStatus) {
      return (
        <div data-testid="page-login">
          <label htmlFor="login-input">
            <p>Login:</p>
            <input
              name="loginInput"
              value={ loginInput }
              onChange={ onInputChange }
              type="text"
              placeholder="Digite seu login..."
              data-testid="login-name-input"
            />
          </label>
          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ loginButtonStatus }
            onClick={ () => this.loginOn() }
          >
            Entrar
          </button>
        </div>
      );
    }
    return (
      <>
        <Loading />
        { redirectStatus ? <Redirect to="/search" /> : ''}
      </>
    );
  }
}

Login.propTypes = {
  loginInput: PropTypes.string.isRequired,
  loginButtonStatus: PropTypes.bool.isRequired,
  loadingStatus: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onLoading: PropTypes.func.isRequired,
};

export default Login;
