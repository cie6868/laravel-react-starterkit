import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { me } from '../services/authService';

function HomePage() {

  const token = useSelector((state) => state.auth.token);

  const [username, setUsername] = useState(null);

  useEffect(async () => {
    if (token) {
      const username = await me(token);
      setUsername(username);
    }
  }, [token]);

  return (
    <section>
      <h1>You are {token ? 'logged in' : 'logged out'}.</h1>
      {username && <p>Username: {username}</p>}
      {!token && <Link to="/login">Login</Link>}
      {token && <Link to="/logout">Logout</Link>}
    </section>
  );

}

export default HomePage;
