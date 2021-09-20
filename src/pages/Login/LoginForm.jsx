import PropTypes from 'prop-types';
import { useState } from 'react';

const LoginForm = ({ onLogin }) => {
  const [formState, setFormState] = useState({ email: '', password: '' });

  const formSubmitHandler = ev => {
    ev.preventDefault();
    onLogin(formState);
  };

  const updateEmail = ev =>
    setFormState(state => ({
      ...state,
      email: ev.target.value,
    }));

  const updatePassword = ev =>
    setFormState(state => ({
      ...state,
      password: ev.target.value,
    }));

  return (
    <form onSubmit={formSubmitHandler}>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" onChange={updateEmail} />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" onChange={updatePassword} />
      </div>

      <button type="submit">log in</button>
    </form>
  );
};

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginForm;
