import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Header from '../../components/Header/';
import Footer from '../../components/Footer/';

import Dashboard from '../../views/Dashboard/';
import ProblemList from '../../views/ProblemList';
class Home extends Component {

    render() {
        return(
            <div>
                <Header/>
                <div className="main">
                    <div className="container-fluid">
                        <Switch>                            
                            <Route exact path="/home/dashboard" name="Dashboard" component={Dashboard} />
                            <Route path="/home/problems" component={ProblemList}/>
                            <Redirect from="/" to="/home" />             
                        </Switch>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default Home