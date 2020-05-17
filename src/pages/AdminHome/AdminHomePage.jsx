import React from 'react';
import { useSelector } from 'react-redux';

const AdminHomePage = () => {
  const { name, email } = useSelector(({ user: { name, email } }) => ({ name, email }));

  return (
    <>
      Name: {name} <br />
      E-mail: {email} <br />
    </>
  );
};

export default AdminHomePage;
