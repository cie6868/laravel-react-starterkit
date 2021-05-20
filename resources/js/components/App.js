import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Sample from './Sample';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/">
          <Sample/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
