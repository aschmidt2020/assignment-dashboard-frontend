import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <Router>
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  </Router>,
  document.getElementById('root')
);

