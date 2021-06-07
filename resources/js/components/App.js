import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginPage from './auth/LoginPage';
import LogoutPage from './auth/LogoutPage';
import HomePage from './HomePage';
import CheckValidationPage from './CheckValidationPage';

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
        <Route path="/check">
          <CheckValidationPage/>
        </Route>
        <Route path="/">
          <HomePage/>
        </Route>
      </Switch>
    </BrowserRouter>
  );

}

export default App;
