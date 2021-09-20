export { api as AuthService } from './service/auth.service';
export {
  default as authReducer,
  selectCurrentToken,
  selectCurrentUser,
  setCredentials,
} from './slice';
