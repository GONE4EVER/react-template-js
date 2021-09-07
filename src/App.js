import { Suspense } from 'react';
import { Switch } from 'react-router-dom';

// import ProtectedRoute from 'common/components/ProtectedRoute';
import Spinner from 'common/components/Spinner';
import WithAuthGuard from 'features/auth/components/WithAuthGuard';
import routes from 'router/index';

import './App.css';

const App = () => {
  return (
    <div className="App">
      <Suspense fallback={Spinner}>
        <Switch>
          {routes.map(route => (
            <WithAuthGuard key={route.name} {...route} />
          ))}
        </Switch>
      </Suspense>
    </div>
  );
};

export default App;
