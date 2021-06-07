import React,{useCallback} from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import JsonForm from '../../../json-form-react/JsonForm';

import { checkValidation } from '../services/authService';

const checkValidationJson = require('../../../forms/checkValidation.json');

function CheckValidation() {

  const token = useSelector((state) => state.auth.token);

  const onSubmit = useCallback((values) => {
    checkValidation(token, values.fullname, values.number, values.date, values.email, values.phone);
  }, []);


  // if logged out
  if (!token) {
    return <Redirect to="/logout"/>;
  }

  return (
    <section>
      <JsonForm json={checkValidationJson} onSubmit={onSubmit}/>
    </section>
  );

}

export default CheckValidation;