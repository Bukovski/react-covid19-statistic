import React from 'react';
import ReactDOM from 'react-dom';

import App from './pages/app/app.component';
import { ErrorBoundary } from "./components";


ReactDOM.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
  document.getElementById('root')
);


