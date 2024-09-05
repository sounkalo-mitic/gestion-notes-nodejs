// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import './index.css'; // Assure-toi que ce fichier CSS existe si tu l'utilises

// Rendre l'application en utilisant le Provider pour passer le store Redux à l'ensemble de l'application
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
