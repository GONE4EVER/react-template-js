import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

import { useAuth } from '../hooks';

const ProtectedRoute = props => {
  const { user } = useAuth();
  const { meta, children, ...nativeProps } = props;

  const authChecked = !meta.authRequired || !!user;
  const permissionChecked = meta.permission?.(user) ?? true;

  const accessGranted = authChecked && permissionChecked;

  return (
    <Route
      {...nativeProps}
      render={({ location }) =>
        accessGranted ? children : <Redirect to={{ pathname: '/login', from: location }} />
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
