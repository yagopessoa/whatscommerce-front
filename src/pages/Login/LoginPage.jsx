import React from 'react';
import { useDispatch } from 'react-redux';

import { UserActions } from '../../store/ducks/user';

const LoginPage = () => {
  const dispatch = useDispatch();

  const { login } = UserActions;

  const handleLogin = () => {
    // TODO: create login form and get values from users input
    dispatch(login('yago@yago.com', '123456'));
  };

  return (
    <>
      <button type="button" onClick={handleLogin}>
        Login
      </button>
    </>
  );
};

export default LoginPage;
