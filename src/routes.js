import React, { useEffect } from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { history } from './store';
import { AuthActions } from './store/ducks/authorization';
import LoginPage from './pages/Login/LoginPage';
import AdminHomePage from './pages/AdminHome/AdminHomePage';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { uid, accessToken, client } = useSelector(({ authorization }) => authorization);
  const isAuthenticated = () => Boolean(uid && accessToken && client);

  const dispatch = useDispatch();
  const { checkAuth } = AuthActions;

  useEffect(() => {
    if (isAuthenticated()) {
      dispatch(checkAuth());
    }
  }, []);

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
