import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Route, BrowserRouter, Switch } from 'react-router-dom'

// Main.
import './index.css';
import 'bulma/css/bulma.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@coreui/icons/css/coreui-icons.min.css';


import Home from './containers/Home/Home.js';
import Login from './containers/Login/Login.js';

// Render page
ReactDOM.render((
    <BrowserRouter>
        <Switch>
            <Route exact path="/" name="Login" component={Login} />
            <Route path="/" name="Home" component={Home} />
        </Switch>
    </BrowserRouter>
), document.getElementById('root'));
registerServiceWorker();
