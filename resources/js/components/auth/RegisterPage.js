import React,{useCallback} from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import JsonForm from '../../../../json-form-react/JsonForm';
import { register } from '../../services/authService';

const registerJson = require('../../../../forms/register.json');

function RegisterPage() {

  const token = useSelector((state) => state.auth.token);

  const onSubmit = useCallback((values) => {
    register(token, values);
  }, [token]);

  // if logged out
  if (!token) {
    return <Redirect to="/logout"/>;
  }

  return (
    <section>
      <h1>Register (Validation Test)</h1>

      <JsonForm json={registerJson} onSubmit={onSubmit}/>
    </section>
  );

}

export default RegisterPage;
