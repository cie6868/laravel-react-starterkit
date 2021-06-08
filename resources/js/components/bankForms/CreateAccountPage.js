import React,{useCallback} from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import JsonForm from '../../../../json-form-react/JsonForm';

import { accountCreation } from '../../services/authService';

const createAccountJson = require('../../../../forms/createAccount.json');

function CreateAccountPage() {

  const token = useSelector((state) => state.auth.token);

  const onSubmit = useCallback((values) => {
    accountCreation(token,values.fullname, values.address);
  }, []);


  // if logged out
  if (!token) {
    return <Redirect to="/logout"/>;
  }

  return (
    <section>
      <JsonForm json={createAccountJson} onSubmit={onSubmit}/>
    </section>
  );

}

export default CreateAccountPage;
