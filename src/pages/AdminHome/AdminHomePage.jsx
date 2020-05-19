import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AuthActions } from '../../store/ducks/authorization';
import { UserActions } from '../../store/ducks/user';
import { CompanyActions } from '../../store/ducks/company';

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

  useEffect(() => {
    dispatch(getCompany());
  }, []);

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
      uid: {uid} <br />
      access-token: {accessToken} <br />
      client: {client} <br />
      <br />
      --------------------------------------
      <br />
      <br />
      Nome: {companyName} <br />
      Logo: {logo} <br />
      Insta: {instagramUrl} <br />
      Face: {facebookUrl} <br />
      Horário de funcionamento: {openingHours} <br />
      Whatsapp: {whatsappNumber} <br />
      URL da página: {pageUrl} <br />
      <br />
      <button type="button" onClick={() => dispatch(logout())}>
        Logout
      </button>
    </>
  );
};

export default AdminHomePage;
