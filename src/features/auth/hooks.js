import { useEffect, useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { AuthService, useGetUserAuthStateQuery } from './service';

export const useAuthState = () => {
  const {
    data: authData,
    isUninitialized,
    isLoading,
  } = AuthService.endpoints.getUserAuthState.useQueryState();

  return useMemo(
    () => ({
      pendingAuth: isUninitialized || isLoading,
      user: authData?.user ?? null,
      token: authData?.token ?? null,
    }),
    [authData, isUninitialized, isLoading],
  );
};

export const useAuthorization = ({ authRequired, permission }) => {
  const { token, user, pendingAuth } = useAuthState();

  const authChecked = !authRequired || !!token;
  const permissionChecked = permission?.({ user, token, isAdmin: true }) ?? true;

  const accessGranted = authChecked && permissionChecked;

  return useMemo(
    () => ({ token, accessGranted, pendingAuth }),
    [accessGranted, token, pendingAuth],
  );
};

export const useRequestAuthentication = (/* { routeMeta } */) => {
  const history = useHistory();
  const location = useLocation();
  const { data: authData, isUninitialized, isLoading } = useGetUserAuthStateQuery();

  const pendingAuth = isUninitialized || isLoading;

  useEffect(() => {
    if (location.pathname === '/login' && (pendingAuth || authData)) {
      history.push(location.from?.pathname || '/');
    }
  }, [pendingAuth, authData, history, location.pathname, location.from?.pathname]);
};
