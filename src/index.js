import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history';

// Main.
import './index.css';
import 'bulma/css/bulma.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';

import Home from './containers/Home/Home.js';
import Login from './containers/Login/Login.js';

// Containers(or pages)
const history = createBrowserHistory();


ReactDOM.render((
    <BrowserRouter history={history}>
        <Switch>
            <Route path="/login" name="Login" component={Login} />
            <Route path="/" name="Home" component={Home} />
            <Route component={Login} />
        </Switch>
    </BrowserRouter>
), document.getElementById('root'));
registerServiceWorker();
