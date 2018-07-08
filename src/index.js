import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom'

// Main.
import './index.css';
import 'bulma/css/bulma.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@coreui/icons/css/coreui-icons.min.css';


import Home from './containers/Home/Home.js';
import Login from './containers/Login/Login.js';


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
// Render page
ReactDOM.render((
  <BrowserRouter>
    <Switch>
      <Route exact path="/" name="Login" component={Login} />
      <Route path="/login" name="Login" component={Login} />
      <PrivateRoute authed={false} path="/" name="Home" component={Home} />
    </Switch>
  </BrowserRouter>
), document.getElementById('root'));
registerServiceWorker();
