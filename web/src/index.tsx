import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// rederizar o componente app dentro do id root
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
