import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import App from './App';
import GamesPage from './GamesPage'

const routes = (
  <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/games" component={GamesPage} />

      </Switch>
  </BrowserRouter>
);


ReactDOM.render(
  <React.StrictMode>
    {routes}
  </React.StrictMode>,
  document.getElementById('root')
);

