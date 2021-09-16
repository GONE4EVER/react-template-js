import { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import { Spinner } from 'common/components';
import ProtectedRoute from 'features/auth/components/ProtectedRoute';
import ErrorPage from 'pages/ErrorPage';
import Login from 'pages/Login';
import routes from 'router/index';

import './App.css';

const App = () => {
  return (
    <div className="App">
      <Suspense fallback={<Spinner />}>
        <Switch>
          {routes.map(route => (
            <ProtectedRoute key={route.name} {...route} />
          ))}

          <Route path="/login">
            <Login />
          </Route>
          <Route path="*">
            <ErrorPage />
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
};

export default App;
