import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

import { useAuth } from 'features/auth/auth.context';

const WithAuthGuard = props => {
  const auth = useAuth();
  const { meta, ...nativeProps } = props;

  const notAllowed = meta.authRequired && !auth.user.token;
  const noPermission = meta.permission?.() ?? true;

  if (notAllowed && noPermission) {
    return <Redirect to="login" />;
  }

  return <Route {...nativeProps} />;
};

WithAuthGuard.propTypes = {
  meta: PropTypes.shape({
    authRequired: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    permission: PropTypes.func,
  }),
};

WithAuthGuard.defaultProps = {
  meta: {},
};

export default WithAuthGuard;
