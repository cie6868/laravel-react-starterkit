import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { login } from '../../services/authService';

function LoginPage() {

  const token = useSelector((state) => state.auth.token);

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const onFormChange = useCallback((event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  });

  const onLoginClick = useCallback((ev) => {
    login(formData.username, formData.password);
    ev.preventDefault();
  }, [formData]);

  // if logged in
  if (token) {
    return <Redirect to="/"/>;
  }

  return (
    <section>
      <form>
        <label>
          Username
          <input type="text" name="username" value={formData.username} onChange={onFormChange}/>
        </label>
        <label>
          Password
          <input type="password" name="password" value={formData.password} onChange={onFormChange}/>
        </label>
        <button type="submit" onClick={onLoginClick}>Login</button>
      </form>
    </section>
  );

}

export default LoginPage;
