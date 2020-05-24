import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Card from '../../components/Card/Card';
import { Container } from '../../components/CommonStyles/CommonStyles';
import { CardContent } from './AdminHome.styles';
import { UserActions } from '../../store/ducks/user';

const Greeting = ({ onConfirm = () => {} }) => {
  const dispatch = useDispatch();
  const { logout } = UserActions;

  const { name } = useSelector(({ user }) => user);
  const firstName = () => (name ? name.split(' ')[0] : '');

  return (
    <Container>
      <Card>
        <CardContent>
          <b>Bem-vindo(a), {firstName()}</b>
          <br />
          <br />
          Agora é hora de prepararmos sua lojinha para seus clientes, vamos lá?
          <br />
          <br />
          <button type="button" onClick={onConfirm}>
            Criar minha lojinha
          </button>
        </CardContent>
      </Card><br />
      <br />
      <button type="button" onClick={() => dispatch(logout())}>
        Logout
      </button>
    </Container>
  );
};

export default Greeting;
