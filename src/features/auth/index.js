export {
  AuthService,
  useGetUserAuthStateQuery,
  useLoginMutation,
  useLogoutMutation,
} from './service/auth.service';

export { useAuthState, useAuthorization } from './hooks';

export {
  default as authReducer,
  selectCurrentToken,
  selectCurrentUser,
  setCredentials,
} from './slice';
