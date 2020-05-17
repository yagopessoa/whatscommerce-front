import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { history } from './store';
import LoginPage from './pages/Login/LoginPage';
import AdminHomePage from './pages/AdminHome/AdminHomePage';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { name, email } = useSelector(({ user: { name, email } }) => ({ name, email }));

  const isAuthenticated = () => Boolean(name && email); // TODO: check cookie for this

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
      }
    />
  );
};

const Routes = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route exact path="/" component={() => <LoginPage />} />
      <PrivateRoute path="/administrative" component={() => <AdminHomePage />} />
    </Switch>
  </ConnectedRouter>
);

export default Routes;
