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

  componentDidMount() {
    const { modifyState } = this.props;
    modifyState('loginInput', '');
  }

  componentWillUnmount() {
    const { onLoading } = this.props;
    onLoading(false);
  }

  loginOn = async () => {
    const { onLoading, loginInput } = this.props;
    onLoading(true);
    await createUser({ name: loginInput });
    this.setState(({ redirectStatus: true }));
  }

  render() {
    const {
      loginInput,
      buttonStatus,
      onInputChange,
      loadingStatus } = this.props;
    const { redirectStatus } = this.state;
    if (!loadingStatus) {
      return (
        <main data-testid="page-login" className="login-container">
          <div className="login-container-content">
            <h1>TrybeTunes</h1>
            <div>
              <label htmlFor="login-input">
                <p>Login</p>
                <input
                  name="loginInput"
                  value={ loginInput }
                  onChange={ onInputChange }
                  type="text"
                  data-testid="login-name-input"
                  placeholder="Digite seu login..."
                />
              </label>
              <button
                type="button"
                data-testid="login-submit-button"
                disabled={ buttonStatus }
                onClick={ () => this.loginOn() }
              >
                Play!
              </button>
            </div>
          </div>
        </main>
      );
    }
    return (
      <main className="login-container">
        <Loading />
        { redirectStatus ? <Redirect to="/search" /> : ''}
      </main>
    );
  }
}

Login.propTypes = {
  loginInput: PropTypes.string.isRequired,
  buttonStatus: PropTypes.bool.isRequired,
  loadingStatus: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onLoading: PropTypes.func.isRequired,
  modifyState: PropTypes.func.isRequired,
};

export default Login;
