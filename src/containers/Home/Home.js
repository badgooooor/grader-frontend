import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Header from '../../components/Header/';
import Footer from '../../components/Footer/';

import Dashboard from '../../views/Dashboard/';
import Problem from '../../views/Problems';
import AddProblem from '../../views/AddProblem';
import EditProblem from '../../views/EditProblem';

class Home extends Component {

    render() {
        return(
            <div>
                <Header/>
                <div className="main">
                    <div className="container-fluid">
                        <Switch>              
                            <Route path="/problems" component={Problem}/>
                            <Route path="/addproblem" component={AddProblem} />
                            <Route path="/editproblem" component={EditProblem} />              
                            <Route path="/" component={Dashboard} />
                            <Redirect from="/" to="/dashboard" /> 
                            
                        </Switch>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default Home