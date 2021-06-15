import React,{useCallback} from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import JsonForm from '../../../../json-form-react/JsonForm';
import { register } from '../../services/authService';

const registerJson = require('../../../../forms/register.json');

const formExistingValues = {
  first_name: 'John',
  last_name: 'Doe',
  address: 'Road, City',
  nic: '199312341234',
  email: 'john@mailinator.com',
  phone: '0777123123',
  role: 'pm',
  gender: 'm',
  years_of_experience: 5,
  terms_and_conditions: true,
};

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

      <JsonForm json={registerJson} values={formExistingValues} onSubmit={onSubmit}/>
    </section>
  );

}

export default RegisterPage;
