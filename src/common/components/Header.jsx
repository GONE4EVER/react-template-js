import { useHistory } from 'react-router-dom';

import { useAuthState } from 'features/auth/hooks';
import { useLogoutMutation } from 'features/auth/service';

const Header = () => {
  const { token } = useAuthState();
  const [logout] = useLogoutMutation();

  const history = useHistory();

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
