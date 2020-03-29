import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Routes from "./routes"
import { Router } from "react-router-dom"
import createHistory from 'history/createBrowserHistory'
import * as serviceWorker from "./serviceWorker"
const history = createHistory()

ReactDOM.render(
  <Router history={history}>
    <Routes />
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
