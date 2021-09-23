import { memo, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { useAuthState } from '../hooks';

const AuthManager = () => {
  const history = useHistory();
  const location = useLocation();

  const { token, pendingAuth } = useAuthState();

  useEffect(() => {
    if (location.pathname === '/login' && (pendingAuth || token)) {
      history.push(location.from?.pathname || '/');
    }
  }, [pendingAuth, token, history, location.pathname, location.from?.pathname]);

  return null;
};

export default memo(AuthManager);
