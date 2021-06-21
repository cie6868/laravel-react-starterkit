import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginPage from './auth/LoginPage';
import LogoutPage from './auth/LogoutPage';
import HomePage from './HomePage';
import RegisterPage from './auth/RegisterPage';

function App() {

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login">
          <LoginPage/>
        </Route>
        <Route path="/logout">
          <LogoutPage/>
        </Route>
        <Route path="/register">
          <RegisterPage/>
        </Route>
        <Route path="/">
          <HomePage/>
        </Route>
      </Switch>
    </BrowserRouter>
  );

}

export default App;
