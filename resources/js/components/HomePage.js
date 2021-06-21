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
      <div>
        {token && <Link to="/register"><button>New User Form</button></Link>}
      </div>
      <div>
        {!token && <Link to="/login"><button>Login</button></Link>}
        {token && <Link to="/logout"><button>Logout</button></Link>}
      </div>
    </section>
  );

}

export default HomePage;
