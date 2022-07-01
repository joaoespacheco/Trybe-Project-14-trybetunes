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
              />) }
          />
          <Route path="/album/:id" render={ (props) => <Album { ...props } /> } />
          <Route path="/favorites" component={ Favorites } />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route path="/profile" component={ Profile } />
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
