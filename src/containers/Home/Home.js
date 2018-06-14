import React, { Component } from 'react';

import Header from '../../components/Header/';
import Footer from '../../components/Footer/'
class Home extends Component {
    render() {
        return(
            <div>
                <Header/>
                <h1>Homepage, mtfk</h1>
                <Footer/>
            </div>
        );
    }
}

export default Home