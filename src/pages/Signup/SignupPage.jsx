import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { Link } from 'react-router-dom';

import { UserActions } from '../../store/ducks/user';
import { ADMINISTRATIVE_PATH } from '../../constants';
import { Container, MiddleContainer, Caption } from './SignupPage.styles';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const dispatch = useDispatch();
  const { signup } = UserActions;

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

  const handleSignup = () => {
    if (isInputsValid()) {
      dispatch(signup(name, email, password, passwordConfirmation));
    } else {
      // TODO: show some error on invalid input...
    }
  };

  return (
    <Container>
      <MiddleContainer>
        <b>Criar minha conta</b>
        <br />
        <br />
        <input
          type="text"
          placeholder="Seu nome completo"
          value={name}
          onChange={({ target: { value } }) => setName(value)}
        />
        <br />
        <input
          type="text"
          placeholder="E-mail de login"
          value={email}
          onChange={({ target: { value } }) => setEmail(value)}
        />
        <br />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={({ target: { value } }) => setPassword(value)}
        />
        <br />
        <input
          type="password"
          placeholder="Confirmação de senha"
          value={passwordConfirmation}
          onChange={({ target: { value } }) => setPasswordConfirmation(value)}
        />
        <br />
        <Caption>Sua senha deve conter pelo menos 6 dígitos</Caption>
        <br />
        <br />
        <button type="button" onClick={handleSignup}>
          Criar conta
        </button>
        <br />
        <br />
        <Link to={{ pathname: '/', state: { loginForm: true } }}>Já possuo uma conta</Link>
      </MiddleContainer>
    </Container>
  );
};

export default SignupPage;
