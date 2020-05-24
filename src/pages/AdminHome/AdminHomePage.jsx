import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { AuthActions } from '../../store/ducks/authorization';
import { UserActions } from '../../store/ducks/user';
import { CompanyActions } from '../../store/ducks/company';
import Greeting from './Greeting';
import { COMPANY_EDIT_PATH } from '../../constants';
import { push } from 'connected-react-router';

const AdminHomePage = () => {
  const {
    name,
    email,
    accessToken,
    uid,
    client,
    companyName,
    logo,
    instagramUrl,
    facebookUrl,
    openingHours,
    whatsappNumber,
    pageUrl,
  } = useSelector(({ user, authorization, company: { name: companyName, ...companyInfo } }) => ({
    ...user,
    ...authorization,
    ...companyInfo,
    companyName,
  }));

  const dispatch = useDispatch();
  const { checkAuth } = AuthActions;
  const { logout } = UserActions;
  const { getCompany } = CompanyActions;

  const hasCompanyInfo = () => Boolean(companyName);

  useEffect(() => {
    dispatch(getCompany());
  }, []);

  return hasCompanyInfo() ? (
    <>
      Name: {name} <br />
      E-mail: {email} <br />
      <br />
      <button type="button" onClick={() => dispatch(checkAuth())}>
        Validate token
      </button>
      <br />
      <br />
      uid: {uid} <br />
      access-token: {accessToken} <br />
      client: {client} <br />
      <br />
      --------------------------------------
      <br />
      <br />
      Nome: {companyName} <br />
      Whatsapp: {whatsappNumber} <br />
      URL da página: {pageUrl} <br />
      Logo: {logo} <br />
      Insta: {instagramUrl} <br />
      Face: {facebookUrl} <br />
      Horário de funcionamento: {openingHours} <br />
      <br />
      <button type="button" onClick={() => dispatch(push(COMPANY_EDIT_PATH))}>
        Editar
      </button>
      <br />
      <br />
      <button type="button" onClick={() => dispatch(logout())}>
        Logout
      </button>
    </>
  ) : (
    <Greeting onConfirm={() => dispatch(push(COMPANY_EDIT_PATH))} />
  );
};

export default AdminHomePage;
