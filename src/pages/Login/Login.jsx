import { AuthService } from 'features/auth';

import LoginForm from './components/LoginForm';

const Login = () => {
  const [login, { isError }] = AuthService.useLoginMutation();

  console.log(123);

  const loginHandler = async userCreds => {
    try {
      await login(userCreds).unwrap();
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
