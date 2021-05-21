import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { logout } from '../../services/authService';

function LogoutPage() {

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    logout(token);
  }, []);

  // if logged out
  if (!token) {
    return <Redirect to="/"/>;
  }

  return (
    <section>
      <p>Logging out...</p>
    </section>
  );

}

export default LogoutPage;
