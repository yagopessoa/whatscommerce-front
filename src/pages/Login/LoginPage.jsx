import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';

import { UserActions } from '../../store/ducks/user';
import { APP_NAME } from '../../constants';
import { Container, MiddleContainer } from './LoginPage.styles';

const LoginPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const { login } = UserActions;

  const { uid, accessToken, client } = useSelector(({ authorization }) => authorization);
  const isAuthenticated = () => Boolean(uid && accessToken && client);

  useEffect(() => {
    if (isAuthenticated()) {
      dispatch(push('/administrative'));
    }
  }, []);

  const isInputsValid = () => {
    // TODO: do some validation here...
    return true;
  };

  const handleLogin = () => {
    if (isInputsValid()) {
      dispatch(login(email, password));
    } else {
      // TODO: show some error on invalid input...
    }
  };

  const renderIntro = () => (
    <MiddleContainer>
      <b>Nós somos a {APP_NAME}</b>
      <br />
      <br />
      <span>
        Queremos ajudas pequenos e médios negócios a se digitalizarem e impulsionarem as vendas
        online de um jeito simples e fácil.
      </span>
      <br />
      <br />
      <button type="button" onClick={() => setShowForm(true)}>
        Fazer login
      </button>
      {/* <br />
      <button type="button" disabled onClick={() => {}}>
        Criar uma conta
      </button> */}
    </MiddleContainer>
  );

  const renderForm = () => (
    <MiddleContainer>
      <b>Faça login na sua lojinha</b>
      <br />
      <br />
      <input type="text" value={email} onChange={({ target: { value } }) => setEmail(value)} />
      <br />
      <input
        type="password"
        value={password}
        onChange={({ target: { value } }) => setPassword(value)}
      />
      <br />
      <br />
      <button type="button" onClick={handleLogin}>
        Entrar
      </button>
    </MiddleContainer>
  );

  return <Container>{showForm ? renderForm() : renderIntro()}</Container>;
};

export default LoginPage;
