import { Suspense } from 'react';
import { Switch } from 'react-router-dom';

import { Spinner } from 'common/components';
import AuthGuard from 'features/auth/components/AuthGuard';
import routes from 'router/index';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Suspense fallback={Spinner}>
        <Switch>
          {routes.map(route => (
            <AuthGuard key={route.name} {...route} />
          ))}
        </Switch>
      </Suspense>
    </div>
  );
};

export default App;
