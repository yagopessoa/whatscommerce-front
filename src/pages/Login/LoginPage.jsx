import React from 'react';
// import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';

import { UserActions } from '../../store/ducks/user';

const LoginPage = () => {
  const dispatch = useDispatch();
  const { name, email } = useSelector(({ user: { name, email } }) => ({ name, email }));

  const { login } = UserActions;

  const handleLogin = () => {
    dispatch(login('yago@yago.com', 'Yago'));
    setTimeout(() => {
      dispatch(push('/app')); // TODO: move redirect to redux-saga when its setup
    }, 1000);
  };

  return (
    <>
      Name: {name} <br />
      E-mail: {email} <br />
      <button type="button" onClick={handleLogin}>
        Login
      </button>
    </>
  );
};

LoginPage.propTypes = {};

export default LoginPage;
