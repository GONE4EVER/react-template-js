import React from 'react';

const Home = React.lazy(() => import('pages/Home'));
const Users = React.lazy(() => import('pages/Users/UsersManagement'));

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
    path: '/users',
    meta: { authRequired: true, permission: user => !!user.isAdmin },
    children: <Users />,
  },
];
