import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router-dom";

import { history, reduxStore } from "./store";


ReactDOM.render(
  <Provider store = {reduxStore}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/:listID" component={App} />
        <Route path="/" component={App} />
      </Switch>
    </ConnectedRouter>
  </Provider>, 
  document.getElementById('root')
);
registerServiceWorker();
