import React from 'react';

const Home = React.lazy(() => import('pages/Home'));

const fakePermissionCheck = user => user.isAdmin;

export default [
  {
    name: 'Home',
    path: '/',
    exact: true,
    meta: { authRequired: true },
    children: <Home />,
  },
  {
    name: 'User Management',
    path: 'users',
    meta: { authRequired: true, permission: fakePermissionCheck },
  },
];
