import React from 'react';

const Home = React.lazy(() => import('pages/Home'));

export default [
  {
    name: 'Home',
    path: '/',
    exact: true,
    meta: { authRequired: true },
    children: <Home />,
  },
];
