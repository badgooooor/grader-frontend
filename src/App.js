import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom'

import Home from './containers/Home/Home.js';
import Login from './containers/Login/Login.js';

import store from './store';

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
    />
  )
}

class App extends Component {
  render() {
    return (
        <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" name="Login" component={Login} />
            <Route path="/login" name="Login" component={Login} />
            <PrivateRoute authed={false} path="/" name="Home" component={Home} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;