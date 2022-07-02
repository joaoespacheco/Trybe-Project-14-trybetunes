import React from 'react';
import PropTypes from 'prop-types';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      user: '',
    };
  }

  async componentDidMount() {
    const { onLoading } = this.props;
    const storageUser = await getUser();
    const { name } = storageUser;
    this.setState(({ user: name }), () => onLoading());
  }

  render() {
    const { user } = this.state;
    const { loadingStatus } = this.props;

    if (!loadingStatus) {
      return (
        <header data-testid="header-component">
          <h1 data-testid="header-user-name">{user}</h1>
        </header>
      );
    }
    return (<Loading />);
  }
}

Header.propTypes = {
  onLoading: PropTypes.func.isRequired,
  loadingStatus: PropTypes.bool.isRequired,
};

export default Header;
