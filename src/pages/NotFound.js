import React from 'react';
import { Redirect } from 'react-router-dom';

class NotFound extends React.Component {
  constructor() {
    super();

    this.state = {
      redirectStatus: false,
    };
  }

  render() {
    const { redirectStatus } = this.state;
    return (
      <main data-testid="page-not-found" className="not-found-container">
        <div className="not-found-container-content">
          <h1>Desculpe, página não encontrada</h1>
          <button
            type="button"
            onClick={ () => this.setState(({ redirectStatus: true })) }
          >
            Retornar para tela de login
          </button>
          {redirectStatus && <Redirect to="/" />}
        </div>
      </main>
    );
  }
}

export default NotFound;
