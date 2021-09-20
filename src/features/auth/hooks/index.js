import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentToken, selectCurrentUser } from '../slice';

export const useAuthState = () => {
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);

  return useMemo(() => ({ user, token }), [user, token]);
};

export const useAuthorization = ({ authRequired, permission }) => {
  const { token, user } = useAuthState();

  const authChecked = !authRequired || !!token;
  const permissionChecked = permission?.(user) ?? true;

  const accessGranted = authChecked && permissionChecked;

  return accessGranted;
};

// const useLogout
