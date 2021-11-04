import React from 'react';
import ReactDOM from 'react-dom';

import './main.style.css'

import App from './pages/app.page';
import { ErrorBoundary } from "./components";


ReactDOM.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
  document.getElementById('root')
);


