import { Fragment, Suspense } from 'react';
import { Switch } from 'react-router-dom';

import { Spinner } from 'common/components';
import Header from 'common/components/Header';
import { AuthManager, ProtectedRoute } from 'features/auth/components';
import { useRequestAuthentication } from 'features/auth/hooks';
import ErrorPage from 'pages/ErrorPage';
import Login from 'pages/Login/Login';
import routes from 'router/index';

import './App.css';

const App = () => {
  useRequestAuthentication();

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

            <ProtectedRoute path="/login" meta={{ authRequired: false }}>
              <Login />
            </ProtectedRoute>

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
