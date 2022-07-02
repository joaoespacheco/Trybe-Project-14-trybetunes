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
      loginButtonStatus: true,
      loadingStatus: false,
    };

    this.handleChanger = this.handleChanger.bind(this);
    this.loadingChange = this.loadingChange.bind(this);
  }

  handleChanger({ target }) {
    const numberMaxOfCharacters = 3;
    const { name, value } = target;
    if (name === 'loginInput') {
      this.setState(({
        loginButtonStatus: numberMaxOfCharacters > value.length,
      }));
    }
    this.setState(({
      [name]: value,
    }));
  }

  loadingChange() {
    this.setState((prevState) => ({
      loadingStatus: !prevState.loadingStatus,
    }));
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            path="/search"
            render={ () => (
              <Search
                onLoading={ this.loadingChange }
                { ...this.state }
              />) }
          />
          <Route
            path="/album/:id"
            render={ () => (
              <Album
                onLoading={ this.loadingChange }
                { ...this.state }
              />) }
          />
          <Route
            path="/favorites"
            render={ () => (
              <Favorites
                onLoading={ this.loadingChange }
                { ...this.state }
              />) }
          />
          <Route
            path="/profile/edit"
            render={ () => (
              <ProfileEdit
                onLoading={ this.loadingChange }
                { ...this.state }
              />) }
          />
          <Route
            path="/profile"
            render={ () => (
              <Profile
                onLoading={ this.loadingChange }
                { ...this.state }
              />) }
          />
          <Route
            path="/"
            render={ () => (
              <Login
                { ...this.state }
                onInputChange={ this.handleChanger }
                onLoading={ this.loadingChange }
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
