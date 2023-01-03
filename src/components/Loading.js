import React from 'react';

class Loading extends React.Component {
  render() {
    return (
      <div className="loading-container">
        <div className="spinner" />
        <p>Carregando...</p>
      </div>
    );
  }
}

export default Loading;
