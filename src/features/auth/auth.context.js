import PropTypes from 'prop-types';
import { createContext, useContext, useState } from 'react';

import { fakeAuth } from 'common/api/index';

const authContext = createContext();

const userAuthState = {
  firstName: '',
  lastName: '',
  email: '',
  picture: '',

  token: '',
};

export const useAuth = () => {
  const context = useContext(authContext);

  return context;
};

export const useProvideAuth = () => {
  const [user, setUser] = useState(userAuthState);

  const signin = cb => {
    return fakeAuth
      .signin()
      .then(payload => {
        setUser(payload);

        return payload;
      })
      .then(cb);
  };

  const signout = cb => {
    return fakeAuth.signout(() => {
      setUser(null);
      cb();
    });
  };

  return {
    user,
    signin,
    signout,
  };
};

export const AuthProvider = ({ children }) => {
  const auth = useProvideAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
