import { useHistory } from 'react-router-dom';

import { useAuth } from 'features/auth/auth.context';

const Login = () => {
  const { signin } = useAuth();
  const history = useHistory();

  const signingCallback = payload => {
    if (payload.token) {
      history.push('/');
    }
  };

  return (
    <div className="loginPage">
      <header className="loginPage__header">
        <h1>Login page</h1>

        <button type="button" onClick={() => signin(signingCallback)}>
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
