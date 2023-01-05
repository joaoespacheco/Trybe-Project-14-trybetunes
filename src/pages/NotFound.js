import React from 'react';
import PropTypes from 'prop-types';

class NotFound extends React.Component {
  changePath = (pathname) => {
    const { history } = this.props;
    history.push(pathname);
  }

  render() {
    console.log(this.props);
    return (
      <main data-testid="page-not-found" className="not-found-container">
        <div className="not-found-container-content">
          <h1>Desculpe, página não encontrada</h1>
          <button
            type="button"
            onClick={ () => this.changePath('/') }
          >
            Retornar para tela de login
          </button>
        </div>
      </main>
    );
  }
}

NotFound.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default NotFound;
