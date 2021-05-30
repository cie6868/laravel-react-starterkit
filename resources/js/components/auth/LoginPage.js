import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import JsonForm from '../../../../json-form-react/JsonForm';
import { login } from '../../services/authService';

const loginJson = require('../../../../forms/login.json');

function LoginPage() {

  const token = useSelector((state) => state.auth.token);

  const onSubmit = useCallback((values) => {
    login(values.username, values.password);
  }, []);

  // if logged in
  if (token) {
    return <Redirect to="/"/>;
  }

  return (
    <section>
      <JsonForm json={loginJson} onSubmit={onSubmit}/>
    </section>
  );

}

export default LoginPage;
