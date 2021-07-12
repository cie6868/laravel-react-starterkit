import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { me } from '../services/authService';
import Button from 'react-bootstrap/Button';

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
      <div>
        {token && <Link to="/register"><Button variant="primary">New User Form</Button></Link>}
      </div>
      <div>
        {!token && <Link to="/login"><Button variant="primary">Login</Button></Link>}
        {token && <Link to="/logout"><Button variant="secondary">Logout</Button></Link>}
      </div>
    </section>
  );

}

export default HomePage;
