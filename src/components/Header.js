import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      user: '',
      redirect: false,
      localToRedirect: '',
    };
  }

  componentDidMount() {
    this.getStorageUser();
  }

  getStorageUser = async () => {
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
    return (
      <header data-testid="header-component" className="header-container">
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
        <div>
          <h1 data-testid="header-user-name">{user}</h1>
          <button
            type="button"
            name=""
            onClick={ (event) => this.redirectActive(event) }
          >
            Logout
          </button>
        </div>
        { redirect ? <Redirect to={ `/${localToRedirect}` } /> : ''}
      </header>
    );
  }
}

Header.propTypes = {
  onLoading: PropTypes.func.isRequired,
};

export default Header;
