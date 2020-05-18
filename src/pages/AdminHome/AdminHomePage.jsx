import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AuthActions } from '../../store/ducks/authorization';
import { UserActions } from '../../store/ducks/user';

const AdminHomePage = () => {
  const { name, email, accessToken, uid, client } = useSelector(({ user, authorization }) => ({
    ...user,
    ...authorization,
  }));

  const dispatch = useDispatch();
  const { checkAuth } = AuthActions;
  const { logout } = UserActions;

  return (
    <>
      Name: {name} <br />
      E-mail: {email} <br />
      <br />
      <button type="button" onClick={() => dispatch(checkAuth())}>
        Validate token
      </button>
      <br />
      <br />
      {uid} <br />
      {accessToken} <br />
      {client} <br />
      <br />
      <button type="button" onClick={() => dispatch(logout())}>
        Logout
      </button>
    </>
  );
};

export default AdminHomePage;
