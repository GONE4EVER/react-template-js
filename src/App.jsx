import { Fragment, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import { Spinner } from 'common/components';
import Header from 'common/components/Header';
import { AuthManager, ProtectedRoute } from 'features/auth/components';
import { useGetUserAuthStateQuery } from 'features/auth/service';
import ErrorPage from 'pages/ErrorPage';
import Login from 'pages/Login/Login';
import routes from 'router/index';

import './App.css';

const App = () => {
  const { /* data: authData, */ isUninitialized, isLoading } = useGetUserAuthStateQuery();

  const pendingAuth = isUninitialized || isLoading;

  return (
    <div className="App">
      <AuthManager />

      <Fragment>
        <Header />
        <Suspense fallback={<Spinner />}>
          <Switch>
            {routes.map(route => (
              <ProtectedRoute key={route.name} {...route} />
            ))}

            <Route path="/login">{pendingAuth ? <Spinner /> : <Login />}</Route>

            <ProtectedRoute path="*" meta={{ authRequired: true }}>
              <ErrorPage />
            </ProtectedRoute>
          </Switch>
        </Suspense>
      </Fragment>
    </div>
  );
};

export default App;
