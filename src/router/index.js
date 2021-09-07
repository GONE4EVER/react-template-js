import React from 'react';

import LoginPage from 'pages/Login';

const Home = React.lazy(() => import('pages/Home'));
const ErrorPage = React.lazy(() => import('pages/NotFound'));

export default [
  {
    name: 'Home',
    path: '/',
    exact: true,
    meta: { authRequired: true },
    render: () => <Home />,
  },
  {
    name: 'Login',
    path: '/login',
    component: LoginPage,
  },
  {
    name: 'Error page',
    path: '*',
    render: () => <ErrorPage />,
  },
];
