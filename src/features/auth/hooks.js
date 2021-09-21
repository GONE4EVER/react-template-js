import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { useGetUserAuthStateQuery } from './service/auth.service';
import { selectCurrentToken, selectCurrentUser } from './slice';

export const useAuthState = () => {
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);

  const { data: authData, isLoading } = useGetUserAuthStateQuery();

  return useMemo(
    () => ({ user: authData || user, token, isLoading }),
    [user, token, isLoading, authData],
  );
};

export const useAuthorization = ({ authRequired, permission }) => {
  const { token, user } = useAuthState();

  const authChecked = !authRequired || !!token;
  const permissionChecked = permission?.(user) ?? true;

  const accessGranted = authChecked && permissionChecked;

  return accessGranted;
};
