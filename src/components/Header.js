import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      user: '',
      redirect: false,
      localToRedirect: '',
    };
  }

  async componentDidMount() {
    const { onLoading } = this.props;
    const storageUser = await getUser();
    const { name } = storageUser;
    this.setState({ user: name }, () => onLoading(false));
  }

  redirectActive = ({ target }) => {
    const { name } = target;
    this.setState(({
      redirect: true,
      localToRedirect: name,
    }));
  };

  render() {
    const { user, redirect, localToRedirect } = this.state;
    const { loadingStatus } = this.props;

    if (!loadingStatus) {
      return (
        <header data-testid="header-component">
          <h1 data-testid="header-user-name">{user}</h1>
          <nav>
            <button
              data-testid="link-to-search"
              name="search"
              type="button"
              onClick={ (event) => this.redirectActive(event) }
            >
              Search
            </button>
            <button
              data-testid="link-to-favorites"
              name="favorites"
              type="button"
              onClick={ (event) => this.redirectActive(event) }
            >
              Favorites
            </button>
            <button
              data-testid="link-to-profile"
              name="profile"
              type="button"
              onClick={ (event) => this.redirectActive(event) }
            >
              Profile
            </button>
          </nav>
          { redirect ? <Redirect to={ `/${localToRedirect}` } /> : ''}
        </header>
      );
    }
    return <Loading />;
  }
}

Header.propTypes = {
  onLoading: PropTypes.func.isRequired,
  loadingStatus: PropTypes.bool.isRequired,
};

export default Header;
