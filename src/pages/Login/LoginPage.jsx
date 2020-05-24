import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { useLocation, Link } from 'react-router-dom';

import { UserActions } from '../../store/ducks/user';
import { APP_NAME, ADMINISTRATIVE_PATH, SIGNUP_PATH } from '../../constants';
import { ImagePlaceholder } from './LoginPage.styles';
import { MiddleContainer, Container } from '../../components/CommonStyles/CommonStyles';

const LoginPage = () => {
  const location = useLocation();

  const [showForm, setShowForm] = useState(location?.state?.loginForm ?? false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const { login } = UserActions;

  const { uid, accessToken, client } = useSelector(({ authorization }) => authorization);
  const isAuthenticated = () => Boolean(uid && accessToken && client);

  useEffect(() => {
    if (isAuthenticated()) {
      dispatch(push(ADMINISTRATIVE_PATH));
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
      <ImagePlaceholder />
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
      <br />
      <button type="button" onClick={() => dispatch(push(SIGNUP_PATH))}>
        Criar uma conta
      </button>
    </MiddleContainer>
  );

  const renderForm = () => (
    <MiddleContainer>
      <b>Faça login na sua lojinha</b>
      <br />
      <br />
      <input
        type="text"
        placeholder="E-mail"
        value={email}
        onChange={({ target: { value } }) => setEmail(value)}
        autoFocus
      />
      <br />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={({ target: { value } }) => setPassword(value)}
      />
      <br />
      <br />
      <button type="button" onClick={handleLogin}>
        Entrar
      </button>
      <br />
      <br />
      <Link to={SIGNUP_PATH}>Não tenho uma conta</Link>
    </MiddleContainer>
  );

  return <Container>{showForm ? renderForm() : renderIntro()}</Container>;
};

export default LoginPage;
