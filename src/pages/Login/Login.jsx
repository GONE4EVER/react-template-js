import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { AuthService, setCredentials } from 'features/auth';

import LoginForm from './LoginForm';

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [login, { isSuccess, isError }] = AuthService.useLoginMutation();

  useEffect(() => {
    if (isSuccess) {
      history.push('/');
    }
  }, [isSuccess, history]);

  const loginHandler = async userCreds => {
    try {
      const user = await login(userCreds).unwrap();

      dispatch(setCredentials(user));
    } catch (err) {
      console.error({ err: err.message });
    }
  };

  return (
    <div className="loginPage">
      <main className="loginPage__content">
        <div>
          <h1>Login page</h1>

          <LoginForm onLogin={loginHandler} />

          <section className="loginPage__body">
            {isError && <h4>Please, provide valid credentials</h4>}
          </section>
        </div>
      </main>
    </div>
  );
};

export default Login;
