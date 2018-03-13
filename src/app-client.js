import 'react-hot-loader/patch';
import React from 'react';
import { Router } from 'react-router-dom';
import ReactDOM from 'react-dom';
import history from './history';
import { withAuth } from './auth/withAuth';
import Layout from './layouts/Layout';

import './styles/styles.scss';

const LayoutWithAuth = withAuth(Layout, history);

const routes = (
  <Router history={history}>
    <LayoutWithAuth path='/' />
  </Router>
);

ReactDOM.render(
  routes,
  document.getElementById('main')
);
