import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { useAuthState } from 'features/auth/hooks';
import { setCredentials } from 'features/auth/slice';

const Header = () => {
  const { token } = useAuthState();

  const history = useHistory();
  const dispatch = useDispatch();

  const logout = () => dispatch(setCredentials({}));

  return (
    <header>
      <nav style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <button type="button" onClick={() => history.push('/')}>
          home
        </button>
        <button type="button" onClick={() => history.push('/users')}>
          users
        </button>
        {token && (
          <button type="button" onClick={logout}>
            log out
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
