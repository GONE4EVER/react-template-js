import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

import { Spinner } from 'common/components';

import { useAuthorization } from '../hooks';

const ProtectedRoute = props => {
  const { meta, children, ...nativeProps } = props;

  const { token, accessGranted, pendingAuth } = useAuthorization({
    authRequired: meta?.authRequired,
    permission: meta?.permission,
  });

  if (pendingAuth) {
    return <Spinner />;
  }

  return (
    <Route
      {...nativeProps}
      render={({ location }) =>
        accessGranted ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: token ? '/' : '/login',
              from: location,
            }}
          />
        )
      }
    />
  );
};

ProtectedRoute.propTypes = {
  meta: PropTypes.shape({
    authRequired: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    permission: PropTypes.func,
  }),
  children: PropTypes.node,
};

ProtectedRoute.defaultProps = {
  meta: {},
  children: null,
};

export default ProtectedRoute;
