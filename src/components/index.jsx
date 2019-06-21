import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import App from './App'

class Root extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/app/:category(menu|admin|slot|saves)" component={App} />
          <Redirect from = "*" to = "/app/menu"/>
        </Switch>
      </Router>
    );
  }
}

export default Root;
