import { useMemo } from 'react';

import { AuthService } from './service';

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
