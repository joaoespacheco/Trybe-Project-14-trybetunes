import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      loginInput: '',
      searchInput: '',
      buttonStatus: true,
      loadingStatus: false,
    };
    this.handleChanger = this.handleChanger.bind(this);
    this.modifyState = this.modifyState.bind(this);
    this.modifyButtonStatus = this.modifyButtonStatus.bind(this);
    this.modifyLoadingState = this.modifyLoadingState.bind(this);
  }

  handleChanger({ target }) {
    const { name, value } = target;
    this.modifyButtonStatus(name, value);
    this.modifyState(name, value);
  }

  modifyState(name, value) {
    this.setState(({ [name]: value }));
  }

  modifyButtonStatus(name = '', value = '') {
    if (name === 'loginInput') {
      const numberMaxOfCharacters = 3;
      this.setState(({
        buttonStatus: numberMaxOfCharacters > value.length,
      }));
    } else if (name === 'searchInput') {
      const numberMaxOfCharacters = 2;
      this.setState(({
        buttonStatus: numberMaxOfCharacters > value.length,
      }));
    } else {
      this.setState(({
        buttonStatus: true,
      }));
    }
  }

  modifyLoadingState(status) {
    this.setState(({ loadingStatus: status }));
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            path="/search"
            render={ () => (
              <Search
                onInputChange={ this.handleChanger }
                onLoading={ this.modifyLoadingState }
                buttonReset={ this.modifyButtonStatus }
                { ...this.state }
              />) }
          />
          <Route
            path="/album/:id"
            render={ () => (
              <Album
                onLoading={ this.modifyLoadingState }
                { ...this.state }
              />) }
          />
          <Route
            path="/favorites"
            render={ () => (
              <Favorites
                onLoading={ this.modifyLoadingState }
                { ...this.state }
              />) }
          />
          <Route
            path="/profile/edit"
            render={ () => (
              <ProfileEdit
                onLoading={ this.modifyLoadingState }
                { ...this.state }
              />) }
          />
          <Route
            path="/profile"
            render={ () => (
              <Profile
                onLoading={ this.modifyLoadingState }
                { ...this.state }
              />) }
          />
          <Route
            path="/"
            render={ () => (
              <Login
                { ...this.state }
                onInputChange={ this.handleChanger }
                onLoading={ this.modifyLoadingState }
              />
            ) }
          />
        </Switch>
        <Route path="*" component={ NotFound } />
      </BrowserRouter>
    );
  }
}

export default App;
