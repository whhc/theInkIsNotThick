import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import ConsumerStore from './store';

ReactDOM.render(
  // <React.StrictMode> //为了兼顾material-ui
  <ConsumerStore>
    <Router>
      <Switch>
        <Route path="/">
          <App />
        </Route>
      </Switch>
    </Router>
  </ConsumerStore>,
  // </React.StrictMode>,
  document.getElementById('root')
);
