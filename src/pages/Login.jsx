import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { useAuthState } from 'features/auth/hooks';
import { setCredentials } from 'features/auth/slice';

const Login = () => {
  const { user } = useAuthState();
  const history = useHistory();
  const dispatch = useDispatch();

  const login = () => dispatch(setCredentials({ user: 'user123', token: '123' }));

  useEffect(() => {
    if (user) {
      history.push('/');
    }
  }, [user, history]);

  return (
    <div className="loginPage">
      <header className="loginPage__header">
        <h1>Login page</h1>

        <button type="button" onClick={login}>
          log in
        </button>
      </header>

      <section className="loginPage__body">
        <h4>Login body</h4>
      </section>
    </div>
  );
};

export default Login;
