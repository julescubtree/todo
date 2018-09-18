import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
//import registerServiceWorker from './registerServiceWorker';

import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router-dom";

import { history, reduxStore } from "./store";

import ViewList from "./components/ViewList";


ReactDOM.render(
  <Provider store = {reduxStore}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/viewlist/:listID/:todoID?" component={ViewList} />
      </Switch>
    </ConnectedRouter>
  </Provider>, 
  document.getElementById('root')
);
//registerServiceWorker();