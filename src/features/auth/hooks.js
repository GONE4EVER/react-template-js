import { useMemo } from 'react';

import { AuthService } from './service/auth.service';

export const useAuthState = () => {
  const {
    data: authData,
    isUninitialized,
    isLoading,
  } = AuthService.endpoints.getUserAuthState.useQueryState();

  return useMemo(
    () => ({
      isFetching: isUninitialized || isLoading,
      user: authData?.user ?? null,
      token: authData?.token ?? null,
    }),
    [authData, isUninitialized, isLoading],
  );
};

export const useAuthorization = ({ authRequired, permission }) => {
  const { token, user, isFetching } = useAuthState();

  const authChecked = !authRequired || !!token;
  const permissionChecked = permission?.(user) ?? true;

  const accessGranted = authChecked && permissionChecked;

  return useMemo(() => ({ accessGranted, isFetching }), [accessGranted, isFetching]);
};
