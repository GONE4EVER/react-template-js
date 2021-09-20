import { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import { Spinner } from 'common/components';
import Header from 'common/components/Header';
import ProtectedRoute from 'features/auth/components/ProtectedRoute';
import ErrorPage from 'pages/ErrorPage';
import Login from 'pages/Login/Login';
import routes from 'router/index';

import './App.css';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Suspense fallback={<Spinner />}>
        <Switch>
          {routes.map(route => (
            <ProtectedRoute key={route.name} {...route} />
          ))}

          <Route path="/login">
            <Login />
          </Route>
          <ProtectedRoute path="*" meta={{ authRequired: true }}>
            <ErrorPage />
          </ProtectedRoute>
        </Switch>
      </Suspense>
    </div>
  );
};

export default App;
