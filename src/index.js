import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App.js';
import {BrowserRouter as Router} from "react-router-dom";

import './style/style.scss';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
