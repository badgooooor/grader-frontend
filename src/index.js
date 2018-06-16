import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history';

// Main.
import './index.css';
import 'bulma/css/bulma.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@coreui/icons/css/coreui-icons.min.css';


import Home from './containers/Home/Home.js';
import Login from './containers/Login/Login.js';
import Problems from './containers/ProblemList/ProblemList.js';

// Backend 




// Containers(or pages)
const history = createBrowserHistory();

// Render page
ReactDOM.render((
    <BrowserRouter history={history}>
        <Switch>
            <Route path="/problems" name="Problems" component={Problems} />
            <Route path="/login" name="Login" component={Login} />
            <Route path="/" name="Home" component={Home} />
            <Route component={Login} />
        </Switch>
    </BrowserRouter>
), document.getElementById('root'));
registerServiceWorker();
