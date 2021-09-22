import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { Spinner } from 'common/components';

import { useGetUserAuthStateQuery } from '../service/auth.service';

const AuthManager = ({ children }) => {
  const history = useHistory();
  const location = useLocation();

  const { data: authData, isUninitialized, isLoading } = useGetUserAuthStateQuery();

  const pendingAuth = isUninitialized || isLoading;

  debugger;

  useEffect(() => {
    if (authData) {
      history.push(location.from?.pathname || '/');
    } else if (!pendingAuth) {
      history.push('/login');
    }
  }, [authData, history]);

  // useEffect(() => {
  //   if (!authData && !pendingAuth)
  // }, [])

  if (pendingAuth) {
    return <Spinner />;
  }

  return children;
};

AuthManager.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthManager;
